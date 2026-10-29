# Especificaciones de la paleta de colores del portfolio

## 1. Descripción general

El portfolio contará con dos temas visuales: **modo claro** y **modo oscuro**. Ambos compartirán una identidad visual basada en tonos violetas, con colores complementarios que garanticen una interfaz moderna, profesional, accesible y coherente.

El usuario podrá cambiar entre ambos modos mediante un botón de alternancia situado en la navegación principal. La preferencia seleccionada se guardará en el navegador para mantenerla en futuras visitas.

### Objetivos del diseño

- Mantener una identidad visual consistente en ambos temas.
- Facilitar la lectura y la navegación.
- Destacar los proyectos y elementos interactivos.
- Adaptar los colores al tema seleccionado.
- Garantizar una buena experiencia en dispositivos móviles y ordenadores.
- Aplicar transiciones suaves al cambiar de tema.

## 2. Paleta de colores: modo oscuro

El modo oscuro tendrá una estética tecnológica, elegante y minimalista. Utilizará fondos oscuros, superficies ligeramente diferenciadas y acentos violetas y cian.

| Elemento | Nombre | Código HEX |
|---|---|---|
| Fondo principal | Midnight | `#11111B` |
| Tarjetas y superficies | Surface | `#1C1B2B` |
| Color primario | Lavender | `#A78BFA` |
| Color de acento | Cyan | `#67E8F9` |
| Texto principal | Soft White | `#F4F1FA` |
| Texto secundario | Muted Lavender | `#A5A2B8` |
| Bordes y separadores | Dark Border | `#343247` |

### Aplicación de los colores

- **Fondo principal:** fondo general de la página y de las secciones principales.
- **Tarjetas y superficies:** tarjetas de proyectos, paneles, menús y bloques de contenido.
- **Color primario:** botones principales, indicadores seleccionados y elementos destacados.
- **Color de acento:** enlaces, iconos, pequeños detalles y estados interactivos.
- **Texto principal:** títulos, encabezados y contenido importante.
- **Texto secundario:** descripciones, metadatos y explicaciones complementarias.
- **Bordes y separadores:** delimitación de tarjetas, campos de formulario y divisiones visuales.

## 3. Paleta de colores: modo claro

El modo claro tendrá una estética luminosa, limpia y profesional. Se emplearán fondos claros, superficies blancas y tonos violetas más intensos para conservar la identidad visual y facilitar la lectura.

| Elemento | Nombre | Código HEX |
|---|---|---|
| Fondo principal | Soft Background | `#F8F7FC` |
| Tarjetas y superficies | White | `#FFFFFF` |
| Color primario | Deep Violet | `#7C3AED` |
| Color de acento | Deep Cyan | `#0E7490` |
| Texto principal | Deep Charcoal | `#211A30` |
| Texto secundario | Muted Gray Violet | `#625A70` |
| Bordes y separadores | Light Border | `#E5E0EE` |

### Aplicación de los colores

- **Fondo principal:** fondo general de la web y de las secciones.
- **Tarjetas y superficies:** tarjetas de proyectos, formularios, menús y bloques de contenido.
- **Color primario:** botones principales, enlaces destacados y elementos seleccionados.
- **Color de acento:** iconos, enlaces secundarios y pequeños detalles interactivos.
- **Texto principal:** títulos, encabezados y contenido principal.
- **Texto secundario:** descripciones, información auxiliar y metadatos.
- **Bordes y separadores:** límites de tarjetas, campos y componentes de interfaz.

## 4. Correspondencia entre los dos temas

Los colores cambiarán según el tema, pero cada elemento conservará su función visual.

| Elemento | Modo claro | Modo oscuro |
|---|---|---|
| Fondo | `#F8F7FC` | `#11111B` |
| Superficies | `#FFFFFF` | `#1C1B2B` |
| Color primario | `#7C3AED` | `#A78BFA` |
| Color de acento | `#0E7490` | `#67E8F9` |
| Texto principal | `#211A30` | `#F4F1FA` |
| Texto secundario | `#625A70` | `#A5A2B8` |
| Bordes | `#E5E0EE` | `#343247` |

## 5. Reglas de utilización

1. El fondo principal debe ocupar la mayor parte de la interfaz.
2. Las superficies deben diferenciarse del fondo sin generar contrastes excesivos.
3. El color primario se utilizará para acciones principales y elementos importantes.
4. El color de acento se reservará para detalles, iconos y enlaces secundarios.
5. Los textos deben mantener un contraste suficiente con sus fondos.
6. Los colores no deben utilizarse como único indicador de estados o errores; se acompañarán de texto o iconos cuando sea necesario.
7. Los botones, enlaces y campos interactivos tendrán estados de `hover`, `focus`, `active` y `disabled`.
8. Las transiciones entre temas serán suaves y no deberán dificultar la navegación.
9. Las imágenes y capturas de los proyectos mantendrán sus colores originales.
10. Se evitará el uso excesivo de degradados, sombras intensas y colores de acento.

## 6. Implementación mediante variables CSS

Los colores se definirán como variables globales para facilitar su mantenimiento y permitir cambiar de tema sin duplicar las hojas de estilo.

Los componentes utilizarán estas variables en lugar de definir colores directamente en cada selector.

## 7. Comportamiento del selector de tema

- El selector estará disponible en la navegación principal.
- Se utilizará un icono de sol para ofrecer el modo claro y un icono de luna para ofrecer el modo oscuro, según el estado actual.
- El tema elegido se guardará en `localStorage`.
- En la primera visita, se podrá utilizar la preferencia de apariencia del sistema operativo.
- En las siguientes visitas, se priorizará el tema guardado por el usuario.
- El cambio de tema actualizará las variables CSS sin recargar la página.
- El selector tendrá un nombre accesible para lectores de pantalla y un indicador de foco visible.

## 8. Accesibilidad y contraste

La paleta deberá comprobarse para garantizar una lectura cómoda y una navegación accesible.

Como referencia, se aplicarán los criterios WCAG 2.2 nivel AA:

- Contraste mínimo de **4,5:1** para texto normal.
- Contraste mínimo de **3:1** para texto grande.
- Contraste mínimo de **3:1** para componentes visuales y elementos gráficos relevantes.

Se comprobarán especialmente los botones, los enlaces, el texto secundario y los estados de foco. Los colores definidos son una propuesta visual inicial; deberán verificarse las combinaciones concretas antes de dar por finalizada la interfaz.

## 9. Resultado esperado

El portfolio dispondrá de dos temas visuales coherentes, con una identidad violeta reconocible, una buena jerarquía visual y una implementación sencilla de mantener.

La paleta se utilizará en todas las secciones de la web para asegurar la consistencia entre la página de inicio, la presentación personal, los proyectos, las tecnologías, el contacto y el panel de administración.
