import type { ArchiveEntry } from './archive';

const imageModules = import.meta.glob('../../src/**/*.{jpg,jpeg,JPG,JPEG,png,PNG,webp,WEBP}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

function resolveArchiveImage(entry: ArchiveEntry, target: string): string | undefined {
  let cleaned = target.trim().replace(/^<|>$/g, '').split(/\s+["']/)[0];
  if (!cleaned || /^(?:https?:)?\/\//i.test(cleaned) || cleaned.startsWith('data:') || cleaned.startsWith('/')) return undefined;

  cleaned = cleaned.split(/[?#]/)[0];
  try { cleaned = decodeURIComponent(cleaned); } catch { /* use the literal path */ }

  const parts = [entry.collection];
  for (const part of cleaned.split('/')) {
    if (!part || part === '.') continue;
    if (part === '..') parts.pop();
    else parts.push(part);
  }

  return imageModules[`../../src/${parts.join('/')}`];
}

function firstMarkdownImage(entry: ArchiveEntry): string | undefined {
  for (const match of entry.body.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)) {
    const src = resolveArchiveImage(entry, match[1]);
    if (src) return src;
  }
  return undefined;
}

function firstFolderImage(entry: ArchiveEntry): string | undefined {
  const prefix = `../../src/${entry.collection}/${entry.id}/`;
  return Object.entries(imageModules)
    .filter(([path]) => path.startsWith(prefix))
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([, src]) => src)[0];
}

export function previewImage(entry: ArchiveEntry): string | undefined {
  if (entry.data.preview) {
    const configured = imageModules[`../../src/${entry.collection}/${entry.id}/${entry.data.preview}`];
    if (configured) return configured;
  }

  return firstMarkdownImage(entry) ?? firstFolderImage(entry);
}

export const gallerySections = [
  {
    slug: 'old-pensilva',
    title: 'Old Pensilva',
    description: 'Historic views and photographs of the village preserved in the original site collection.',
  },
  {
    slug: 'modern-pensilva',
    title: 'Modern Pensilva',
    description: 'Later views of Pensilva and its buildings, landscape and community.',
  },
  {
    slug: 'on-the-moor',
    title: 'On the Moor',
    description: 'Photographs from the moorland and historic landscape surrounding Pensilva.',
  },
] as const;

export type GallerySlug = (typeof gallerySections)[number]['slug'];

export interface GalleryImage {
  src: string;
  filename: string;
  label: string;
}

function humaniseFilename(filename: string) {
  return filename
    .replace(/\.[^.]+$/, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function galleryImages(slug: GallerySlug): GalleryImage[] {
  const prefix = `../../src/images/galleries/${slug}/`;
  return Object.entries(imageModules)
    .filter(([path]) => path.startsWith(prefix))
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([path, src]) => {
      const filename = path.split('/').pop() ?? path;
      return { src, filename, label: humaniseFilename(filename) };
    });
}
