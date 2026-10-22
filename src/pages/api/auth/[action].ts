import type { APIRoute } from 'astro';
import { z } from 'zod';
export const POST: APIRoute = async ({ locals, params, request, redirect, url, cookies }) => {
  const client = locals.supabase;
  if (!client) return redirect('/admin/login?error=config', 303);
  const action = params.action;
  if (action === 'logout') { await client.auth.signOut(); return redirect('/admin/login', 303); }
  const form = await request.formData();
  if (action === 'password') {
    if (!locals.user || cookies.get('recovery_verified')?.value !== locals.user.id) return redirect('/admin/recuperar', 303);
    const password = String(form.get('password') || '');
    if (password.length < 12 || password.length > 128) return redirect('/admin/restablecer?error=validation', 303);
    const { error } = await client.auth.updateUser({ password });
    if (error) return redirect('/admin/restablecer?error=failed', 303);
    cookies.delete('recovery_verified', { path: '/' });
    await client.auth.signOut(); return redirect('/admin/login?updated=1', 303);
  }
  const email = String(form.get('email') || ''), password = String(form.get('password') || '');
  if (!z.email().safeParse(email).success || email.length > 254) return redirect('/admin/login?error=credentials', 303);
  if (action === 'login') {
    const { error } = await client.auth.signInWithPassword({ email, password });
    return redirect(error ? '/admin/login?error=credentials' : '/admin', 303);
  }
  if (action === 'recover') {
    const site = process.env.PUBLIC_SITE_URL || url.origin;
    await client.auth.resetPasswordForEmail(email, { redirectTo: `${site.replace(/\/$/, '')}/api/auth/callback` });
    return redirect('/admin/recuperar?sent=1', 303);
  }
  return new Response('No encontrado', { status: 404 });
};
export const GET: APIRoute = async ({ locals, params, url, cookies, redirect }) => {
  if (params.action !== 'callback' || !locals.supabase) return new Response('No encontrado', { status: 404 });
  const code = url.searchParams.get('code');
  if (!code) return redirect('/admin/recuperar?error=expired', 303);
  const { data, error } = await locals.supabase.auth.exchangeCodeForSession(code);
  if (error || !data.user) return redirect('/admin/recuperar?error=expired', 303);
  cookies.set('recovery_verified', data.user.id, { httpOnly: true, sameSite: 'strict', secure: url.protocol === 'https:', path: '/', maxAge: 600 });
  return redirect('/admin/restablecer', 303);
};
