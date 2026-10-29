# Especificaciones técnicas del portfolio web

> **Documento histórico.** Esta versión describía un portfolio Laravel/MySQL con panel de
> administración. El stack vigente es Astro estático y vive en [`Spec.md`](Spec.md), que es la
> fuente de verdad. Se conserva este archivo solo como registro del planteamiento inicial.

## 1. Descripción del proyecto

Desarrollo de un portfolio web personal para presentar mi perfil como desarrolladora, mostrar mis proyectos, detallar mis conocimientos técnicos y facilitar el contacto profesional.

El proyecto se desarrollará utilizando tecnologías frontend y backend, con una arquitectura que permita ampliar sus funcionalidades progresivamente.

## 2. Tecnologías principales

### 2.1. HTML5
- **Función:** Estructurar el contenido de la página web.
- **Uso:** Crear las secciones de inicio, sobre mí, proyectos, tecnologías y contacto.
- **Características:** Etiquetas semánticas, formularios y estructura accesible.

### 2.2. CSS3
- **Función:** Diseñar y dar estilo a la interfaz.
- **Uso:** Definir colores, tipografías, distribución de elementos, animaciones y efectos visuales.
- **Características:** Flexbox, CSS Grid, variables CSS, media queries y diseño responsive.

### 2.3. JavaScript
- **Función:** Añadir interactividad al frontend.
- **Uso:** Gestionar el menú de navegación, filtros de proyectos, animaciones, validaciones de formularios y elementos interactivos.
- **Características:** Manipulación del DOM, eventos, funciones, módulos ES y comunicación con servicios mediante Fetch API cuando sea necesario.

### 2.4. PHP
- **Función:** Implementar la lógica del servidor.
- **Uso:** Procesar solicitudes, gestionar formularios y trabajar con la base de datos a través de Laravel.
- **Características:** Programación orientada a objetos, gestión de sesiones y validación de datos en el servidor.

### 2.5. Laravel
- **Función:** Framework principal del backend.
- **Uso:** Gestionar rutas, controladores, modelos, vistas, autenticación y operaciones CRUD de los proyectos.
- **Características:** Arquitectura MVC, middleware, validación de formularios, protección CSRF, Eloquent ORM y migraciones.

### 2.6. MySQL
- **Función:** Gestionar los datos persistentes del portfolio.
- **Uso:** Almacenar proyectos, categorías, tecnologías y, si se implementa, mensajes de contacto.
- **Características:** Tablas relacionales, claves primarias y foráneas, consultas SQL, restricciones e índices.

### 2.7. Git
- **Función:** Controlar las versiones del código.
- **Uso:** Registrar cambios, crear ramas y recuperar versiones anteriores.
- **Características:** Commits descriptivos, ramas de desarrollo y seguimiento del historial del proyecto.

### 2.8. GitHub
- **Función:** Alojar el repositorio remoto del proyecto.
- **Uso:** Publicar el código fuente, documentar el proyecto y compartir los repositorios de cada trabajo.
- **Características:** Repositorios Git, README, gestión de incidencias y GitHub Pages para posibles versiones estáticas.

## 3. Herramientas complementarias

### Visual Studio Code
Editor de código para desarrollar el frontend y backend, instalar extensiones y utilizar herramientas de depuración.

### Chrome DevTools
Herramienta para inspeccionar elementos, depurar JavaScript, comprobar estilos y analizar el comportamiento responsive.

### Figma
Herramienta de diseño para crear prototipos, definir la identidad visual y planificar la distribución de los componentes antes de programarlos.

### Lighthouse
Herramienta para evaluar el rendimiento, la accesibilidad, las buenas prácticas y el SEO de la web.

## 4. Arquitectura del proyecto

Se utilizará Laravel como base de la aplicación full stack, con el patrón Modelo-Vista-Controlador (MVC).

- **Modelo:** Gestionará los datos y su relación con MySQL.
- **Vista:** Presentará la interfaz mediante Blade, HTML, CSS y JavaScript.
- **Controlador:** Procesará las solicitudes y coordinará la lógica de la aplicación.

La interfaz se desarrollará inicialmente con tecnologías nativas, sin necesidad de incorporar React o Vue.

## 5. Funcionalidades previstas

### Parte pública
- Página de inicio con presentación personal.
- Sección sobre mí.
- Listado de proyectos.
- Fichas de proyectos con descripción, tecnologías y enlaces.
- Sección de conocimientos técnicos.
- Formulario de contacto.
- Enlaces a GitHub, LinkedIn y correo electrónico.
- Diseño responsive para móviles, tablets y ordenadores.

### Panel de administración privado
- Inicio de sesión.
- Crear proyectos.
- Consultar y listar proyectos.
- Editar proyectos existentes.
- Eliminar proyectos.
- Gestionar categorías y tecnologías, si se requiere.
- Validar los datos antes de guardarlos.

El panel estará protegido mediante autenticación y autorización para impedir el acceso de usuarios no autorizados.

## 6. Organización del código

La aplicación seguirá la estructura estándar de Laravel:

- `app/Models/`: modelos de datos.
- `app/Http/Controllers/`: controladores.
- `app/Http/Middleware/`: middleware de la aplicación.
- `database/migrations/`: estructura y cambios de la base de datos.
- `database/seeders/`: datos iniciales de prueba.
- `resources/views/`: vistas Blade.
- `resources/css/`: hojas de estilo.
- `resources/js/`: código JavaScript.
- `routes/web.php`: rutas web.
- `public/`: archivos públicos y recursos estáticos.
- `tests/`: pruebas automatizadas.

## 7. Seguridad y calidad

- Validar los datos tanto en el cliente como en el servidor.
- Utilizar protección CSRF en los formularios.
- Proteger las rutas privadas mediante autenticación y autorización.
- Utilizar consultas seguras mediante Eloquent ORM o consultas parametrizadas.
- Guardar las credenciales y claves en variables de entorno.
- No almacenar contraseñas en texto plano.
- Evitar publicar información sensible en el repositorio.
- Comprobar la accesibilidad, el rendimiento y la adaptación a diferentes pantallas.
- Mantener el código organizado y utilizar Git durante el desarrollo.

## 8. Despliegue

El despliegue dependerá de la arquitectura elegida:

- **Frontend estático:** GitHub Pages o Cloudflare Pages.
- **Aplicación Laravel:** hosting compatible con PHP, Composer, MySQL y los requisitos de la versión de Laravel utilizada.
- **Repositorio:** GitHub.

Una aplicación Laravel completa no puede desplegarse directamente en GitHub Pages, ya que necesita ejecutar PHP en un servidor.

## 9. Orden de desarrollo

1. Definir el diseño y la estructura de las páginas.
2. Crear la interfaz con HTML, CSS y JavaScript.
3. Configurar Laravel y la conexión con MySQL.
4. Diseñar los modelos y las migraciones.
5. Implementar la gestión de proyectos.
6. Desarrollar el panel de administración y su seguridad.
7. Integrar el formulario de contacto.
8. Realizar pruebas funcionales, visuales y de seguridad.
9. Publicar la aplicación y documentar el resultado en GitHub.

## 10. Resultado esperado

Obtener un portfolio web profesional, responsive, seguro y ampliable, que permita mostrar mis proyectos y conocimientos técnicos, y que demuestre mis capacidades en desarrollo frontend, backend y gestión de bases de datos.
