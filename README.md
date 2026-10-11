# Pensilva History

A standalone digital archive of the history of Pensilva and St Ive in east Cornwall.

The repository preserves the historical material from the former Pensilva History Group website while the `astro-refresh` branch provides a new Astro presentation layer around it.

## Archive material

The original historical source remains in place:

- `src/people/` — people, families, memories and documentary articles
- `src/places/` — places, mines, buildings and local-history articles
- `src/images/galleries/old-pensilva/` — Old Pensilva photographic collection
- `src/images/galleries/modern-pensilva/` — Modern Pensilva photographic collection
- `src/images/galleries/on-the-moor/` — On the Moor photographic collection
- `src/images/engine-house.jpg` — the original homepage engine-house painting

The Astro site does not rewrite the historical Markdown. It provides new navigation, search, subject taxonomy, related stories, image-led archive pages and a photographic archive around the preserved material.

## Development

```bash
npm install
npm run dev
```

Build the static site with:

```bash
npm run check:content
npm run build
```

The content check verifies the archive structure, Markdown image references, the original article count, the three standalone photograph collections and the engine-house painting before deployment.

## Site structure

- `/` — archive homepage
- `/topics/` — curated subject routes
- `/people/` — people and memories
- `/places/` — places and landscape
- `/photographs/` — standalone photographic collections
- `/archive/` — complete article archive
- `/search/` — full-text archive search

Existing article URLs under `/people/<slug>/` and `/places/<slug>/` are retained.

## Historical provenance

Some articles identify the Pensilva History Group because that is the provenance of the original material. The current site is presented simply as **Pensilva History**, a standalone archive, rather than as the website of a present-day organisation.
