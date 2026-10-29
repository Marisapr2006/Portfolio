import { expect, test } from '@playwright/test';

test('el botón de copiar email anuncia y guarda el email', async ({ page }) => {
  await page.goto('/contacto/');

  const button = page.getByRole('button', { name: 'Copiar email' });
  const status = page.locator('.copy-email__status');

  await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
  await button.click();

  await expect(status).toHaveText('Email copiado al portapapeles');
  await expect(button).toBeEnabled();

  const clipboard = await page.evaluate(() => navigator.clipboard.readText());
  expect(clipboard).toBe('marisapenarey@gmail.com');
});

test('el índice del caso navega entre secciones', async ({ page }) => {
  await page.goto('/proyectos/este-portfolio/');

  const toc = page.getByRole('navigation', { name: 'Contenido del caso' });
  await expect(toc).toBeVisible();

  await toc.getByRole('link', { name: 'Decisiones' }).click();
  await expect(page).toHaveURL(/#decisiones/);
  await expect(page.getByRole('heading', { name: 'Decisiones' })).toBeVisible();
});
