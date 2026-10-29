const nav = document.querySelector<HTMLElement>('[data-mobile-nav]');

if (nav) {
  const toggle = nav.querySelector<HTMLButtonElement>('[data-mobile-nav-toggle]');
  const panel = nav.querySelector<HTMLElement>('[data-mobile-nav-panel]');

  if (toggle && panel) {
    const setOpen = (open: boolean): void => {
      panel.hidden = !open;
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    };

    setOpen(false);

    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      setOpen(open);

      if (open) {
        panel.querySelector<HTMLAnchorElement>('a')?.focus();
      } else {
        toggle.focus();
      }
    });

    panel.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggle.focus();
      }
    });

    // Keep keyboard focus out of the content hidden behind the fixed panel.
    nav.addEventListener('focusout', (event) => {
      const next = event.relatedTarget as Node | null;

      if (next && !nav.contains(next)) {
        setOpen(false);
      }
    });

    panel.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setOpen(false));
    });

    const desktop = window.matchMedia('(min-width: 768px)');
    desktop.addEventListener('change', (event) => {
      if (event.matches) {
        const hadFocus = nav.contains(document.activeElement);
        setOpen(false);

        if (hadFocus) {
          toggle.focus();
        }
      }
    });
  }
}
