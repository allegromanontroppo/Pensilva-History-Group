import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { topics } from '../lib/taxonomy';

export const prerender = true;
export const GET: APIRoute = async ({ site }) => {
  const base = site ?? new URL('https://pensilva-history-group.netlify.app');
  const people = await getCollection('people');
  const places = await getCollection('places');
  const paths = ['/', '/archive/', '/people/', '/places/', '/photographs/', '/topics/', '/search/', '/rights/', ...people.map(e => `/people/${e.id}/`), ...places.map(e => `/places/${e.id}/`), ...topics.map(t => `/topics/${t.slug}/`)];
  const urls = paths.map(path => `<url><loc>${new URL(path, base).toString()}</loc></url>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, { headers: { 'Content-Type': 'application/xml' } });
};
