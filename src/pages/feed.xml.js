import { getPublishedArticles, hrefFor } from '../lib/knowledge';

export async function GET() {
  const articles = await getPublishedArticles();
  const items = articles.map((article) => `<item><title>${escapeXml(article.data.title)}</title><link>https://indie.pi3.in${hrefFor(article)}</link><guid>https://indie.pi3.in${hrefFor(article)}</guid><description>${escapeXml(article.data.description)}</description><pubDate>${article.data.lastVerified.toUTCString()}</pubDate></item>`).join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>IndieWiki</title><link>https://indie.pi3.in/</link><description>The practical wiki for independent builders.</description><language>en</language>${items}</channel></rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}

function escapeXml(value) { return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;'); }
