import { expect, test } from '@playwright/test';

const routes = [
  { path: '/', title: 'Marisa Peña Rey — Desarrolladora web full-stack junior' },
  { path: '/proyectos/', title: 'Proyectos · Marisa Peña Rey' },
  { path: '/sobre-mi/', title: 'Sobre mí · Marisa Peña Rey' },
  { path: '/contacto/', title: 'Contacto · Marisa Peña Rey' },
];

for (const route of routes) {
  test(`${route.path} responde y tiene un h1`, async ({ page }) => {
    const response = await page.goto(route.path);

    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(route.title);
    await expect(page.locator('h1')).toHaveCount(1);
  });
}

test('la página 404 responde con 404 y enlace al inicio', async ({ page }) => {
  const response = await page.goto('/esta-pagina-no-existe/');

  expect(response?.status()).toBe(404);
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.getByRole('link', { name: 'Volver al inicio' })).toBeVisible();
});
