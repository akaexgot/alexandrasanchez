import { defineMiddleware } from 'astro:middleware';
import { sessionClient } from './lib/supabase/server';

const openAuth = new Set(['/admin/login', '/admin/recuperar', '/admin/restablecer', '/api/auth/login', '/api/auth/recover', '/api/auth/callback', '/api/auth/password']);
export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;
  const privateRoute = pathname.startsWith('/admin') || pathname.startsWith('/api/');
  context.locals.supabase = null;
  context.locals.user = null;
  context.locals.editor = false;
  if (!['GET', 'HEAD', 'OPTIONS'].includes(context.request.method)) {
    const expected = process.env.PUBLIC_SITE_URL || context.url.origin;
    if (context.request.headers.get('origin') !== new URL(expected).origin) return new Response('Origen no permitido', { status: 403 });
    const length = Number(context.request.headers.get('content-length') || 0);
    if (length > 11 * 1024 * 1024) return new Response('Archivo demasiado grande', { status: 413 });
  }
  if (privateRoute || pathname.startsWith('/media/')) {
    const client = sessionClient(context.cookies, context.url.protocol === 'https:', context.request.headers.get('cookie') || '');
    context.locals.supabase = client;
    if (client) {
      const { data: { user } } = await client.auth.getUser();
      context.locals.user = user;
      if (user) {
        const { data } = await client.from('user_roles').select('role').eq('user_id', user.id).maybeSingle();
        context.locals.editor = data?.role === 'editor' || data?.role === 'admin';
      }
    }
    if (privateRoute && !openAuth.has(pathname) && pathname !== '/api/health' && !context.locals.editor) {
      return pathname.startsWith('/api/') ? new Response('No autorizado', { status: 401 }) : context.redirect('/admin/login', 303);
    }
  }
  let response: Response;
  try { response = await next(); } catch {
    response = new Response('El contenido no está disponible temporalmente. Inténtalo de nuevo en unos minutos.', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
  }
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  response.headers.set('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data:; font-src 'self'; connect-src 'self'; frame-src https://www.instagram.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'");
  response.headers.set('Cache-Control', 'private, no-store');
  if (context.url.protocol === 'https:') response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  if (privateRoute) response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  return response;
});
