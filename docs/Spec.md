# Especificación: Portfolio personal de Marisa Peña Rey

> Estado: **borrador para revisión**. Este documento es la fuente de verdad del proyecto.
> Sustituye a `docs/Arquitecture.md` en todo lo relativo al stack del portfolio.
> Paleta de referencia: `docs/Design.md`.

---

## 1. Objetivo

Construir un portfolio web personal, estático y de alto rendimiento, que consiga que un recruiter técnico entienda en menos de 30 segundos quién es Marisa, qué sabe hacer y qué ha construido, y que le lleve a abrir el CV o el repositorio.

El portfolio no es una entrega académica ni una aplicación con backend. Es una pieza de comunicación profesional y, a la vez, una demostración del criterio técnico de su autora.

### Usuaria principal

- **Marisa Peña Rey**, desarrolladora web full-stack junior (DAW 2024–2026), en búsqueda de su primera oportunidad profesional.
- Perfil: Laravel/PHP, JavaScript, HTML/CSS, MySQL, WordPress e IA aplicada con revisión humana.
- Ubicación: Las Palmas de Gran Canaria. Disponibilidad para remoto.

### Audiencias

1. **Recruiter técnico:** quiere evidencia rápida de stack, proyectos y calidad. Lee poco y compara mucho.
2. **Responsable técnico:** quiere ver código, decisiones y capacidad de resolver problemas reales.
3. **Marisa:** quiere publicar y actualizar proyectos sin pelear con la web.

### Historias de usuario y criterios de aceptación

| Historia | Criterio de aceptación |
|---|---|
| Como recruiter, quiero entender el perfil en 30 s. | La home muestra nombre, rol, propuesta de valor, disponibilidad y dos CTAs claros antes del primer scroll y medio en móvil. |
| Como recruiter técnico, quiero ver pruebas. | Cada proyecto tiene demo o repo, stack, rol, año, decisiones y resultado. |
| Como recruiter, quiero contactar sin fricción. | El email se copia con un clic y hay enlaces directos a LinkedIn y GitHub. |
| Como Marisa, quiero añadir un proyecto rápido. | Añadir un proyecto = crear un `.md` + una carpeta de imágenes, sin tocar componentes. |
| Como visitante con lector de pantalla, quiero navegar. | WCAG 2.2 AA, navegación completa por teclado y cero violaciones graves en axe. |

### No objetivos (v1)

Blog, i18n, panel de administración, autenticación, base de datos, formulario con backend, CMS, comentarios, newsletter, modo PWA, animaciones 3D.

---

## 2. Stack técnico

| Pieza | Decisión | Versión / nota |
|---|---|---|
| Framework | **Astro** (salida estática) | `7.4.x`; fijar la versión exacta en `package.json` |
| Runtime | **Node.js** | `>=22.23.4` (requisito de Astro 7) |
| Gestor | **npm** | 11.x |
| Estilos | **CSS nativo** con custom properties | Sin Tailwind, sin framework de UI |
| Contenido | **Content Collections + Markdown** | `src/content.config.ts`, loader `glob()` |
| Validación | **Zod 4** vía `astro/zod` | Esquema de proyectos |
| JavaScript | **TypeScript mínimo + islas vanilla** | Sin React/Vue/Svelte |
| Tipografía | **Instrument Serif** self-hosted (display) + `system-ui` (texto) + `ui-monospace` (etiquetas) | WOFF2, subset latin + latin-ext, una sola weight |
| Tests | **Playwright** + `@axe-core/playwright` | Chromium; viewport móvil y escritorio |
| Calidad | **Prettier** + `prettier-plugin-astro`, `astro check` | Sin ESLint en v1 (poco JS) |
| Despliegue | **Vercel** (Hobby, salida estática) | Cero configuración; uso personal no comercial |
| Analítica | **Sin analítica en v1** | Se añadirá después si aporta valor |
| CI | **GitHub Actions** | Node 24, `npm ci`, check, lint, build, E2E |

### Dependencias previstas

Producción: `astro`, `@astrojs/sitemap`.

Desarrollo: `@astrojs/check`, `typescript`, `prettier`, `prettier-plugin-astro`, `@playwright/test`, `@axe-core/playwright`.

