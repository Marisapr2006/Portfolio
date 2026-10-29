import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const routes = ['/', '/proyectos/', '/proyectos/este-portfolio/', '/sobre-mi/', '/contacto/'];
const themes = ['light', 'dark'] as const;

for (const path of routes) {
  for (const theme of themes) {
    test(`${path} sin violaciones graves en tema ${theme}`, async ({ page }) => {
      await page.addInitScript((value) => {
        localStorage.setItem('mp-theme', value);
      }, theme);
      await page.goto(path);

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .analyze();

      const serious = results.violations.filter(
        (violation) => violation.impact === 'serious' || violation.impact === 'critical',
      );

      expect(serious).toEqual([]);
    });
  }
}
