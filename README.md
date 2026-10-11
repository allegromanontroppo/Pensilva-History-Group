# Pensilva History Group

The digital archive of the Pensilva History Group, covering the people, places, industry and social history of Pensilva and the Parish of St Ive in east Cornwall.

## Architecture

The current presentation layer is built with **Astro** and deployed as a static site. The historical archive itself is deliberately kept independent of the framework:

- `src/people/*.md` — original People articles
- `src/places/*.md` — original Places articles
- `src/people/<slug>/` and `src/places/<slug>/` — article photographs
- `src/images/engine-house.jpg` — homepage hero painting
- `astro-src/` — Astro layouts, pages, styles and archive discovery features

The older Gatsby source remains in the repository during the migration. The historical Markdown and photographs are the canonical content and should not be moved into Astro components.

## Development

Requires Node 22.

```sh
npm install
npm run dev
```

Build the production static site with:

```sh
npm run build
```

The generated site is written to `dist/`.

## Adding an archive story

Add a Markdown file to either `src/people` or `src/places` using the existing front matter shape:

```yaml
---
title: Story title
preview: PreviewPhoto.jpg
---
```

If the story has photographs, keep them in a directory beside the Markdown file whose name matches the article slug. Reference them from Markdown with relative paths as the existing articles do.

Existing article URLs are intentionally preserved as:

- `/people/<slug>/`
- `/places/<slug>/`

## Subjects

The People/Places split is retained for compatibility, while broader subject browsing is defined in `astro-src/lib/taxonomy.ts`.

When adding a story, add its slug to the taxonomy assignment table so it appears under the most useful subjects. A story can belong to more than one subject.

## Search

`/search/` provides client-side full-text search across titles, article Markdown and subject labels. There is no search service or database to maintain.

## Images

Archive cards use the existing `preview` image from each article. Images embedded in article Markdown remain part of the article and can be opened in a larger lightbox without changing the source Markdown.

The homepage hero must continue to use `src/images/engine-house.jpg`.

## Preservation rule

Historical article copy, photographs and captions should be treated as archive material. If information has become outdated, prefer a clearly separated present-day note in the Astro presentation layer rather than silently rewriting the historical article.

## Deployment

Netlify builds the site with:

```sh
npm run build
```

and publishes `dist/`. GitHub Actions also runs a production build on pushes and pull requests.
