---
title: Este portfolio
summary: 'Un portfolio estático en Astro que trata cada proyecto como un caso de ingeniería: especificación, decisiones, pruebas y despliegue.'
year: 2026
role: Diseño y desarrollo
status: repo
stack:
  - Astro
  - TypeScript
  - CSS
  - Markdown
  - Playwright
  - Zod
cover: ../../assets/projects/portfolio/cover.png
repo: https://github.com/Marisapr2006/Portfolio
featured: true
order: 1
---

## Contexto

Este portfolio nace de una necesidad concreta: buscar mi primera oportunidad como desarrolladora y tener un sitio que explique cómo trabajo, no solo qué tecnologías he tocado. También quería un proyecto propio que pudiera defender en una entrevista, con decisiones que pudiera justificar.

## El problema

La mayoría de portfolios junior son una galería de capturas con una lista de tecnologías. Eso no demuestra criterio. El reto era construir algo rápido, accesible y fácil de actualizar, sin backend ni CMS, y que cada caso explicara el contexto, las restricciones y las decisiones.

## Restricciones

Tenía que ser estático y gratuito de alojar; cargar rápido en móvil; cumplir WCAG 2.2 AA; no añadir dependencias innecesarias; y permitir añadir un proyecto creando un Markdown y una carpeta de imágenes. El contenido está en español y no hay versión en inglés en la primera versión.

## Decisiones

Elegí Astro por su salida estática, las Content Collections y la optimización de imágenes. El diseño usa CSS nativo con custom properties en lugar de Tailwind: el sitio es pequeño y quería que cada token tuviera una razón. El tema claro/oscuro se resuelve con un script bloqueante en el head para evitar FOUC y un botón con estado accesible.

El estilo visual es neobrutalista con un guiño a las terminales: bordes gruesos, sombras duras, tipografía Bricolage Grotesque y Space Mono autoalojadas, y un efecto CRT y de glitch en el titular. Para las animaciones de entrada y de scroll usé GSAP, la única dependencia de cliente: el resto del movimiento (glitch, cintas, hover) es CSS puro. Todo se anima solo con `transform`, para que el contraste del texto no cambie en ningún fotograma, y con `prefers-reduced-motion` no se registra ninguna animación.

Los proyectos se validan con Zod y un script que exige seis secciones. Un caso incompleto rompe el build, para que no se publique una tarjeta vacía. Las pruebas son Playwright y axe sobre el build de producción, en móvil y escritorio.

## Resultado

El sitio se sirve como HTML estático y genera las imágenes en el build. El CSS pesa 7 KB gzip. El JavaScript de cliente pesa 43 KB gzip, casi todo GSAP, y la página se ve completa sin él. Las pruebas cubren rutas, 404, tema, menú móvil y accesibilidad en ambos temas. El despliegue está preparado para Vercel con previews por pull request.

## Qué haría después

Añadir el caso del proyecto final de DAW, medir Lighthouse en producción y publicar una versión en inglés cuando el contenido base esté estable. También quiero convertir el validador de contenido en un test de CI más estricto y añadir capturas de cada caso.
