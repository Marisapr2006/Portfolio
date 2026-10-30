# Portfolio de Marisa Peña Rey

Portfolio personal estático de una desarrolladora web full-stack junior. El sitio se plantea como
un **dossier de ingeniería**: cada proyecto se cuenta con contexto, restricciones, decisiones y
resultado, en lugar de una galería de tarjetas.

Construido con Astro, CSS nativo, TypeScript mínimo y contenido en Markdown. Sin backend, sin
framework de UI y sin cookies.

- **URL:** <https://marisa-portfolio.vercel.app/> (ver [Despliegue](#despliegue))
- **Especificación:** [`docs/Spec.md`](docs/Spec.md) es la fuente de verdad del producto y de las
  decisiones técnicas.
- **Diseño:** [`docs/Design.md`](docs/Design.md) recoge la paleta y la dirección visual.

## Stack

| Pieza      | Decisión                                                                   |
| ---------- | -------------------------------------------------------------------------- |
| Framework  | Astro 7 con salida 100 % estática y Content Collections                    |
| Estilos    | CSS nativo con custom properties (tokens); sin Tailwind ni framework de UI |
| Contenido  | Markdown validado con Zod en build y con `scripts/check-content.mjs`       |
| JavaScript | Islas vanilla (tema, menú móvil) + GSAP 3.15 solo para animación           |
| Tipografía | Bricolage Grotesque variable y Space Mono, self-hosted en WOFF2 (OFL)      |
| Pruebas    | Playwright en Chromium (móvil 390 px y escritorio 1440 px) + axe           |
| Formato    | Prettier con `prettier-plugin-astro` y TypeScript estricto                 |
| Despliegue | Vercel, preset Astro, salida `dist/`                                       |

## Requisitos

- Node.js `>=22.23.4` (requisito de Astro 7)
- npm `>=11`

## Puesta en marcha

```bash
npm ci
npm run dev
```

El servidor de desarrollo queda en <http://localhost:4321/> y recarga en caliente al guardar.

Para revisar el build de producción:

```bash
npm run build
npm run preview
```

## Scripts

| Comando                 | Qué hace                                                      |
| ----------------------- | ------------------------------------------------------------- |
| `npm run dev`           | Servidor de desarrollo en el puerto 4321.                     |
| `npm run build`         | Genera el sitio estático en `dist/`.                          |
| `npm run preview`       | Sirve el build de producción en el puerto 4321.               |
| `npm run check`         | `astro check`: tipos y plantillas.                            |
| `npm run lint`          | Comprueba el formato con Prettier.                            |
| `npm run format`        | Aplica Prettier.                                              |
| `npm run check:content` | Valida las secciones obligatorias de los casos de estudio.    |
| `npm test`              | Compila y ejecuta Playwright contra el build.                 |
| `npm run test:e2e`      | Ejecuta Playwright sobre un `dist/` ya existente.             |
| `npm run test:a11y`     | Ejecuta solo la suite de accesibilidad (axe).                 |
| `npm run verify`        | Puerta completa: `check` + `lint` + `check:content` + `test`. |

Un único test:

```bash
npx playwright test tests/e2e/theme.spec.ts
npx playwright test -g "el tema cambia" --project=mobile
```

## Rutas

| Ruta                 | Contenido                                                           |
| -------------------- | ------------------------------------------------------------------- |
| `/`                  | Hero, trabajo seleccionado, sobre mí, experiencia, proceso y stack. |
| `/proyectos/`        | Índice de todos los casos publicados, ordenados por `order`.        |
| `/proyectos/<slug>/` | Caso de estudio con metadatos, portada, cuerpo y siguiente caso.    |
| `/sobre-mi/`         | Bio, datos rápidos, competencias y experiencia.                     |
| `/contacto/`         | Email copiable, LinkedIn, GitHub, ubicación y disponibilidad.       |
| `/404`               | Página no encontrada, con enlaces de vuelta.                        |

Las URLs usan barra final canónica (`trailingSlash: 'always'`), replicada en `vercel.json`.

## Estructura

```text
.
├─ public/
│  ├─ cv/marisa-pena-rey-cv.pdf        # CV descargable
│  ├─ fonts/                           # Bricolage Grotesque y Space Mono (WOFF2 + OFL)
│  ├─ favicon.svg
│  └─ robots.txt                       # debe apuntar al dominio de astro.config.mjs
├─ scripts/
│  └─ check-content.mjs                # valida las seis secciones de cada caso
├─ src/
│  ├─ assets/
│  │  ├─ profile/                      # foto de perfil, optimizada por Astro
│  │  └─ projects/<slug>/cover.png     # portadas, optimizadas en build
│  ├─ components/                      # Header, Hero, ProjectCard, Marquee, ToolsBento…
│  ├─ content/projects/*.md            # un archivo por caso de estudio
│  ├─ content.config.ts                # colección y esquema Zod
│  ├─ data/                            # site, projects, stack, process, about, experience
│  ├─ layouts/                         # BaseLayout (head, tema, JSON-LD) y ProjectLayout
│  ├─ pages/                           # rutas
│  ├─ scripts/                         # theme.ts, mobile-nav.ts, motion.ts (GSAP)
│  └─ styles/                          # tokens.css, base.css, utilities.css
├─ tests/e2e/                          # pages, theme y a11y (Playwright + axe)
├─ docs/                               # Spec, Design, AGENTS y material de origen
├─ astro.config.mjs                    # site, salida estática y sitemap
├─ playwright.config.ts
└─ vercel.json                         # trailing slash y cabeceras de seguridad
```

Reglas de la casa:

