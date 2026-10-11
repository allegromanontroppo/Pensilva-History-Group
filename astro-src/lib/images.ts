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
