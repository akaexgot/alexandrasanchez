import { test, expect } from '@playwright/test';
test('public navigation, metadata, mobile menu and no horizontal overflow', async ({ page }, info) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Tu esencia.');
  await expect(page).toHaveTitle(/Alexandra Sánchez/);
  await expect(page.locator('meta[name=description]')).toHaveAttribute('content', /micropigmentación/i);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: `docs/screenshots/inicio-${info.project.name}.png`, fullPage: true });
  if (info.project.name === 'mobile') {
    await page.getByText('Menú', { exact: true }).click();
    await page.getByRole('navigation', { name: 'Navegación móvil' }).getByRole('link', { name: 'Tratamientos' }).click();
  } else await page.getByRole('navigation', { name: 'Principal', exact: true }).getByRole('link', { name: 'Tratamientos' }).click();
  await page.getByRole('link', { name: /Cejas/ }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Cejas');
  await page.goto('/contacto');
  await expect(page.getByRole('link', { name: '626836018', exact: true })).toHaveAttribute('href', 'tel:+34626836018');
  await expect(page.getByRole('link', { name: 'WhatsApp ↗', exact: true }).first()).toHaveAttribute('href', 'https://wa.me/34626836018');
});
test('empty gallery filters work and unknown pages are 404', async ({ page }) => {
  await page.goto('/resultados');
  await page.getByRole('link', { name: 'Cejas', exact: true }).click();
  await expect(page).toHaveURL(/tratamiento=/);
  await expect(page.getByText('Todavía no hay resultados publicados para esta selección.')).toBeVisible();
  const response = await page.goto('/ruta-inexistente');
  expect(response?.status()).toBe(404);
});
test('anonymous users cannot access admin or write endpoints', async ({ page, request }) => {
  await page.goto('/admin/resultados');
  await expect(page).toHaveURL('/admin/login');
  await expect(page.getByText('El acceso privado estará disponible', { exact: false })).toBeVisible();
  const denied = await request.post('/api/content/resultados', { headers: { Origin: 'http://127.0.0.1:4321' }, form: { title: 'Unauthorized' } });
  expect(denied.status()).toBe(401);
  const csrf = await request.post('/api/auth/login', { headers: { Origin: 'https://attacker.example' }, form: { email: 'a@example.com', password: 'anything' } });
  expect(csrf.status()).toBe(403);
  const health = await request.get('/api/health'); expect(health.status()).toBe(200);
});
test('Instagram does not contact third parties before consent', async ({ page }) => {
  const external: string[] = [];
  page.on('request', request => { if (!request.url().startsWith('http://127.0.0.1:4321')) external.push(request.url()); });
  await page.goto('/');
  expect(external).toEqual([]);
});
