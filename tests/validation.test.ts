import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseContent, slugify } from '../src/lib/validation';
import { optimizeImage } from '../src/lib/uploads';
import sharp from 'sharp';
function form(values: Record<string, string>) { const form = new FormData(); Object.entries(values).forEach(([k,v]) => form.set(k,v)); return form; }
test('publication requires consent and both gallery images', () => {
  const values = { title: 'Resultado', treatment_id: crypto.randomUUID(), status: 'published', description: '', before_id: crypto.randomUUID(), after_id: crypto.randomUUID() };
  assert.equal(parseContent('resultados', form(values)).success, false);
  assert.equal(parseContent('resultados', form({ ...values, authorized: 'on' })).success, true);
  assert.equal(parseContent('resultados', form({ ...values, authorized: 'on', after_id: '' })).success, false);
  assert.equal(parseContent('resultados', form({ ...values, status: 'draft', before_id: '', after_id: '' })).success, true);
});
test('rejects unapproved reviews and non-Instagram embeds', () => {
  assert.equal(parseContent('opiniones', form({ title: 'Opinión', author: 'Cliente', description: 'Texto', date: '', treatment_id: '', status: 'published' })).success, false);
  assert.equal(parseContent('inicio', form({ title: 'Inicio', subtitle: '', introduction: '', cta: 'Contactar', status: 'draft', instagram_posts: 'https://evil.example/p/test' })).success, false);
});
test('normalizes accents and rejects executable URL schemes', () => {
  assert.equal(slugify('  Depilación con Hilo! '), 'depilacion-con-hilo');
  assert.equal(parseContent('negocio', form({ title: 'Negocio', status: 'draft', phone: '626836018', whatsapp: '34626836018', instagram: 'javascript:alert(1)', facebook: '' })).success, false);
});
test('decodes real image bytes, rejects spoofed types, strips metadata and optimizes', async () => {
  const png = await sharp({ create: { width: 300, height: 300, channels: 3, background: '#eee' } }).png().toBuffer();
  const bytes = new Uint8Array(png);
  const result = await optimizeImage(new File([bytes], 'photo.png', { type: 'image/png' }));
  const metadata = await sharp(result).metadata();
  assert.equal(metadata.format, 'webp'); assert.equal(metadata.exif, undefined);
  await assert.rejects(() => optimizeImage(new File([bytes], 'photo.jpg', { type: 'image/jpeg' })));
  await assert.rejects(() => optimizeImage(new File(['<svg></svg>'], 'photo.png', { type: 'image/png' })));
  await assert.rejects(() => optimizeImage(new File([new Uint8Array(11 * 1024 * 1024)], 'photo.png', { type: 'image/png' })));
});
