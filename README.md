# Portfolio de Marisa Peña Rey

Portfolio personal estático: casos de estudio, perfil y contacto para una desarrolladora web
full-stack junior. Construido con Astro, CSS nativo y contenido en Markdown.

- **Producción:** pendiente de confirmar el nombre del proyecto en Vercel.
- **Especificación:** [`docs/Spec.md`](docs/Spec.md) es la fuente de verdad.
- **Paleta:** [`docs/Design.md`](docs/Design.md).

## Stack

- Astro 7 con salida estática y Content Collections.
- CSS nativo con custom properties; sin framework de UI.
- TypeScript estricto y scripts de cliente en vanilla.
- Playwright + axe para pruebas E2E y de accesibilidad.
- Prettier para formato.

## Requisitos

- Node.js `>=22.23.4`
- npm `>=11`

## Puesta en marcha

```bash
npm ci
npm run dev
```

El servidor de desarrollo queda en <http://localhost:4321/>.

## Comandos

| Comando                 | Qué hace                                         |
| ----------------------- | ------------------------------------------------ |
| `npm run dev`           | Servidor de desarrollo en el puerto 4321.        |
| `npm run build`         | Genera el sitio estático en `dist/`.             |
| `npm run preview`       | Sirve el build de producción.                    |
| `npm run check`         | Comprueba tipos y plantillas con `astro check`.  |
| `npm run lint`          | Verifica el formato con Prettier.                |
| `npm run format`        | Aplica Prettier.                                 |
| `npm run check:content` | Valida las secciones obligatorias de los casos.  |
| `npm test`              | Compila y ejecuta Playwright.                    |
| `npm run test:e2e`      | Ejecuta Playwright sobre un build ya existente.  |
| `npm run test:a11y`     | Ejecuta solo las pruebas de accesibilidad.       |
| `npm run verify`        | Puerta completa: check, lint, contenido y tests. |

## Estructura

```text
public/                 CV, fuentes, favicon y robots.txt
scripts/                Validación de contenido
src/components/         Header, Footer, Hero, ThemeToggle, MobileNav
src/data/               Datos del sitio y navegación
src/layouts/            BaseLayout
src/pages/              Rutas
src/scripts/            Tema y menú móvil
src/styles/             Tokens, base y utilidades
tests/e2e/              Playwright + axe
```

## Contenido

- Los datos personales y los enlaces viven en `src/data/site.ts`.
- Los proyectos viven como Markdown en `src/content/projects/`. El esquema de
  `src/content.config.ts` valida título, resumen, año, rol, estado, stack, portada y enlaces.
- Cada caso debe incluir, en este orden, las secciones `## Contexto`, `## El problema`,
  `## Restricciones`, `## Decisiones`, `## Resultado` y `## Qué haría después`.

### Añadir un proyecto

1. Crea `src/content/projects/<slug>.md` y añade el frontmatter que exige el esquema.
2. Guarda la portada en `src/assets/projects/<slug>/cover.png` y referénciala con una ruta
   relativa desde el Markdown.
3. Escribe las seis secciones y ejecuta `npm run check:content`.
4. Ejecuta `npm test` para comprobar rutas, enlaces, tema y accesibilidad.

El CV publicado está en `public/cv/marisa-pena-rey-cv.pdf`. Se copia desde `docs/CV_Marisa.pdf`
cuando se actualice.

## Despliegue

El sitio es 100 % estático y no necesita adaptador de Astro.

1. Conectar el repositorio a Vercel con el preset **Astro**.
2. Build: `npm run build`. Output: `dist`.
3. Producción desde `main`; cada pull request genera una preview.

La URL canónica se define en `astro.config.mjs` (`site`) y debe coincidir con la de
`public/robots.txt`. Cuando haya dominio propio, se cambian ambos valores y se añade el dominio en
Vercel.

## Accesibilidad

Objetivo WCAG 2.2 AA: navegación por teclado, foco visible, contraste verificado, `prefers-reduced-motion`
respetado y axe sin violaciones graves en tema claro y oscuro.
