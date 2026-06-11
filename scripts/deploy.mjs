import { cpSync, rmSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const srcDir = resolve(__dirname, '..', 'dist');

const dest = process.env.DEPLOY_DEST
    ? resolve(process.env.DEPLOY_DEST)
    : resolve(__dirname, '..', '..', '..', 'jwpro-frontend', 'public', 'apps', 'azure-guide');

if (!existsSync(srcDir)) {
    console.error('❌  dist/ not found — run build first');
    process.exit(1);
}

if (existsSync(dest)) {
    rmSync(dest, { recursive: true, force: true });
}

cpSync(srcDir, dest, { recursive: true });
console.log(`✅  Deployed dist/ ➡️  ${dest}`);