> Cualquier dependencia adicional requiere aprobación (ver Boundaries).

---

## 3. Comandos

```bash
# Instalación
npm ci

# Desarrollo (Astro usa el puerto 4321 por defecto)
npm run dev

# Compilación y previsualización del build
npm run build
npm run preview

# Calidad
npm run check                 # astro check (tipos y plantillas)
npm run lint                  # prettier --check .
npm run format                # prettier --write .
npm run check:content         # node scripts/check-content.mjs

# Tests
npm test                      # npm run build && playwright test
npm run test:e2e              # playwright test
npm run test:a11y             # playwright test tests/e2e/a11y.spec.ts

# Despliegue (la vía principal es Git: push a main)
npx vercel                    # preview
npx vercel --prod             # producción

# Verificación completa antes de commit
npm run verify                # check + lint + check:content + test
```

Notas de integración con el repo:

- `.vscode/launch.json` actualizado al patrón de Astro (`http://localhost:4321/`).
- `docs/AGENTS.md` actualizado con los comandos reales y la estructura del proyecto.
- `README.md` completado con instalación, comandos y despliegue.

### Despliegue en Vercel

- Repositorio de GitHub conectado a Vercel; *framework preset* **Astro**, build `npm run build`, salida `dist`.
- **Sin adaptador** `@astrojs/vercel`: el sitio es 100 % estático y Vercel lo despliega con cero configuración.
- `engines.node` en `package.json` con `>=22.23.4` para que el build use una versión compatible con Astro 7.
- `vercel.json` con `trailingSlash: true` para que `/proyectos/<slug>/` sea la URL canónica y no haya duplicados.
- Producción desde `main`; preview automática por cada pull request.
- Dominio propio con HTTPS automático.
- Plan **Hobby**: gratuito y limitado a uso personal no comercial. Si el sitio pasa a ofrecer servicios o publicidad, habría que migrar a Pro.
- Analítica: **ninguna en v1**. No se añade script de terceros hasta que haya una razón medida.

---

## 4. Estructura del proyecto

```text
.
├─ .github/
│  └─ workflows/ci.yml          # check + lint + build + E2E
├─ public/
│  ├─ cv/marisa-pena-rey-cv.pdf # CV descargable, < 1 MB
│  ├─ fonts/                    # Instrument Serif woff2 (latin + latin-ext)
│  ├─ favicon.svg
│  ├─ og-default.png            # 1200×630
│  └─ robots.txt
├─ scripts/
│  └─ check-content.mjs         # valida secciones obligatorias de los casos
├─ src/
│  ├─ assets/
│  │  └─ projects/<slug>/       # cover + galería (optimizadas por Astro)
│  ├─ components/
│  │  ├─ Header.astro
│  │  ├─ Footer.astro
│  │  ├─ Hero.astro
│  │  ├─ ThemeToggle.astro
│  │  ├─ MobileNav.astro
│  │  ├─ SectionHeading.astro
│  │  ├─ ProjectCard.astro
│  │  ├─ DossierMeta.astro
│  │  ├─ Tag.astro
│  │  ├─ CopyEmail.astro
│  │  └─ ArrowLink.astro
│  ├─ content/
│  │  └─ projects/*.md          # un archivo por caso de estudio
│  ├─ content.config.ts         # colección + esquema Zod
│  ├─ data/
│  │  ├─ site.ts                # nombre, rol, email, redes, ubicación, disponibilidad
│  │  └─ stack.ts               # tecnologías agrupadas
│  ├─ layouts/
│  │  ├─ BaseLayout.astro
│  │  └─ ProjectLayout.astro
│  ├─ pages/
│  │  ├─ index.astro
│  │  ├─ proyectos/index.astro
│  │  ├─ proyectos/[id].astro
│  │  ├─ sobre-mi.astro
│  │  ├─ contacto.astro
│  │  └─ 404.astro
│  ├─ scripts/
│  │  ├─ theme.ts               # toggle + persistencia
│  │  ├─ mobile-nav.ts          # apertura, Escape y foco
│  │  └─ copy-email.ts
│  └─ styles/
│     ├─ tokens.css             # variables de diseño
│     ├─ base.css               # reset, tipografía, elementos base
│     └─ utilities.css          # contenedor, grid, helpers mínimos
├─ tests/
│  └─ e2e/
│     ├─ pages.spec.ts
│     ├─ theme.spec.ts
│     ├─ navigation.spec.ts
│     └─ a11y.spec.ts
├─ astro.config.mjs
├─ playwright.config.ts
├─ tsconfig.json
├─ .prettierrc
├─ .prettierignore              # ignora docs/, dist/, .astro/, node_modules/
├─ vercel.json                  # trailingSlash: true
└─ docs/
```

