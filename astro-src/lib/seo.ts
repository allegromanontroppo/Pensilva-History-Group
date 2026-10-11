import type { ArchiveEntry } from './archive';

const curatedTitles: Record<string, string> = {
  'emily-hobhouse': 'Emily Hobhouse: St Ive to South Africa | Pensilva History',
  'pensilva-a-brief-history': 'History of Pensilva, Cornwall | Pensilva History',
  'pensilva-world-heritage-site': 'Pensilva & Caradon Hill World Heritage Site | Pensilva History',
  'south-caradon-mine': 'South Caradon Mine, Cornwall | Pensilva History',
  'glasgow-caradon-mine': 'Glasgow Caradon Mine, Cornwall | Pensilva History',
  'craddock-moor-mine': 'Craddock Moor Mine, Cornwall | Pensilva History',
  'wheal-ludcott-mine': 'Wheal Ludcott Mine, Cornwall | Pensilva History',
  'wheal-wrey-mine': 'Wheal Wrey Mine, Cornwall | Pensilva History',
  'war-memorials-in-pensilva-and-st-ive': 'Pensilva & St Ive War Memorials | Pensilva History',
  'pensilva-and-st-ive-schools': 'Pensilva & St Ive Schools: Local History | Pensilva History',
  'jubilee-farm': 'Jubilee Farm, Pensilva: Local History | Pensilva History',
  'rillaton-barrow-and-the-gold-cup': 'Rillaton Barrow & Gold Cup, Cornwall | Pensilva History',
  'the-story-of-trebeigh-at-st-ive': 'Trebeigh, St Ive: House & Family History | Pensilva History',
  'middle-hill-sale-of-land-and-buildings': 'Middle Hill, Pensilva: Land & Buildings | Pensilva History',
  'my-house-in-middle-hill': 'A House in Middle Hill, Pensilva | Pensilva History',
  'old-st-ive-postcard': 'Old St Ive Postcard & Local History | Pensilva History',
  'kellys-directory-1883': "Kelly's Directory 1883: Pensilva & St Ive | Pensilva History",
  'william-west': 'William West: Cornish Mining Engineer | Pensilva History',
  'daniel-gumb': 'Daniel Gumb of Caradon Hill | Pensilva History',
  'alfred-snowden': 'Alfred Snowden of Pensilva: First World War | Pensilva History',
  'early-memories-of-an-evacuee': 'Evacuee Memories from Pensilva | Pensilva History',
  'childhood-memories-of-an-evacuee-sunday-observance': 'Childhood Evacuee Memories in Pensilva | Pensilva History',
  'pc-bill-lyle-and-family-of-pensilva': 'P.C. Bill Lyle & Family of Pensilva | Pensilva History',
  'pensilva-coronation-day-second-june-1953': 'Pensilva Coronation Day 1953 | Pensilva History',
  'queen-victorias-diamond-jubilee': "Queen Victoria's Diamond Jubilee in Pensilva | Pensilva History",
  'gypsies-in-pensilva': 'Gypsies in Pensilva: Local History | Pensilva History',
  'memories-of-st-ive-village': 'Memories of St Ive Village, Cornwall | Pensilva History',
  'do-you-recognise-these-cottages': 'Historic Cottages Around Pensilva | Pensilva History',
  'old-newspaper-clippings': 'Historic Pensilva Newspaper Clippings | Pensilva History',
  'the-cornish-penny': 'The Cornish Penny: Local History | Pensilva History',
  's-s-pensilva': 'S.S. Pensilva: Maritime History | Pensilva History',
};

export function seoTitleFor(entry: ArchiveEntry) {
  return curatedTitles[entry.id] ?? `${entry.data.title} | Pensilva History`;
}
