import { createClient } from '@supabase/supabase-js';

export const sections = {
  tratamientos: { table: 'treatments', title: 'Tratamientos', description: 'Cuida cada detalle de tu mirada.' },
  resultados: { table: 'gallery_results', title: 'Resultados', description: 'El detalle que marca la diferencia.' },
  opiniones: { table: 'testimonials', title: 'Opiniones', description: 'Experiencias compartidas con confianza.' },
  'preguntas-frecuentes': { table: 'faqs', title: 'Preguntas frecuentes', description: 'Hablemos de tus dudas.' },
  inicio: { table: 'home_content', title: 'Página de inicio', description: 'La primera impresión de tu espacio.' },
  negocio: { table: 'site_settings', title: 'Mi negocio', description: 'Tu información, siempre al día.' },
} as const;
export type Section = keyof typeof sections;
export interface Content {
  id: string; title: string; status: 'draft' | 'published'; sort_order: number;
  slug?: string; category?: string; summary?: string; description?: string;
  image_id?: string; detail_image_id?: string; second_detail_image_id?: string; before_id?: string; after_id?: string; treatment_id?: string;
  authorized?: boolean; featured?: boolean; answer?: string; author?: string;
  date?: string; session_duration?: string; result_duration?: string; before_care?: string;
  after_care?: string; touch_up?: string; seo_title?: string; seo_description?: string;
  phone?: string; whatsapp?: string; instagram?: string; facebook?: string;
  address?: string; hours?: string; biography?: string; subtitle?: string;
  introduction?: string; cta?: string; instagram_posts?: string;
}
export const business: Content = { id: '00000000-0000-4000-8000-000000000001', title: 'Alexandra Sánchez', status: 'published', sort_order: 0, phone: '626836018', whatsapp: '34626836018', instagram: 'https://www.instagram.com/micro.alexandrasanchez/', biography: 'Un espacio dedicado a la micropigmentación y la estética de la mirada. Una forma de entender la belleza desde los pequeños detalles y la atención personalizada.' };
export const home: Content = { id: business.id, title: 'Tu esencia.\nUna mirada única.', status: 'published', sort_order: 0, subtitle: 'Micropigmentación y estética de la mirada, con la atención que mereces.', introduction: 'Cada rostro tiene su propia expresión. Descubre un espacio donde hablar de lo que buscas y explorar los tratamientos que encajan contigo.', cta: 'Hablemos por WhatsApp' };
export const initialTreatments: Content[] = [
  ['cejas', 'Cejas', 'Micropigmentación', 'El marco de tu expresión.'],
  ['labios', 'Labios', 'Micropigmentación', 'Atención a la forma, al detalle y a tu estilo.'],
  ['eyeliner', 'Ojos / eyeliner', 'Micropigmentación', 'Una mirada con personalidad.'],
  ['retoques', 'Retoques', 'Micropigmentación', 'Revisamos contigo el siguiente paso.'],
  ['extensiones-pelo-a-pelo', 'Extensiones pelo a pelo', 'Estética de la mirada', 'Detalles que acompañan tu mirada.'],
  ['extensiones-5d', 'Extensiones 5D', 'Estética de la mirada', 'Explora una expresión con más protagonismo.'],
  ['lifting-de-pestanas', 'Lifting de pestañas', 'Estética de la mirada', 'Tu mirada, en primer plano.'],
  ['depilacion-con-hilo', 'Depilación con hilo', 'Estética de la mirada', 'El cuidado de los pequeños detalles.'],
].map(([slug, title, category, summary], i) => ({ id: `00000000-0000-4000-8000-${String(i + 10).padStart(12, '0')}`, slug, title, category, summary, description: 'Cuéntanos qué buscas y resolveremos tus dudas de forma personalizada antes de elegir el tratamiento.', status: 'published', sort_order: i, featured: i < 3 }));
export function configuration() {
  return { url: process.env.PUBLIC_SUPABASE_URL || import.meta.env.PUBLIC_SUPABASE_URL, key: process.env.PUBLIC_SUPABASE_PUBLISHABLE_KEY || import.meta.env.PUBLIC_SUPABASE_PUBLISHABLE_KEY };
}
export function publicClient() {
  const { url, key } = configuration();
  return url && key ? createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } }) : null;
}
export async function content(section: Section, options: { page?: number; treatment?: string } = {}): Promise<Content[]> {
  const client = publicClient();
  if (!client) return section === 'tratamientos' ? initialTreatments : section === 'inicio' ? [home] : section === 'negocio' ? [business] : [];
  const page = Math.max(1, options.page || 1);
  let query = client.from(sections[section].table).select('*').eq('status', 'published').order('sort_order').order('id').range((page - 1) * 24, page * 24 - 1);
  if (options.treatment) query = query.eq('treatment_id', options.treatment);
  const { data, error } = await query;
  if (error) throw new Error('CONTENT_UNAVAILABLE');
  return data as Content[];
}
export async function treatmentBySlug(slug: string) {
  const client = publicClient();
  if (!client) return initialTreatments.find(item => item.slug === slug);
  const { data, error } = await client.from('treatments').select('*').eq('slug', slug).eq('status', 'published').maybeSingle();
  if (error) throw new Error('CONTENT_UNAVAILABLE');
  return data as Content | null;
}
export const imageUrl = (id?: string, width = 960) => id ? `/media/${id}?w=${width}` : '';
