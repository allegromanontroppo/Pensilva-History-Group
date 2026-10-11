import type { ArchiveEntry } from './archive';

const imageModules = import.meta.glob('../../src/**/*.{jpg,jpeg,JPG,JPEG,png,PNG,webp,WEBP}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

export function previewImage(entry: ArchiveEntry): string | undefined {
  if (!entry.data.preview) return undefined;
  return imageModules[`../../src/${entry.collection}/${entry.id}/${entry.data.preview}`];
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
