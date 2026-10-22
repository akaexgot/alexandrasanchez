import type { APIRoute } from 'astro';
export const GET: APIRoute = () => {
  const site = process.env.PUBLIC_SITE_URL || import.meta.env.PUBLIC_SITE_URL;
  return new Response(site ? `User-agent: *\nDisallow: /admin\nDisallow: /api/\nSitemap: ${site.replace(/\/$/, '')}/sitemap.xml\n` : 'User-agent: *\nDisallow: /\n', { headers: { 'Content-Type': 'text/plain' } });
};
