/* global document, console, process */
// Génère brochure/plaquette-les-coulisses-du-theatre.pdf à partir de brochure/plaquette.html.
// Nécessite Playwright et Chromium : `pnpm dlx playwright install chromium` si besoin.
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const dir = path.dirname(fileURLToPath(import.meta.url));
const source = pathToFileURL(path.join(dir, 'plaquette.html')).href;
const output = path.join(dir, 'plaquette-les-coulisses-du-theatre.pdf');

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(source, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.pdf({ path: output, format: 'A4', printBackground: true, preferCSSPageSize: true });
await browser.close();
console.log(`PDF généré : ${path.relative(process.cwd(), output)}`);
