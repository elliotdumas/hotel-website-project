/* global document, console, process */
// Génère les plaquettes PDF à partir des fichiers HTML de brochure/.
// Usage : pnpm brochure            → toutes les plaquettes
//         pnpm brochure seminaires → seulement brochure/plaquette-seminaires.html
// Nécessite Playwright et Chromium : `pnpm dlx playwright install chromium` si besoin.
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const dir = path.dirname(fileURLToPath(import.meta.url));
const brochures = {
  generale: ['plaquette.html', 'plaquette-les-coulisses-du-theatre.pdf'],
  seminaires: ['plaquette-seminaires.html', 'plaquette-seminaires-les-coulisses-du-theatre.pdf'],
};
const wanted = process.argv.slice(2);
const list = wanted.length ? wanted : Object.keys(brochures);

const browser = await chromium.launch();
for (const key of list) {
  const [html, pdf] = brochures[key];
  const output = path.join(dir, pdf);
  const page = await browser.newPage();
  await page.goto(pathToFileURL(path.join(dir, html)).href, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: output, format: 'A4', printBackground: true, preferCSSPageSize: true });
  await page.close();
  console.log(`PDF généré : ${path.relative(process.cwd(), output)}`);
}
await browser.close();
