const STORAGE_KEY = 'mp-theme';

type Theme = 'light' | 'dark';

const root = document.documentElement;
const toggle = document.querySelector<HTMLButtonElement>('[data-theme-toggle]');
const liveRegion = document.querySelector<HTMLElement>('[data-theme-status]');
const themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');

function currentTheme(): Theme {
  return root.dataset.theme === 'dark' ? 'dark' : 'light';
}

function sync(theme: Theme, announce = false): void {
  const isDark = theme === 'dark';

  if (toggle) {
    toggle.setAttribute('aria-pressed', String(isDark));
    toggle.setAttribute('aria-label', isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro');
  }

  if (themeColor) {
    themeColor.content = isDark ? '#11111B' : '#F8F7FC';
  }

  if (announce && liveRegion) {
    liveRegion.textContent = isDark ? 'Tema oscuro activado' : 'Tema claro activado';
  }
}

sync(currentTheme());

toggle?.addEventListener('click', () => {
  const theme: Theme = currentTheme() === 'dark' ? 'light' : 'dark';

  root.dataset.theme = theme;
  root.style.colorScheme = theme;

  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Storage can be unavailable (private mode, blocked cookies); the theme still works.
  }

  sync(theme, true);
});
