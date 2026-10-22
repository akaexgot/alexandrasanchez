import { z } from 'zod';
import type { Section } from './content';
const text = z.string().trim().max(12000).default('');
const image = z.union([z.uuid(), z.literal('')]).transform(v => v || null).optional();
const relation = image;
const base = { title: z.string().trim().min(1, 'Escribe un título.').max(180), status: z.enum(['draft', 'published']), sort_order: z.coerce.number().int().min(0).max(99999).default(0) };
const social = (host: string) => z.string().trim().max(300).refine(v => !v || (() => { try { const u = new URL(v); return u.protocol === 'https:' && (u.hostname === host || u.hostname === `www.${host}`) && !u.username && !u.password; } catch { return false; } })(), `Usa un enlace https de ${host}.`);
export const schemas = {
  tratamientos: z.object({ ...base, slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Revisa la dirección del tratamiento.').max(120), category: z.enum(['Micropigmentación', 'Estética de la mirada']), summary: z.string().trim().max(300), description: text, image_id: image, detail_image_id: image, second_detail_image_id: image, featured: z.boolean(), session_duration: text, result_duration: text, before_care: text, after_care: text, touch_up: text, seo_title: z.string().max(100), seo_description: z.string().max(200) }),
  resultados: z.object({ ...base, treatment_id: z.uuid('Selecciona un tratamiento.'), before_id: image, after_id: image, description: text, authorized: z.boolean(), featured: z.boolean() }).refine(v => v.status !== 'published' || (v.authorized && v.before_id && v.after_id), 'Para publicar, añade ambas fotografías y confirma la autorización.'),
  opiniones: z.object({ ...base, author: z.string().trim().min(1).max(120), description: z.string().trim().min(1).max(5000), treatment_id: relation, date: z.union([z.iso.date(), z.literal('')]).transform(v => v || null), authorized: z.boolean() }).refine(v => v.status !== 'published' || v.authorized, 'Confirma la autorización para publicar esta opinión.'),
  'preguntas-frecuentes': z.object({ ...base, answer: z.string().trim().min(1).max(12000), treatment_id: relation }),
  inicio: z.object({ ...base, subtitle: text, introduction: text, image_id: image, cta: z.string().trim().min(1).max(80), instagram_posts: z.string().max(2000).refine(v => v.split('\n').filter(s => s.trim()).every(s => /^https:\/\/www\.instagram\.com\/(p|reel)\/[\w-]+\/?$/.test(s.trim())), 'Introduce una URL oficial de publicación por línea.') }),
  negocio: z.object({ ...base, phone: z.string().regex(/^\d{9,15}$/), whatsapp: z.string().regex(/^\d{10,15}$/), instagram: social('instagram.com'), facebook: social('facebook.com'), address: text, hours: text, biography: text, image_id: image }),
};
export function parseContent(section: Section, form: FormData) {
  const input: Record<string, unknown> = Object.fromEntries(form.entries());
  for (const key of ['featured', 'authorized']) input[key] = form.get(key) === 'on';
  return schemas[section].safeParse(input);
}
export function slugify(value: string) { return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
