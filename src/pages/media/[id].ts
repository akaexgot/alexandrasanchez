import type { APIRoute } from 'astro';
import { publicClient } from '../../lib/content';
import sharp from 'sharp';
import { z } from 'zod';
export const GET: APIRoute = async ({ locals, params, url }) => {
  if (!z.uuid().safeParse(params.id).success) return new Response('No encontrado', { status: 404 });
  const client = locals.editor ? locals.supabase : publicClient();
  if (!client) return new Response('No encontrado', { status: 404 });
  const { data: asset, error } = await client.from('media_assets').select('path').eq('id', params.id).maybeSingle();
  if (error || !asset) return new Response('No encontrado', { status: 404 });
  const { data, error: downloadError } = await client.storage.from('media').download(asset.path);
  if (downloadError || !data) return new Response('No encontrado', { status: 404 });
  const requested = Number(url.searchParams.get('w'));
  const width = [480, 640, 960, 1200, 1600].includes(requested) ? requested : 960;
  const output = await sharp(Buffer.from(await data.arrayBuffer())).resize({ width, withoutEnlargement: true }).webp({ quality: 82 }).toBuffer();
  return new Response(new Uint8Array(output), { headers: { 'Content-Type': 'image/webp', 'Cache-Control': 'private, no-store' } });
};
