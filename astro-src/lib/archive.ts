import type { CollectionEntry } from 'astro:content';

export type ArchiveEntry = CollectionEntry<'people'> | CollectionEntry<'places'>;

export function archivePath(entry: ArchiveEntry) {
  return `/${entry.collection}/${entry.id}/`;
}

export function archiveLabel(collection: ArchiveEntry['collection']) {
  return collection === 'people' ? 'People & stories' : 'Places & landscape';
}

export function plainText(markdown = '') {
  return markdown
    .replace(/<[^>]*>/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[`*_>#~-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function excerpt(markdown = '', length = 170) {
  const text = plainText(markdown);
  if (text.length <= length) return text;
  return `${text.slice(0, length).replace(/\s+\S*$/, '')}…`;
}

export function alphabetical(entries: ArchiveEntry[]) {
  return [...entries].sort((a, b) => a.data.title.localeCompare(b.data.title));
}
