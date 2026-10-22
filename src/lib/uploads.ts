import sharp from 'sharp';
export const MAX_UPLOAD = 10 * 1024 * 1024;
export async function optimizeImage(file: File) {
  if (file.size < 1 || file.size > MAX_UPLOAD) throw new Error('La imagen debe ocupar menos de 10 MB.');
  const extension = file.name.split('.').pop()?.toLowerCase();
  const formats: Record<string, string> = { jpg: 'jpeg', jpeg: 'jpeg', png: 'png', webp: 'webp' };
  if (!extension || !formats[extension]) throw new Error('Utiliza JPG, PNG o WebP.');
  const data = Buffer.from(await file.arrayBuffer());
  const processor = sharp(data, { limitInputPixels: 40000000, animated: false });
  const metadata = await processor.metadata();
  if (metadata.format !== formats[extension] || file.type !== `image/${metadata.format}` || (metadata.pages || 1) > 1) throw new Error('El contenido de la imagen no coincide con su formato.');
  if (!metadata.width || !metadata.height || metadata.width < 200 || metadata.height < 200) throw new Error('La imagen debe medir al menos 200 × 200 píxeles.');
  return processor.rotate().resize({ width: 2000, height: 2000, fit: 'inside', withoutEnlargement: true }).webp({ quality: 85 }).toBuffer();
}
