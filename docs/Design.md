# Especificaciones de diseño del portfolio

## 1. Descripción general

El portfolio tiene dos temas visuales: **modo oscuro** y **modo claro**. Comparten una identidad neobrutalista con guiño a terminal: bordes gruesos, sombras duras sin desenfoque, tipografía grande y acentos violetas y cian.

El usuario puede cambiar entre ambos modos con el botón de la navegación principal. La preferencia se guarda en el navegador.

### Objetivos del diseño

- Mantener una identidad visual consistente en ambos temas.
- Facilitar la lectura y la navegación.
- Destacar los proyectos y los elementos interactivos.
- Llamar la atención con movimiento sin perjudicar la accesibilidad.
- Garantizar una buena experiencia en móvil y escritorio.

## 2. Paleta: modo oscuro

Fondo casi negro con tarjetas ligeramente más claras. Los bordes de controles y tarjetas son cian, y las sombras duras son violetas.

| Elemento | Token | HEX |
|---|---|---|
| Fondo principal | `--color-bg` | `#0B0A12` |
| Tarjetas y superficies | `--color-surface` | `#14121F` |
| Superficie hundida | `--color-surface-sunken` | `#1C1B2B` |
| Color primario | `--color-primary` | `#A78BFA` |
| Color de acento y enlaces | `--color-accent` | `#67E8F9` |
| Texto principal | `--color-text` | `#F4F1FA` |
| Texto secundario | `--color-text-muted` | `#B9B6CC` |
| Separadores finos | `--color-border` | `#343247` |
| Borde de controles y tarjetas | `--color-outline` | `#67E8F9` |
| Sombra dura | `--color-shadow` | `#A78BFA` |
| Marcador de texto | `--color-highlight` | `#6D28D9` |

## 3. Paleta: modo claro

Fondo luminoso con bordes y sombras de tinta oscura.

| Elemento | Token | HEX |
|---|---|---|
| Fondo principal | `--color-bg` | `#F8F7FC` |
| Tarjetas y superficies | `--color-surface` | `#FFFFFF` |
| Superficie hundida | `--color-surface-sunken` | `#EDE7FB` |
| Color primario | `--color-primary` | `#6D28D9` |
| Color de acento y enlaces | `--color-accent` | `#0B6B85` |
| Texto principal | `--color-text` | `#211A30` |
| Texto secundario | `--color-text-muted` | `#4A4258` |
| Separadores finos | `--color-border` | `#D9D2EA` |
| Borde de controles y tarjetas | `--color-outline` | `#211A30` |
| Sombra dura | `--color-shadow` | `#211A30` |
| Marcador de texto | `--color-highlight` | `#A5F3FC` |

## 4. Tipografía

- **Bricolage Grotesque** (variable, pesos 500–800): titulares en 800 y texto corrido.
- **Space Mono** (400 y 700): etiquetas, metadatos, numeración de secciones y el bloque de arranque.

Ambas se sirven desde `public/fonts/` (WOFF2, subset latin) con licencia OFL.

## 5. Reglas de utilización

1. El fondo principal ocupa la mayor parte de la interfaz.
2. Las tarjetas se separan del fondo con borde de 2 px y sombra dura, no con degradados.
3. El color primario se reserva para acciones principales y sombras; el acento, para datos, enlaces y detalles.
4. Los textos mantienen el contraste mínimo de WCAG 2.2 AA en ambos temas.
5. Los colores no son el único indicador de estados; se acompañan de texto o iconos.
6. Botones, enlaces y campos tienen estados `hover`, `focus`, `active` y `disabled`. El botón se desplaza hacia arriba a la izquierda al pasar el ratón y se hunde al pulsarlo.
7. Las imágenes de los proyectos conservan sus colores originales.
8. Las líneas de barrido y la viñeta CRT solo existen en el tema oscuro, y son decorativas.
9. Toda animación se desactiva con `prefers-reduced-motion`, y ninguna cambia la opacidad del texto.

## 6. Implementación mediante variables CSS

Los tokens viven en `src/styles/tokens.css` y se cambian con el atributo `data-theme` de `<html>`. Los componentes usan siempre las variables y nunca colores literales.

## 7. Comportamiento del selector de tema

- Está en la navegación principal, con icono de sol o luna según el estado.
- El tema elegido se guarda en `localStorage['mp-theme']`.
- En la primera visita se usa la preferencia del sistema; después, la guardada.
- El cambio actualiza las variables CSS sin recargar y se anuncia con una región `aria-live`.
- El botón tiene nombre accesible y foco visible.

## 8. Accesibilidad y contraste

Los contrastes medidos están en `docs/Spec.md` (sección Color). Resumen:

- Texto principal: 17.64:1 (oscuro) y 15.70:1 (claro).
- Texto secundario: 9.96:1 y 8.91:1.
- Acento como texto: 13.59:1 y 5.70:1.
- Texto de botón primario: 7.24:1 y 7.10:1.

Las pruebas con axe se ejecutan en todas las rutas y en ambos temas.

## 9. Resultado esperado

Una identidad reconocible y llamativa, coherente entre la página de inicio, las secciones de sobre mí y experiencia, los proyectos y el contacto, y sencilla de mantener gracias a los tokens.