Reglas:

- Las páginas no contienen estilos de componentes: importan layouts y componentes.
- Los colores, espacios y tipografías solo se declaran en `tokens.css`.
- Los textos de proyectos viven en Markdown, no en componentes.
- Las imágenes de proyecto viven en `src/assets/` para que Astro las optimice; los archivos estáticos (CV, favicon, OG) en `public/`.
- Prettier ignora `docs/` para no reescribir la documentación existente en cada formateo.

---

## 5. Modelo de contenido

### 5.1. Esquema de proyecto

```ts
// src/content.config.ts
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().min(3).max(80),
      summary: z.string().min(40).max(160),
      year: z.number().int().min(2022),
      role: z.string().min(3).max(80),
      status: z.enum(['live', 'repo', 'case-study']),
      stack: z.array(z.string()).min(1).max(8),
      cover: image(),
      gallery: z.array(image()).max(6).default([]),
      repo: z.url().optional(),
      demo: z.url().optional(),
      video: z.url().optional(),
      featured: z.boolean().default(false),
      order: z.number().int().default(99),
      confidential: z.boolean().default(false),
    }),
});

export const collections = { projects };
```

- `status: live` → demo online.
- `status: repo` → solo código publicado.
- `status: case-study` → caso documentado sin demo ni repo (por confidencialidad o porque el valor está en el proceso).
- `confidential: true` sustituye el nombre del cliente por una descripción genérica y oculta enlaces.
- Las imágenes se referencian desde el frontmatter con ruta relativa al `.md` (por ejemplo `../../assets/projects/mi-proyecto/cover.webp`); el esquema `image()` valida que existan y Astro las optimiza en el build.

### 5.2. Estructura obligatoria de cada caso

Todo `.md` debe contener, en este orden, los siguientes `##`:

```md
## Contexto
## El problema
## Restricciones
## Decisiones
## Resultado
## Qué haría después
```

`scripts/check-content.mjs` falla el build si falta alguno o si `summary` supera 160 caracteres. El objetivo es que ningún caso se publique como una tarjeta vacía.

### 5.3. Datos del sitio

`src/data/site.ts` centraliza:

```ts
export const site = {
  name: 'Marisa Peña Rey',
  role: 'Desarrolladora web full-stack junior',
  email: 'marisapenarey@gmail.com',
  location: 'Las Palmas de Gran Canaria',
  availability: 'Abierta a mi primera oportunidad',
  linkedin: 'https://www.linkedin.com/in/marisa-peña-rey-05508a365/',
  github: 'https://github.com/Marisapr2006',
  cv: '/cv/marisa-pena-rey-cv.pdf',
} as const;
```

- El teléfono **no se publica**.
- LinkedIn se enlaza sin el parámetro `?isSelfProfile=true`.
- Los enlaces externos llevan `target="_blank"` y `rel="noopener noreferrer"` solo si abren pestaña nueva; por defecto, misma pestaña.

---

## 6. Estilo de código

### Convenciones

- Componentes `.astro` en **PascalCase**; archivos de datos y scripts en **kebab-case**; rutas en **kebab-case**.
- CSS: clases en **kebab-case**, convención ligera tipo BEM (`.project-card`, `.project-card__title`), sin anidamiento profundo.
- Tokens: `--color-*`, `--font-*`, `--space-*`, `--radius-*`, `--duration-*`, `--ease-*`.
- Sin estilos inline salvo custom properties calculadas.
- TypeScript estricto (`astro/tsconfigs/strict`). Evitar `any`.
- Prettier: `printWidth: 100`, comillas simples, plugin de Astro.
- HTML semántico: un `<h1>` por página, jerarquía sin saltos, `<nav>`, `<main>`, `<footer>`.
- Todo texto alternativo describe la función de la imagen, no el archivo.