- Las páginas componen layouts y componentes; no llevan estilos propios.
- Colores, espacios y tipografías se declaran solo en `src/styles/tokens.css`.
- Los textos de los proyectos viven en Markdown, nunca en componentes.
- Las imágenes de proyecto van a `src/assets/` para que Astro las optimice; lo estático (CV,
  favicon, fuentes) va a `public/`.

## Añadir un proyecto

1. Crea `src/content/projects/<slug>.md` con el frontmatter que exige
   [`src/content.config.ts`](src/content.config.ts): `title`, `summary` (40–160 caracteres),
   `year`, `role`, `status` (`live` | `repo` | `case-study`), `stack`, `cover`, `gallery`,
   `repo`/`demo`/`video`, `featured`, `order` y `confidential`.
2. Guarda la portada en `src/assets/projects/<slug>/cover.png` y referénciala desde el Markdown con
   una ruta relativa, para que Astro la valide y la optimice.
3. Escribe estas seis secciones, en este orden:

   ```md
   ## Contexto

   ## El problema

   ## Restricciones

   ## Decisiones

   ## Resultado

   ## Qué haría después
   ```

4. Ejecuta `npm run check:content` para validar el Markdown y `npm test` para comprobar rutas,
   enlaces, tema y accesibilidad.

Si el caso es confidencial, usa `confidential: true`: se sustituye el nombre del cliente y se
ocultan los enlaces privados.

## Tema y movimiento

- Tema claro/oscuro con `data-theme` en `<html>`. Un script inline en el `<head>` lo fija antes del
  primer pintado (lee `localStorage['mp-theme']` y, si no existe, `prefers-color-scheme`), así que
  no hay parpadeo.
- El toggle es un `<button>` con `aria-pressed` y nombre accesible; la preferencia persiste.
- GSAP + ScrollTrigger se cargan como mejora progresiva en `src/scripts/motion.ts`. Solo se anima
  `transform`, el contenido es visible sin JavaScript y con `prefers-reduced-motion: reduce` no se
  registra ninguna animación.

## Accesibilidad y rendimiento

Objetivo **WCAG 2.2 AA** en ambos temas:

- Enlace «Saltar al contenido», landmarks correctos y un solo `<h1>` por página.
- Navegación completa por teclado, menú móvil que cierra con Escape y devuelve el foco.
- Foco visible con contraste ≥ 3:1, áreas táctiles de 24×24 px y contraste de texto ≥ 4.5:1.
- axe sin violaciones `serious` ni `critical` en las cinco páginas, en claro y oscuro.
- Sin scroll horizontal a 360 px.

Presupuestos de rendimiento en móvil: JS inicial ≤ 20 KB gzip, CSS ≤ 25 KB gzip, LCP < 2 s y
CLS < 0.05. Se consiguen con cero frameworks de UI, fuentes self-hosted precargadas con
`font-display: swap`, imágenes AVIF/WebP con `srcset` y sin scripts de terceros.

## Integración continua

[`.github/workflows/ci.yml`](.github/workflows/ci.yml) se ejecuta en cada push a `main` y en cada
pull request, con Node 24 y Chromium:

```bash
npm ci
npm run check
npm run lint
npm run check:content
npm run build
npx playwright install --with-deps chromium
npm run test:e2e
```

Es la misma puerta que `npm run verify`, pero separada en pasos para que el fallo señale la
comprobación concreta.

## Despliegue

El sitio es estático y no necesita adaptador de Astro.

1. Conecta el repositorio a Vercel con el preset **Astro** y el nombre de proyecto
   **`marisa-portfolio`**.
2. Build: `npm run build`. Output: `dist`.
3. Producción desde `main`; cada pull request genera una preview.

El nombre del proyecto determina la URL pública: `https://marisa-portfolio.vercel.app`. `site` en
[`astro.config.mjs`](astro.config.mjs) es la fuente de verdad de las URLs canónicas y del sitemap, y
debe coincidir con el `Sitemap:` de [`public/robots.txt`](public/robots.txt). Si el subdominio ya
estuviera ocupado, Vercel asignará un sufijo y habrá que actualizar ambos valores; al pasar a un
dominio propio, igual.

`vercel.json` fija `trailingSlash: true`, añade cabeceras de seguridad y cache inmutable para
`/fonts/`.

## Documentación

| Documento                                      | Para qué sirve                                                    |
| ---------------------------------------------- | ----------------------------------------------------------------- |
| [`docs/Spec.md`](docs/Spec.md)                 | Fuente de verdad: alcance, stack, contenido, a11y, SEO y pruebas. |
| [`docs/Design.md`](docs/Design.md)             | Paleta, tipografía y sistema visual.                              |
| [`docs/AGENTS.md`](docs/AGENTS.md)             | Guía para agentes: estructura, comandos y catálogo de skills.     |
| [`docs/Arquitecture.md`](docs/Arquitecture.md) | Plan histórico (Laravel/MySQL); ya no aplica al portfolio.        |
| [`CLAUDE.md`](CLAUDE.md)                       | Contexto resumido para Claude Code.                               |

## Skills para agentes

El repositorio incluye una colección portátil de [Agent Skills](https://agentskills.io) en
`.agents/skills/` (canónica) y `.claude/skills/` (espejo idéntico). Cada skill es una carpeta con un
`SKILL.md`. Si no sabes cuál aplica, empieza por
[`.agents/skills/using-agent-skills/SKILL.md`](.agents/skills/using-agent-skills/SKILL.md).

Tras editar una skill, copia `.agents/skills/` sobre `.claude/skills/` para mantener el espejo.

## Contacto

- Email: <marisapenarey@gmail.com>
- LinkedIn: <https://www.linkedin.com/in/marisa-peña-rey-05508a365/>
- GitHub: <https://github.com/Marisapr2006>

Las fuentes incluidas en `public/fonts/` se distribuyen bajo la SIL Open Font License (ver
`public/fonts/OFL.txt`).
