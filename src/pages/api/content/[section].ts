import type { APIRoute } from 'astro';
import { sections, type Section } from '../../../lib/content';
import { parseContent } from '../../../lib/validation';
import { z } from 'zod';
import { removeUnusedMedia } from '../../../lib/media-cleanup';
export const POST: APIRoute = async ({ locals, params, request }) => {
  if (!locals.editor || !locals.supabase) return new Response('No autorizado', { status: 401 });
  const section = params.section as Section;
  if (!Object.hasOwn(sections, section)) return new Response('No encontrado', { status: 404 });
  const form = await request.formData();
  const id = String(form.get('id') || '');
  if (id && !z.uuid().safeParse(id).success) return Response.json({ error: 'Identificador no válido.' }, { status: 400 });
  const previous = id ? await locals.supabase.from(sections[section].table).select('*').eq('id', id).maybeSingle() : { data: null, error: null };
  if (previous.error) return Response.json({ error: 'No se pudo leer el contenido.' }, { status: 503 });
  const imageFields = ['image_id', 'detail_image_id', 'second_detail_image_id', 'before_id', 'after_id'];
  const oldImages: string[] = imageFields.map(key => previous.data?.[key]).filter(Boolean);
  if (form.get('action') === 'delete') {
    if (!id || ['inicio', 'negocio'].includes(section)) return Response.json({ error: 'No se puede eliminar este contenido.' }, { status: 400 });
    const { error } = await locals.supabase.from(sections[section].table).delete().eq('id', id);
    if (!error) await removeUnusedMedia(locals.supabase, oldImages);
    return error ? Response.json({ error: 'No se pudo eliminar. Puede estar asociado a otros contenidos.' }, { status: 409 }) : Response.json({ ok: true, redirect: `/admin/${section}` });
  }
  const result = parseContent(section, form);
  if (!result.success) return Response.json({ error: result.error.issues.map(i => i.message).join(' ') }, { status: 400 });
  const table = locals.supabase.from(sections[section].table);
  const payload: Record<string, unknown> = result.data;
  const { data, error } = id ? await table.update(payload).eq('id', id).select('id').single() : await table.insert(payload).select('id').single();
  if (error) return Response.json({ error: error.code === '23505' ? 'Ya existe un contenido con esa dirección.' : 'No se pudo guardar. Comprueba los campos y las fotografías.' }, { status: 400 });
  const keptImages = imageFields.map(key => payload[key]);
  await removeUnusedMedia(locals.supabase, oldImages.filter(image => !keptImages.includes(image)));
  return Response.json({ ok: true, redirect: `/admin/${section}/${data.id}?saved=1` });
};