### Ejemplo de componente

```astro
---
// src/components/ProjectCard.astro
import type { CollectionEntry } from 'astro:content';
import { Image } from 'astro:assets';

interface Props {
  project: CollectionEntry<'projects'>;
  index: number;
}

const { project, index } = Astro.props;
const { title, summary, year, stack, cover } = project.data;
---

<article class="project-card">
  <a class="project-card__link" href={`/proyectos/${project.id}/`}>
    <span class="project-card__index">{String(index + 1).padStart(2, '0')}</span>
    <Image class="project-card__image" src={cover} alt="" widths={[480, 960]} sizes="(min-width: 900px) 50vw, 100vw" loading="lazy" />
    <h3 class="project-card__title">{title}</h3>
    <p class="project-card__summary">{summary}</p>
    <p class="project-card__meta">{year} · {stack.join(' / ')}</p>
  </a>
</article>

<style>
  .project-card {
    border-top: 1px solid var(--color-border);
    padding-block: var(--space-6);
  }
  .project-card__index {
    font-family: var(--font-mono);
    color: var(--color-text-muted);
  }
  .project-card__title {
    font-family: var(--font-display);
    font-size: var(--text-2xl);
  }
</style>
```

---

## 7. Dirección de diseño

### Concepto

**El portfolio como dossier de ingeniería.** Cada proyecto se presenta como una ficha técnica con evidencia: contexto, restricciones, decisiones y resultado. La sección "Cómo trabajo" muestra el proceso real (especificar → planificar → implementar → verificar) con artefactos del propio proyecto.

Señales de identidad:

- Secciones numeradas (`01 — Trabajo seleccionado`).
- Reglas finas y mucho aire; grilla editorial.
- Titulares en serif; etiquetas en mono; texto en system-ui.
- Violeta reservado para interacción; cian para datos y enlaces.
- Motivo sutil de plano técnico (líneas de 1 px al 4 % de opacidad) en cabeceras de sección.
- Capturas grandes, sin marcos ni sombras pesadas.

Prohibido: glassmorphism, degradados llamativos, emojis decorativos, iconos de relleno, animaciones de scroll pesadas, contadores falsos, carruseles.

### Tipografía

| Rol | Fuente | Uso |
|---|---|---|
| Display | Instrument Serif 400 | `h1`, `h2`, cifras grandes |
| Texto | `system-ui, -apple-system, 'Segoe UI', sans-serif` | Párrafos, navegación, botones |
| Mono | `ui-monospace, 'Cascadia Code', 'JetBrains Mono', monospace` | Etiquetas, metadatos, números de sección |

Escala fluida:

```css
--text-xs: 0.75rem;
--text-sm: 0.875rem;
--text-base: 1rem;
--text-lg: clamp(1.125rem, 0.9rem + 0.6vw, 1.25rem);
--text-xl: clamp(1.375rem, 1rem + 1.2vw, 1.75rem);
--text-2xl: clamp(1.75rem, 1.2rem + 2vw, 2.5rem);
--text-3xl: clamp(2.25rem, 1.4rem + 3.4vw, 4rem);
--text-4xl: clamp(2.75rem, 1.5rem + 5vw, 5.5rem);
```

### Color

Base: `docs/Design.md`. Contrastes medidos y corregidos:

| Token | Oscuro | Claro | Contraste verificado |
|---|---|---|---|
| `--color-bg` | `#11111B` | `#F8F7FC` | — |
| `--color-surface` | `#1C1B2B` | `#FFFFFF` | — |
| `--color-text` | `#F4F1FA` | `#211A30` | 16.80:1 / 15.70:1 sobre bg |
| `--color-text-muted` | `#A5A2B8` | `#625A70` | 7.55:1 / 6.13:1 sobre bg |
| `--color-primary` | `#A78BFA` | `#7C3AED` | 6.89:1 / 5.35:1 sobre bg |
| `--color-accent` | `#67E8F9` | `#0E7490` | 12.94:1 / 5.03:1 sobre bg |
| `--color-border` | `#343247` | `#E5E0EE` | Decorativo (1.51:1 / 1.21:1) |
| `--color-border-strong` | `#6C6883` | `#8A829C` | 3.52:1 / 3.42:1 sobre bg |
| `--color-focus` | `#67E8F9` | `#7C3AED` | ≥ 3:1 en ambos temas |

