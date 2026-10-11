import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, extname, join, resolve } from 'node:path';

const collections = ['src/people', 'src/places'];
const galleries = ['old-pensilva', 'modern-pensilva', 'on-the-moor'];
const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const errors = [];
let articleCount = 0;
let imageReferenceCount = 0;

function imageFilesUnder(directory) {
  if (!existsSync(directory)) return [];
  const found = [];
  for (const entry of readdirSync(directory)) {
    const path = join(directory, entry);
    const stat = statSync(path);
    if (stat.isDirectory()) found.push(...imageFilesUnder(path));
    else if (imageExtensions.has(extname(entry).toLowerCase())) found.push(path);
  }
  return found;
}

function requireFileContains(path, needles) {
  if (!existsSync(path)) {
    errors.push(`Required protection file not found: ${path}`);
    return;
  }
  const source = readFileSync(path, 'utf8');
  for (const needle of needles) {
    if (!source.includes(needle)) errors.push(`${path}: required protection signal missing: ${needle}`);
  }
}

function requireFileOmits(path, needles) {
  if (!existsSync(path)) {
    errors.push(`Required protection file not found: ${path}`);
    return;
  }
  const source = readFileSync(path, 'utf8');
  for (const needle of needles) {
    if (source.includes(needle)) errors.push(`${path}: overly broad AI restriction must not be present: ${needle}`);
  }
}

for (const collection of collections) {
  const markdownFiles = readdirSync(collection).filter(file => file.endsWith('.md')).sort();

  for (const file of markdownFiles) {
    articleCount += 1;
    const fullPath = join(collection, file);
    const slug = file.replace(/\.md$/, '');
    const source = readFileSync(fullPath, 'utf8');

    const title = source.match(/^title:\s*(.+)$/m)?.[1]?.trim();
    if (!title) errors.push(`${fullPath}: missing title in front matter`);

    const preview = source.match(/^preview:\s*(.+)$/m)?.[1]?.trim().replace(/^['"]|['"]$/g, '');
    if (preview) {
      const previewPath = join(collection, slug, preview);
      if (!existsSync(previewPath)) errors.push(`${fullPath}: preview image not found: ${previewPath}`);
    }

    for (const match of source.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)) {
      let target = match[1].trim();
      if (!target || /^(?:https?:)?\/\//i.test(target) || target.startsWith('data:')) continue;

      target = target.replace(/^<|>$/g, '').split(/\s+["']/)[0];
      try { target = decodeURIComponent(target); } catch { /* use the literal path */ }

      imageReferenceCount += 1;
      const imagePath = resolve(dirname(fullPath), target);
      if (!existsSync(imagePath)) errors.push(`${fullPath}: linked image not found: ${target}`);
    }
  }
}

if (articleCount < 51) errors.push(`Expected at least the original 51 archive articles; found ${articleCount}.`);

const heroPath = 'src/images/engine-house.jpg';
if (!existsSync(heroPath)) errors.push(`Hero painting not found: ${heroPath}`);

let galleryImageCount = 0;
for (const gallery of galleries) {
  const directory = join('src/images/galleries', gallery);
  const images = imageFilesUnder(directory);
  galleryImageCount += images.length;
  if (!images.length) errors.push(`Photograph collection is missing or empty: ${directory}`);
}

const archiveImageCount = collections.reduce((sum, collection) => sum + imageFilesUnder(collection).length, 0);

requireFileContains('static/robots.txt', [
  'Content-Signal: search=yes, ai-train=no, use=reference',
  'Content-Usage: train-ai=n',
  'User-agent: Googlebot\nAllow: /',
  'User-agent: OAI-SearchBot\nAllow: /',
  'User-agent: Claude-SearchBot\nAllow: /',
  'User-agent: Claude-User\nAllow: /',
  'User-agent: PerplexityBot\nAllow: /',
  'User-agent: Applebot\nAllow: /',
  'User-agent: GPTBot\nDisallow: /',
  'User-agent: ClaudeBot\nDisallow: /',
  'User-agent: Google-Extended\nDisallow: /',
  'User-agent: Applebot-Extended\nDisallow: /',
  'User-agent: CCBot\nDisallow: /',
]);
requireFileContains('static/.well-known/tdmrep.json', ['"tdm-reservation": 1']);
requireFileContains('static/ai.txt', [
  'model-training and dataset-ingestion opt-out only',
  'search, linking, citation and',
  'User-Agent: *',
  'Disallow: /',
]);
requireFileContains('astro-src/layouts/BaseLayout.astro', [
  'index, follow, max-image-preview:large',
  'name="tdm-reservation" content="1"',
  'name="tdm-policy"',
  '/rights/',
]);
requireFileOmits('astro-src/layouts/BaseLayout.astro', ['noai', 'noimageai']);
requireFileContains('netlify.toml', [
  'TDM-Reservation = "1"',
  'Content-Usage = "train-ai=n"',
  'Content-Signal = "search=yes, ai-train=no, use=reference"',
]);
requireFileOmits('netlify.toml', ['X-Robots-Tag = "noai, noimageai"']);
requireFileContains('astro-src/pages/rights.astro', [
  'including in AI search',
  'AI training and text & data mining',
  'Machine-readable reservation',
]);

if (errors.length) {
  console.error(`Archive integrity check failed with ${errors.length} problem${errors.length === 1 ? '' : 's'}:`);
  for (const error of errors) console.error(` - ${error}`);
  process.exit(1);
}

console.log(`Archive integrity check passed: ${articleCount} articles, ${imageReferenceCount} local Markdown image references, ${archiveImageCount} article image files, ${galleryImageCount} gallery photographs, the engine-house hero painting, and the archive's search-friendly AI/TDM rights signals.`);
