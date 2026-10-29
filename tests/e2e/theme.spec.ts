import { expect, test } from '@playwright/test';

test('el tema cambia, se anuncia y persiste', async ({ page }) => {
  await page.goto('/');

  const html = page.locator('html');
  const toggle = page.getByRole('button', { name: /Cambiar a tema/ });
  const status = page.locator('[data-theme-status]');

  const initial = await html.getAttribute('data-theme');
  expect(initial === 'light' || initial === 'dark').toBe(true);

  const next = initial === 'dark' ? 'light' : 'dark';
  await toggle.click();

  await expect(html).toHaveAttribute('data-theme', next);
  await expect(status).toHaveText(next === 'dark' ? 'Tema oscuro activado' : 'Tema claro activado');

  await page.reload();
  await expect(html).toHaveAttribute('data-theme', next);
});

test('el menú móvil se abre, cierra con Escape y devuelve el foco', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'Solo aplica al menú móvil');

  await page.goto('/');

  const openButton = page.getByRole('button', { name: 'Abrir menú' });
  await openButton.click();

  const mobileNav = page.getByRole('navigation', { name: 'Menú móvil' });
  await expect(mobileNav).toBeVisible();
  const firstLink = mobileNav.getByRole('link', { name: 'Proyectos' });
  await expect(firstLink).toBeFocused();

  // Regression: moving forward through the panel must not drop focus behind it.
  const secondLink = mobileNav.getByRole('link', { name: 'Sobre mí' });
  await page.keyboard.press('Tab');
  await expect(secondLink).toBeFocused();
  await expect(mobileNav.getByRole('link', { name: 'Contacto' })).not.toBeFocused();

  await page.keyboard.press('Escape');

  await expect(mobileNav).toBeHidden();
  await expect(openButton).toBeFocused();
});