Reglas de uso:

1. `--color-border` **nunca** delimita un control interactivo; para eso existe `--color-border-strong`.
2. Botón primario: fondo `--color-primary` y texto `--color-bg` en oscuro (6.89:1); texto `#FFFFFF` en claro (5.70:1).
3. Los enlaces siempre llevan subrayado; el color no es el único indicador.
4. El foco usa `outline: 2px solid var(--color-focus)` con `outline-offset: 2px`, visible en ambos temas.
5. Las imágenes de proyecto conservan sus colores originales.

### Layout y espaciado

- Contenedor: `max-width: 1200px`, padding lateral fluido `clamp(1.25rem, 5vw, 4rem)`.
- Texto largo: `max-width: 65ch`.
- Escala de espacio: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128 px.
- Radios: 2 px en etiquetas, 4 px en botones, 8 px en imágenes de caso. Nada de píldoras gigantes.
- Grid de proyectos: 1 columna en móvil, 2 en ≥ 900 px.

### Movimiento

- Transiciones de 150–250 ms con `ease-out`.
- Entrada del hero: opacidad + 8 px de desplazamiento, escalonada, una sola vez.
- `prefers-reduced-motion: reduce` desactiva todas las animaciones y transiciones no esenciales.
- Nada de parallax ni scroll hijacking.

### Tema claro/oscuro

- Atributo `data-theme="light|dark"` en `<html>`.
- Script inline bloqueante en `<head>` para evitar FOUC: lee `localStorage['mp-theme']`; si no existe, usa `prefers-color-scheme`.
- `color-scheme` sincronizado para que los controles nativos y el scrollbar acompañen.
- `meta[name="theme-color"]` actualizado por tema.
- El toggle es un `<button>` con `aria-pressed`, nombre accesible ("Cambiar a tema claro/oscuro") y estado anunciado.
- La preferencia persiste en `localStorage`; el sistema solo se consulta la primera vez.

---

## 8. Páginas y contenido

### `/` — Inicio

1. **Header** fijo con nombre, navegación (Proyectos, Sobre mí, Contacto), toggle de tema y menú móvil.
2. **Hero:** eyebrow con rol y ubicación, `h1` con el nombre, subtítulo de propuesta de valor, badge de disponibilidad, CTA primaria "Ver proyectos" y secundaria "Descargar CV".
3. **Trabajo seleccionado:** dos casos `featured`, con número, título, resumen, año, stack y estado.
4. **Cómo trabajo:** cuatro pasos (Especificar, Planificar, Implementar, Verificar) y un extracto real de un artefacto (fragmento de esta spec, una decisión o un commit). Enlace al caso del propio portfolio.
5. **Stack:** tecnologías agrupadas (Lenguajes, Backend, Datos, Herramientas, IA y metodologías).
6. **CTA de contacto** + footer.

La propuesta de valor debe ser concreta, en primera persona y sin adjetivos vacíos. Ejemplo de tono: "Construyo aplicaciones web full-stack y documento cada decisión. Laravel, JavaScript y MySQL, con IA como acelerador y revisión humana."

### `/proyectos/` — Índice

- Intro breve (2 líneas).
- Lista de todos los proyectos publicados, ordenados por `order`.
- Cada fila: número, título, año, stack, estado (Demo / Repo / Caso).
- Sin filtros en v1: con dos proyectos, un filtro sería decoración.

### `/proyectos/[id]/` — Caso de estudio

- Volver a proyectos.
- Título, resumen, tabla de metadatos (rol, año, estado, stack, enlaces).
- Imagen de portada.
- Cuerpo Markdown con las seis secciones obligatorias.
- Galería si existe.
- Enlace al siguiente proyecto.
- Si `confidential`, aviso de que el cliente no se nombra y ausencia de enlaces privados.

