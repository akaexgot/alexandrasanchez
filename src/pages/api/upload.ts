import type { APIRoute } from 'astro';
import { optimizeImage, MAX_UPLOAD } from '../../lib/uploads';
export const POST: APIRoute = async ({ locals, request }) => {
  if (!locals.editor || !locals.supabase) return new Response('No autorizado', { status: 401 });
  const length = Number(request.headers.get('content-length'));
  if (!length || length > MAX_UPLOAD + 65536) return Response.json({ error: 'La imagen supera el límite de subida.' }, { status: 413 });
  const form = await request.formData();
  const file = form.get('file');
  if (!(file instanceof File)) return Response.json({ error: 'Selecciona una imagen.' }, { status: 400 });
  let optimized: Buffer;
  try { optimized = await optimizeImage(file); } catch (error) { return Response.json({ error: error instanceof Error ? error.message : 'No se pudo leer la imagen.' }, { status: 400 }); }
  const id = crypto.randomUUID(), path = `${id}.webp`;
  const { error: uploadError } = await locals.supabase.storage.from('media').upload(path, optimized, { contentType: 'image/webp', upsert: false });
  if (uploadError) return Response.json({ error: 'No se pudo subir la fotografía.' }, { status: 503 });
  const { error } = await locals.supabase.from('media_assets').insert({ id, path, alt: String(form.get('alt') || file.name).slice(0, 180) });
  if (error) { await locals.supabase.storage.from('media').remove([path]); return Response.json({ error: 'No se pudo registrar la fotografía.' }, { status: 503 }); }
  return Response.json({ id, url: `/media/${id}?w=480` });
};
