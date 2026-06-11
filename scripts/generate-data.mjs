import { readFileSync, readdirSync, writeFileSync, existsSync, cpSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const repoRoot = join(root, '..');
const glossaryDir = join(repoRoot, 'glossary');
const decisionsDir = join(repoRoot, 'decisions');
const outDir = join(root, 'src', 'data');

function parseGlossaryFile(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const terms = [];

  let currentTheme = '';
  let currentSubTheme = '';

  for (const line of lines) {
    const titleMatch = line.match(/^# Glossary:\s*(.+)/);
    if (titleMatch) {
      currentTheme = titleMatch[1].trim();
      continue;
    }

    const subMatch = line.match(/^##\s+(.+)/);
    if (subMatch) {
      currentSubTheme = subMatch[1].trim();
      continue;
    }

    const termMatch = line.match(/^-\s+\*\*(.+?)\*\*\s*\(([^)]*)\):\s*(.+)/);
    if (termMatch) {
      const name = termMatch[1].trim();
      const category = termMatch[2].trim();
      const description = termMatch[3].trim();
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

      terms.push({
        name,
        slug,
        category,
        description,
        theme: currentTheme,
        subTheme: currentSubTheme,
      });
    }

    const shortMatch = line.match(/^-\s+\*\*(.+?)\*\*:\s*(.+)/);
    if (shortMatch && !line.includes('(')) {
      // Some entries don't have a category
      const name = shortMatch[1].trim();
      const description = shortMatch[2].trim();
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

      terms.push({
        name,
        slug,
        category: '',
        description,
        theme: currentTheme,
        subTheme: currentSubTheme,
      });
    }
  }

  return terms;
}

function parseDecisions() {
  const indexFile = join(decisionsDir, 'index.md');
  const content = readFileSync(indexFile, 'utf-8');
  const lines = content.split('\n');

  const decisions = [];
  let currentCategory = '';

  for (const line of lines) {
    const catMatch = line.match(/^##\s+(.+?)\s*\((\d+)\)/);
    if (catMatch) {
      currentCategory = catMatch[1].trim().toLowerCase();
      continue;
    }

    const cardMatch = line.match(/^\|\s*(\d+)\s*\|\s*(.*?)\s*\|\s*`(.+?)`\s*\|/);
    if (cardMatch) {
      const id = parseInt(cardMatch[1]);
      const title = cardMatch[2].trim().replace(/^\*\*✓\s*/, '').replace(/\*\*$/, '');
      const file = cardMatch[3].trim();
      decisions.push({
        id,
        title,
        category: currentCategory,
        file,
        slug: file.replace(/\.md$/, '').replace(/[\\/]/g, '-'),
      });
    }
  }

  return decisions;
}

function extractGlossaryRefsFromDecisions(decisions, glossaryTerms) {
  return decisions.map(d => {
    const filePath = join(decisionsDir, d.file);
    let refs = [];
    if (existsSync(filePath)) {
      const content = readFileSync(filePath, 'utf-8');
      const glossaryMatch = content.match(/^glossary:\s*\n([\s\S]*?)^\w/m);
      if (glossaryMatch) {
        const list = glossaryMatch[1].match(/- (.+)/g);
        if (list) {
          refs = list.map(l => l.replace(/^- /, '').trim());
        }
      }
    }
    const matchedTerms = glossaryTerms.filter(t =>
      refs.some(r => t.name.toLowerCase() === r.toLowerCase())
    );
    return { ...d, glossaryRefs: [...new Set(matchedTerms.map(t => t.slug))] };
  });
}

const rawTerms = [];
for (const file of readdirSync(glossaryDir).filter(f => f.endsWith('.md'))) {
  const terms = parseGlossaryFile(join(glossaryDir, file));
  rawTerms.push(...terms);
}

// Merge duplicates: same slug = same term; combine themes, subThemes, descriptions
const merged = new Map();
for (const t of rawTerms) {
  if (merged.has(t.slug)) {
    const existing = merged.get(t.slug);
    if (!existing.themes.includes(t.theme)) existing.themes.push(t.theme);
    if (t.subTheme && !existing.subThemes.includes(t.subTheme)) existing.subThemes.push(t.subTheme);
    if (!existing.descriptions.includes(t.description)) existing.descriptions.push(t.description);
  } else {
    merged.set(t.slug, {
      name: t.name,
      slug: t.slug,
      category: t.category,
      themes: [t.theme],
      subThemes: t.subTheme ? [t.subTheme] : [],
      descriptions: [t.description],
    });
  }
}
const allTerms = [...merged.values()].map(t => ({
  ...t,
  description: t.descriptions.join(' | '),
}));

const rawDecisions = parseDecisions();
const decisions = extractGlossaryRefsFromDecisions(rawDecisions, allTerms);

// Build reverse: for each glossary term, which decisions reference it
const termDecisionMap = {};
for (const term of allTerms) {
  termDecisionMap[term.slug] = decisions
    .filter(d => d.glossaryRefs.includes(term.slug))
    .map(d => ({ id: d.id, title: d.title, slug: d.slug, category: d.category }));
}

const themes = [...new Set(allTerms.flatMap(t => t.themes))].sort();
const categories = [...new Set(decisions.map(d => d.category))].sort();

writeFileSync(join(outDir, 'glossary.json'), JSON.stringify({ terms: allTerms, themes, termDecisions: termDecisionMap }, null, 2));
writeFileSync(join(outDir, 'decisions.json'), JSON.stringify({ decisions, categories }, null, 2));
writeFileSync(join(outDir, 'themes.json'), JSON.stringify({ themes, categories }, null, 2));

// Copy source .md files into public/ so the app can fetch them at runtime
const publicDecisions = join(root, 'public', 'decisions');
mkdirSync(publicDecisions, { recursive: true });
const publicGlossary = join(root, 'public', 'glossary');
mkdirSync(publicGlossary, { recursive: true });
cpSync(decisionsDir, publicDecisions, { recursive: true, filter: f => f.endsWith('.md') });
cpSync(glossaryDir, publicGlossary, { recursive: true, filter: f => f.endsWith('.md') });

console.log(`Generated: ${allTerms.length} unique terms (from ${rawTerms.length} raw), ${decisions.length} decisions, ${themes.length} themes`);
