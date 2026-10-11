import type { ArchiveEntry } from './archive';

export const topics = [
  { slug: 'people-families', label: 'People & families', description: 'Family histories, biographies and the people who shaped life around Pensilva and St Ive.' },
  { slug: 'mining-industry', label: 'Mining & industry', description: 'Mines, engine houses, working lives and the industrial landscape of east Cornwall.' },
  { slug: 'places-buildings', label: 'Places & buildings', description: 'Houses, farms, schools, villages, landmarks and the changing local landscape.' },
  { slug: 'memories-everyday-life', label: 'Memories & everyday life', description: 'First-hand memories, community life, celebrations, customs and ordinary days remembered.' },
  { slug: 'war-remembrance', label: 'War & remembrance', description: 'War service, evacuation, memorials and stories shaped by conflict and commemoration.' },
  { slug: 'documents-research', label: 'Documents & research', description: 'Directories, newspapers, postcards, archival finds and resources for further research.' },
] as const;

export type Topic = (typeof topics)[number];
type TopicSlug = Topic['slug'];

const assignments: Record<string, TopicSlug[]> = {
  'alfred-snowden': ['people-families', 'war-remembrance'],
  'childhood-memories-of-an-evacuee-sunday-observance': ['memories-everyday-life', 'war-remembrance'],
  'daniel-gumb': ['people-families', 'places-buildings'],
  'early-memories-of-an-evacuee': ['memories-everyday-life', 'war-remembrance'],
  'emily-hobhouse': ['people-families', 'war-remembrance'],
  'george-sidney-strode': ['people-families'],
  'gypsies-in-pensilva': ['people-families', 'memories-everyday-life'],
  'kellys-directory-1883': ['documents-research'],
  'local-ghost-story': ['memories-everyday-life'],
  'mrs-marie-bennett': ['people-families', 'memories-everyday-life'],
  'my-life-as-a-rural-doctors-wife-over-three-decades': ['people-families', 'memories-everyday-life'],
  'old-newspaper-clippings': ['documents-research'],
  'old-st-ive-postcard': ['documents-research', 'places-buildings'],
  'pc-bill-lyle-and-family-of-pensilva': ['people-families'],
  'pensilva-coronation-day-second-june-1953': ['memories-everyday-life'],
  'peter-skews': ['people-families'],
  'queen-victorias-diamond-jubilee': ['memories-everyday-life'],
  'richard-kelly-hornabrook': ['people-families'],
  'sunday-school-outing-1973': ['memories-everyday-life'],
  'the-davis-family': ['people-families'],
  'the-independent-order-of-rechabites': ['memories-everyday-life'],
  'the-northcott-family': ['people-families'],
  'the-salvation-army': ['memories-everyday-life'],
  'the-tregilgas-family': ['people-families'],
  'war-memorials-in-pensilva-and-st-ive': ['war-remembrance', 'documents-research'],
  'wilkie-collins': ['people-families'],
  'william-bath': ['people-families'],
  'william-pollard': ['people-families'],
  'william-west': ['people-families', 'mining-industry'],
  'craddock-moor-mine': ['mining-industry', 'places-buildings'],
  'do-you-recognise-these-cottages': ['places-buildings', 'documents-research'],
  'fools-corner': ['places-buildings', 'memories-everyday-life'],
  'glasgow-caradon-mine': ['mining-industry', 'places-buildings'],
  'going-to-the-well': ['memories-everyday-life', 'places-buildings'],
  'jubilee-farm': ['places-buildings', 'memories-everyday-life'],
  'memories-of-st-ive-village': ['memories-everyday-life', 'places-buildings'],
  'middle-hill-sale-of-land-and-buildings': ['places-buildings', 'documents-research'],
  'my-house-in-middle-hill': ['places-buildings', 'people-families'],
  'pensilva-a-brief-history': ['places-buildings', 'mining-industry'],
  'pensilva-and-st-ive-schools': ['places-buildings', 'memories-everyday-life'],
  'pensilva-world-heritage-site': ['mining-industry', 'places-buildings'],
  'put-on-take-off-stones': ['places-buildings', 'memories-everyday-life'],
  'rillaton-barrow-and-the-gold-cup': ['places-buildings'],
  's-s-pensilva': ['documents-research'],
  'south-caradon-mine': ['mining-industry', 'places-buildings'],
  'the-cornish-penny': ['documents-research', 'memories-everyday-life'],
  'the-research-hub-local-and-family-history': ['documents-research'],
  'the-story-of-trebeigh-at-st-ive': ['places-buildings', 'people-families'],
  'visiting-the-cemetery': ['places-buildings', 'people-families'],
  'wheal-ludcott-mine': ['mining-industry', 'places-buildings'],
  'wheal-wrey-mine': ['mining-industry', 'places-buildings'],
};

export function topicsFor(entry: ArchiveEntry): Topic[] {
  const slugs = assignments[entry.id] ?? [entry.collection === 'people' ? 'people-families' : 'places-buildings'];
  return slugs.map(slug => topics.find(topic => topic.slug === slug)!).filter(Boolean);
}

export function topicForSlug(slug: string) {
  return topics.find(topic => topic.slug === slug);
}

export function entriesForTopic(entries: ArchiveEntry[], slug: string) {
  return entries.filter(entry => topicsFor(entry).some(topic => topic.slug === slug));
}
