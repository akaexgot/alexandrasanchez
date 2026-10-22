import type { APIRoute } from 'astro';
import { publicClient, initialTreatments } from '../lib/content';
export const GET: APIRoute = async () => {
  const site = process.env.PUBLIC_SITE_URL || import.meta.env.PUBLIC_SITE_URL;
  if (!site) return new Response('Dominio pendiente de configurar', { status: 503 });
  const client = publicClient();
  const paths = ['', 'sobre-mi', 'tratamientos', 'resultados', 'opiniones', 'preguntas-frecuentes', 'contacto'];
  const { data, error } = client ? await client.from('treatments').select('slug').eq('status', 'published').limit(1000) : { data: initialTreatments, error: null };
  if (error) return new Response('No disponible', { status: 503 });
  paths.push(...(data || []).map(row => `tratamientos/${row.slug}`));
  const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map(p => `<url><loc>${escape(new URL('/' + p, site).href)}</loc></url>`).join('')}</urlset>`, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