### `/sobre-mi/` — Sobre mí

- Foto (solo si hay una buena; si no, composición tipográfica).
- Bio en tres párrafos cortos: quién es, qué hace y qué busca.
- Formación: DAW 2024–2026, Bachillerato Tecnológico 2022–2024.
- Stack agrupado.
- Idiomas: Español nativo, Inglés B1.
- "Cómo trabajo" ampliado.
- Descarga de CV.

### `/contacto/` — Contacto

- Email con botón "Copiar" y confirmación accesible (`aria-live="polite"`).
- LinkedIn y GitHub.
- Ubicación y disponibilidad.
- Sin formulario. Sin backend.

### `/404`

- Mensaje breve, enlace a inicio y a proyectos. `noindex`.

### Contenido mínimo de la v1

| Pieza | Estado | Nota |
|---|---|---|
| Caso #1: proyecto final DAW | Obligatorio | Requiere repo, capturas y decidir despliegue |
| Caso #2: WordPress de prácticas o este portfolio | Obligatorio | WordPress solo con permiso; si no, caso del portfolio |
| Bio, stack, formación e idiomas | Obligatorio | Reutilizar el CV corregido |
| CV en PDF | Obligatorio | `/cv/marisa-pena-rey-cv.pdf`, actualizado |
| Foto | Opcional | Solo si es profesional y coherente |
| Extracto de artefacto para "Cómo trabajo" | Obligatorio | Fragmento real de esta spec, una decisión o un commit |

### Principios de copy

- Español de España, primera persona, frases cortas.
- Concreto: tecnología, decisión, resultado. Nada de "apasionada", "sinergias", "soluciones innovadoras".
- Cada caso: máximo 600 palabras.
- Los resultados se cuantifican cuando sea posible ("4 meses", "3 roles", "0 dependencias"); si no hay dato, no se inventa.
- Erratas del CV a corregir: "Leguajues" → Lenguajes, "Empesa" → Empresa, "Desarrollador" → Desarrolladora.

---

## 9. Accesibilidad

Objetivo: **WCAG 2.2 AA**.

- Enlace "Saltar al contenido" como primer elemento focusable.
- Landmarks correctos y un solo `<h1>` por página.
- Navegación completa por teclado, incluido el menú móvil (Escape cierra, foco devuelto al botón).
- Foco visible con `--color-focus` y contraste ≥ 3:1.
- Área táctil mínima de 24×24 px (2.5.8).
- Contraste de texto ≥ 4.5:1; texto grande ≥ 3:1.
- Ningún contenido depende solo del color, del hover o del movimiento.
- Imágenes con `alt` significativo; decorativas con `alt=""`.
- `prefers-reduced-motion` respetado.
- Idioma declarado: `<html lang="es">`.
- El cambio de tema se anuncia y no provoca pérdida de foco.
- Sin trampas de teclado ni scroll horizontal a 320 px.

---

## 10. SEO y metadatos

- Título por página: `%s · Marisa Peña Rey`; home: `Marisa Peña Rey — Desarrolladora web full-stack junior`.
- `description` única por página, 120–160 caracteres.
- `canonical` absoluto por página.
- Open Graph y Twitter Card completos; imagen `og-default.png` de 1200×630.
- JSON-LD `Person` con `name`, `jobTitle`, `url`, `sameAs` (LinkedIn, GitHub), `address` (localidad), `alumniOf`, `knowsLanguage`. Sin teléfono.
- `sitemap-index.xml` generado con `@astrojs/sitemap`.
- `robots.txt` permite todo y apunta al sitemap.
- 404 con `noindex`.
- URLs limpias y estables: `/proyectos/<slug>/`, con barra final canónica.
- `site` configurado en `astro.config.mjs` con el dominio definitivo.

---

## 11. Rendimiento

Presupuestos medidos en móvil, Lighthouse, build de producción:

