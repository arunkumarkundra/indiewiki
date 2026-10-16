/**
 * Small helpers shared by every part of the build.
 * Nothing here touches the file system except where a function says so.
 */
import { createHash } from 'node:crypto';

/** Escape text so it is safe inside HTML element content and attribute values. */
export function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Turn any text into a URL- and id-safe slug.
 * "Send mail as: Gmail (2027)" -> "send-mail-as-gmail-2027"
 */
export function slugify(text) {
  return String(text)
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80) || 'section';
}

/** Short, stable hash. Used for checklist item ids and asset cache-busting. */
export function shortHash(text, length = 8) {
  return createHash('sha256').update(String(text)).digest('hex').slice(0, length);
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** True when the value is a real calendar date written as YYYY-MM-DD. */
export function isIsoDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const d = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === value;
}

/** "2026-10-16" -> "16 Oct 2026". Day-month-year avoids US/EU confusion. */
export function humanDate(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

/** "2026-10" or "2026-10-16" -> "Oct 2026". Used for "price checked" stamps. */
export function monthYear(iso) {
  const [y, m] = String(iso).split('-').map(Number);
  return `${MONTHS[m - 1]} ${y}`;
}

/** Strip Markdown/HTML down to readable plain text (for search, meta and llms.txt). */
export function plainText(markdownOrHtml) {
  return String(markdownOrHtml)
    .replace(/<[^>]+>/g, ' ')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]*)`/g, '$1')
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[\[(?:tool|kbd|term|email):([^\]]+)\]\]/g, '$1')
    .replace(/^:::.*$/gm, ' ')
    .replace(/[#*_>|~-]+/g, ' ')
    .replace(/&[a-z#0-9]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Rough reading time in minutes, at a calm 200 words per minute. */
export function readingMinutes(text) {
  const words = plainText(text).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/** Collapse whitespace and trim to a maximum length on a word boundary. */
export function truncate(text, max) {
  const clean = String(text).replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`;
}
