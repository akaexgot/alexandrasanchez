import { createServerClient, parseCookieHeader } from '@supabase/ssr';
import type { AstroCookies } from 'astro';
import { configuration } from '../content';

export function sessionClient(cookies: AstroCookies, secure: boolean, cookieHeader: string) {
  const { url, key } = configuration();
  if (!url || !key) return null;
  return createServerClient(url, key, {
    cookieOptions: { path: '/', sameSite: 'lax', secure, httpOnly: true },
    cookies: {
      getAll: () => parseCookieHeader(cookieHeader).map(({ name, value }) => ({ name, value: value || '' })),
      setAll: values => values.forEach(({ name, value, options }) => cookies.set(name, value, { ...options, path: '/', sameSite: 'lax', secure, httpOnly: true })),
    },
  });
}