| Métrica | Presupuesto |
|---|---|
| JS inicial | ≤ 20 KB gzip |
| CSS | ≤ 25 KB gzip |
| Fuentes | ≤ 60 KB total, 2 archivos máximo |
| LCP | < 2.0 s en 4G |
| CLS | < 0.05 |
| INP | < 200 ms |
| Lighthouse Performance | ≥ 95 |
| Lighthouse Accessibility | 100 |
| Lighthouse Best Practices | ≥ 95 |
| Lighthouse SEO | 100 |

Decisiones para cumplirlo:

- Cero frameworks de cliente; solo islas vanilla para tema, menú y copiar email.
- Fuente display precargada con `font-display: swap` y subset latin + latin-ext.
- Imágenes en AVIF/WebP con `width`/`height`, `srcset` y `loading="lazy"` salvo la portada del caso.
- CSS crítico en una sola hoja; sin librerías de iconos.
- Sin scripts de terceros que bloqueen el render.

---

## 12. Estrategia de pruebas

### Niveles

- **Tipos y plantillas:** `astro check` en cada cambio.
- **Contenido:** `scripts/check-content.mjs` valida secciones obligatorias, longitud de `summary` y presencia de `cover`.
- **E2E:** Playwright sobre el build de producción (`astro preview`), en Chromium, con viewport móvil (390×844) y escritorio (1440×900).
- **Accesibilidad:** axe sobre las cinco páginas en tema claro y oscuro; cero violaciones `serious` o `critical`.
- **Rendimiento:** Lighthouse manual en la tarea de QA; se registran los cuatro scores en el PR.
- **Unitarios:** no en v1. La lógica de cliente se cubre con E2E. Si aparece lógica no trivial, se añade Vitest y se actualiza esta spec.

### Casos de prueba

1. Las rutas `/`, `/proyectos/`, `/proyectos/<slug>/`, `/sobre-mi/`, `/contacto/` y `/404` responden 200 (salvo 404), tienen un `<h1>` y un `<title>` no vacío.
2. El tema sigue `prefers-color-scheme` en la primera visita y persiste tras recargar al cambiarlo.
3. El toggle se activa con teclado y anuncia su estado.
4. El menú móvil abre, cierra con Escape y devuelve el foco.
5. El enlace de salto lleva a `<main>`.
6. Todos los enlaces internos resuelven; los externos tienen `rel` correcto.
7. Copiar email muestra confirmación accesible.
8. Todas las imágenes tienen `alt` (vacío si son decorativas).
9. No hay scroll horizontal a 360, 768 y 1440 px.
10. Con `prefers-reduced-motion`, no hay animaciones.
11. No hay errores en consola ni peticiones 404 en ninguna página.

### CI

`.github/workflows/ci.yml` en `push` y `pull_request`:

```bash
npm ci
npm run check
npm run lint
npm run check:content
npm run build
npx playwright install --with-deps chromium
npm run test:e2e
```

---

## 13. Boundaries

### Always

- Ejecutar `npm run verify` antes de cada commit.
- Usar tokens de diseño; nunca colores literales en componentes.
- HTML semántico, `alt` y foco visible en todo cambio de UI.
- Probar a 360 px antes de dar una tarea por terminada.
- Actualizar esta spec cuando cambie una decisión.
- Mantener los textos en español y sin erratas.
- Enlazar el CV solo si el PDF está actualizado.

### Ask first

- Añadir cualquier dependencia.
- Cambiar la paleta, la tipografía o el sistema de espacio.
- Añadir una página, una ruta o una sección nueva.
- Publicar el teléfono, la dirección exacta o material de un cliente.
- Activar analítica o cualquier script de terceros.
- Modificar `docs/Arquitecture.md` o `docs/Design.md`.

### Never

- Añadir backend, base de datos, autenticación o formulario con servidor.
- Publicar secretos, `.env` o credenciales.
- Usar imágenes, fuentes o iconos sin licencia.
- Publicar contenido de prácticas sin permiso.
- Dejar lorem ipsum, enlaces muertos o botones sin acción.
- Commitear `dist/`, `node_modules/` o `.astro/`.
- Usar cookies de seguimiento.
- Eliminar o desactivar tests para que pasen.

---

## 14. Criterios de éxito

