import { getCollection, type CollectionEntry } from 'astro:content';

export type Article = CollectionEntry<'knowledge'>;

export async function getPublishedArticles() {
  const entries = await getCollection('knowledge', ({ data }) => data.status === 'published');
  return entries.sort((a, b) => a.data.title.localeCompare(b.data.title));
}

export function hrefFor(article: Article) {
  return `/wiki/${article.data.slug}/`;
}

export function titleCase(value: string) {
  return value.replaceAll('-', ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
}
