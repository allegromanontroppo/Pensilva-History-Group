import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';

const collections = ['src/people', 'src/places'];
const errors = [];
let articleCount = 0;
let imageReferenceCount = 0;

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

if (errors.length) {
  console.error(`Archive integrity check failed with ${errors.length} problem${errors.length === 1 ? '' : 's'}:`);
  for (const error of errors) console.error(` - ${error}`);
  process.exit(1);
}

console.log(`Archive integrity check passed: ${articleCount} articles, ${imageReferenceCount} local image references.`);
