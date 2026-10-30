import { expect, test } from '@playwright/test';

const routes = [
  { path: '/', title: 'Marisa Peña Rey — Desarrolladora web full-stack junior' },
  { path: '/proyectos/', title: 'Proyectos · Marisa Peña Rey' },
  { path: '/proyectos/este-portfolio/', title: 'Este portfolio · Marisa Peña Rey' },
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

for (const route of routes) {
  test(`${route.path} no registra avisos ni errores en consola`, async ({ page }) => {
    const messages: string[] = [];

    page.on('console', (message) => {
      if (message.type() === 'warning' || message.type() === 'error') {
        messages.push(`${message.type()}: ${message.text()}`);
      }
    });
    page.on('pageerror', (error) => messages.push(`pageerror: ${error.message}`));

    await page.goto(route.path, { waitUntil: 'networkidle' });

    expect(messages).toEqual([]);
  });
}

test('la página 404 responde con 404 y enlace al inicio', async ({ page }) => {
  const response = await page.goto('/esta-pagina-no-existe/');

  expect(response?.status()).toBe(404);
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.getByRole('link', { name: 'Volver al inicio' })).toBeVisible();
});

test('el caso de estudio incluye las seis secciones', async ({ page }) => {
  await page.goto('/proyectos/este-portfolio/');

  for (const heading of [
    'Contexto',
    'El problema',
    'Restricciones',
    'Decisiones',
    'Resultado',
    'Qué haría después',
  ]) {
    await expect(page.getByRole('heading', { level: 2, name: heading })).toBeVisible();
  }
});

test('no hay enlaces internos roto en la home', async ({ page, request }) => {
  await page.goto('/');

  const hrefs = await page
    .locator('a[href^="/"]')
    .evaluateAll((links) => [
      ...new Set(links.map((link) => (link as HTMLAnchorElement).getAttribute('href') ?? '')),
    ]);

  for (const href of hrefs.filter(Boolean)) {
    const response = await request.get(href);
    expect(response.status(), href).toBeLessThan(400);
  }
});