- [ ] Dominio propio con HTTPS y despliegue automático desde `main` en Vercel.
- [ ] Cinco rutas + 404 funcionando en producción.
- [ ] Dos casos de estudio completos, con demo/repo o justificación de por qué no.
- [ ] Home comprensible en 30 segundos (prueba con una persona ajena).
- [ ] Lighthouse móvil: ≥ 95 / 100 / ≥ 95 / 100.
- [ ] axe: 0 violaciones `serious` o `critical` en ambos temas.
- [ ] Navegación completa por teclado y con lector de pantalla.
- [ ] Tema persistente y sin FOUC.
- [ ] CV descargable y actualizado; email copiable; enlaces externos válidos.
- [ ] Sin errores de consola ni enlaces internos rotos.
- [ ] CI en verde.
- [ ] `README.md` con instalación, comandos y despliegue.
- [ ] `docs/AGENTS.md` actualizado con los comandos reales.
- [ ] Capturas revisadas a 360, 768 y 1440 px.
- [ ] Al menos cinco candidaturas enviadas con el enlace en la segunda semana.

---

## 15. Preguntas abiertas

| # | Pregunta | Propuesta por defecto |
|---|---|---|
| 1 | ¿Dominio definitivo? | `marisapena.dev` |
| 2 | ¿Caso #2: WordPress de prácticas o el propio portfolio? | WordPress si hay permiso; si no, el portfolio |
| 3 | ¿Cómo desplegamos el proyecto final DAW? | Decidir el día 0 entre hosting PHP barato, demo con SQLite o vídeo + repo |
| 4 | ¿Hay foto profesional? | Sin foto en v1; composición tipográfica |
| 5 | ¿Stack exacto del proyecto final (Laravel/Java)? | Necesario para escribir el caso #1 |
| 6 | ¿"Desarrolladora" o "Desarrollador"? | Desarrolladora |
| 7 | ¿Publicamos teléfono? | No |
| 8 | ¿Rediseñamos el CV en PDF o solo corregimos erratas? | Corregir erratas y maquetación; rediseño solo si sobra tiempo |
| 9 | ¿Qué hacemos con `docs/Arquitecture.md`? | Reescribirlo para que refleje este stack, o archivarlo como histórico |
| 10 | ¿Versión en inglés? | Fuera de la v1 |

---

## 16. Fuera de alcance

- Backend Laravel, MySQL, autenticación y panel de administración para el portfolio.
- Formulario de contacto con envío de email.
- Blog, newsletter, comentarios.
- i18n y versión en inglés.
- CMS headless.
- PWA, modo offline, push notifications.
- Animaciones 3D, WebGL, cursor personalizado.
- Tests unitarios sin lógica que los justifique.
- Integración con la API de GitHub en vivo.

---

## 17. Registro de implementación

### Fase 0 — Base (rama `feat/00-scaffold`)

Decisiones tomadas al ejecutar la especificación:

- Versiones fijadas: Astro **7.4.4**, `@astrojs/sitemap` **3.7.4**, TypeScript **6.0.3** (el peer de `@astrojs/check` admite `^5 || ^6`, no TS 7), Prettier **3.9.10**, Playwright **1.64.1** y axe **4.14.0**.
- `trailingSlash: 'always'` se configura en `astro.config.mjs`; `vercel.json` lo replica y añade cabeceras de seguridad (`X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`) y cache inmutable para `/fonts/`.
- URL canónica provisional: `https://marisapena.vercel.app`. Se actualizará en `astro.config.mjs` y `public/robots.txt` cuando se confirme el proyecto de Vercel o el dominio propio.
- `docs/Arquitecture.md` queda marcado como documento histórico.
- Fuente Instrument Serif self-hosted en `public/fonts/` (latin + latin-ext) con licencia OFL incluida.
- CV copiado a `public/cv/marisa-pena-rey-cv.pdf` desde `docs/CV_Marisa.pdf`.
- Suites E2E iniciales: rutas y 404, persistencia del tema, menú móvil y axe en cuatro páginas × dos temas.
- Las páginas de Proyectos, Sobre mí y Contacto existen con contenido real mínimo para que la navegación no tenga enlaces muertos; se amplían en la Fase 2.
