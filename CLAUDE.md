# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Proyecto

Portfolio personal estático de Marisa Peña Rey (desarrolladora full-stack junior), construido con Astro 7, CSS nativo y contenido en Markdown. Todo el texto del sitio está en **español**; mantenlo así y sin erratas. Requiere Node `>=22.23.4` y npm `>=11`.

`docs/Spec.md` es la fuente de verdad de las decisiones de producto y técnicas (actualízala cuando cambie una decisión). `docs/Arquitecture.md` es un plan **histórico** con Laravel/MySQL y ya no aplica. `docs/AGENTS.md` describe las 30 Agent Skills incluidas (`.agents/skills/` es la canónica; `.claude/skills/` debe seguir siendo un espejo idéntico: copia `.agents/skills/` sobre ella tras editar una skill). Cada skill debe ser una copia real, no un enlace simbólico a otro proyecto. Las skills de otros proyectos (Between, Remotion, juegos, React/Swift) se retiraron a `Documents/Marisa/skills-archivadas/`, fuera del repo.

## Comandos

- `npm run dev` — servidor de desarrollo en http://localhost:4321/
- `npm run build` / `npm run preview` — compila a `dist/` / sirve ese build
- `npm run check` — `astro check` (tipos y plantillas)
- `npm run lint` / `npm run format` — comprobar / aplicar Prettier
- `npm run check:content` — valida el Markdown de proyectos (secciones obligatorias, longitud del resumen, portada)
- `npm test` — compila y ejecuta Playwright (proyectos mobile 390px y desktop 1440px); `npm run test:e2e` se salta la compilación y necesita un `dist/` existente, porque Playwright lo sirve con `npm run preview`
- `npm run test:a11y` — solo la suite de axe
- Un solo test: `npx playwright test tests/e2e/theme.spec.ts` (añade `-g "<título>"` o `--project=mobile`)
- `npm run verify` — puerta completa (check, lint, check:content, test); el Spec exige ejecutarla antes de cada commit

## Arquitectura

- **Modelo de contenido:** los proyectos son archivos Markdown en `src/content/projects/`, cargados por la Content Collection de `src/content.config.ts` (esquema zod: title, summary de 40–160 caracteres, year, role, `status` con valor `live|repo|case-study`, stack, imagen `cover`, repo/demo/video opcionales, `featured`, `order`, `confidential`). Las portadas están en `src/assets/projects/<slug>/cover.png` y se referencian con ruta relativa para que Astro las optimice.
- **Dos capas de validación de proyectos:** el esquema zod se ejecuta en el build; además, `scripts/check-content.mjs` exige que cada caso contenga `## Contexto`, `## El problema`, `## Restricciones`, `## Decisiones`, `## Resultado` y `## Qué haría después`, en ese orden. Si cambia la estructura, modifica ambas a la vez.
- **Rutas:** `src/pages/` — `index`, `proyectos/index`, `proyectos/[id]` (renderizada con `ProjectLayout`), `sobre-mi`, `contacto` y `404`. Las rutas usan slugs en español y `trailingSlash: 'always'` (también en `vercel.json`), así que los enlaces internos deben llevar barra final.
- **Layouts:** `BaseLayout` se encarga de todo el `<head>`: URL canónica desde `Astro.site`, etiquetas OG/Twitter, JSON-LD de Person, precarga de la fuente y un script **inline** previo al primer pintado que fija `data-theme` a partir de `localStorage['mp-theme']` o de la preferencia del sistema (evita el parpadeo del tema). `ProjectLayout` lo envuelve para los casos de estudio.
- **Tema:** claro/oscuro mediante `data-theme` en `<html>`; `src/scripts/theme.ts` alimenta `ThemeToggle` y `src/scripts/mobile-nav.ts` alimenta `MobileNav`. El JS de cliente es vanilla; no hay framework de UI. `src/scripts/motion.ts` usa GSAP + ScrollTrigger solo como mejora progresiva (solo `transform`, nada se registra con `prefers-reduced-motion`).
- **Datos:** los datos personales, enlaces y navegación viven en `src/data/site.ts`; `projects.ts` contiene las etiquetas de estado y la ordenación por `order`; `stack.ts` y `process.ts` alimentan las secciones de sobre mí e inicio.
- **URL del sitio:** `site` en `astro.config.mjs` es provisional (`marisapena.vercel.app`) y debe coincidir con `public/robots.txt`; cambia ambos cuando se defina el dominio real.
- **CV:** `docs/CV_Marisa.pdf` es el original; la copia publicada es `public/cv/marisa-pena-rey-cv.pdf`. Enlázalo solo cuando esté actualizado.

## Convenciones

- Los tokens de diseño (`--color-*`, `--font-*`, `--space-*`, `--radius-*`, `--duration-*`, `--ease-*`) viven en `src/styles/tokens.css`. Nunca pongas colores ni espacios literales en los componentes; sin estilos inline salvo custom properties calculadas.
- Componentes `.astro` en PascalCase; datos, scripts y rutas en kebab-case; clases CSS en kebab-case con BEM ligero (`.project-card__title`).
- Prettier: `printWidth: 100`, comillas simples, plugin de Astro. TypeScript estricto; evita `any`.
- El texto de los proyectos va en Markdown, no en componentes. Un solo `<h1>` por página, HTML semántico, foco visible y texto alternativo que describa la función de la imagen. Objetivo WCAG 2.2 AA en ambos temas; comprueba a 360px.

## Límites (del Spec §13)

- **Preguntar antes:** añadir cualquier dependencia; cambiar paleta, tipografía o sistema de espacio; añadir una página, ruta o sección; publicar teléfono, dirección exacta o material de clientes; activar analítica o scripts de terceros; editar `docs/Arquitecture.md` o `docs/Design.md`.
- **Nunca:** añadir backend, base de datos, autenticación o formularios con servidor; commitear secretos, `dist/`, `node_modules/` o `.astro/`; usar cookies de seguimiento; dejar lorem ipsum, enlaces muertos o botones sin acción; borrar o desactivar tests para que pasen; publicar contenido de prácticas o de clientes sin permiso.
