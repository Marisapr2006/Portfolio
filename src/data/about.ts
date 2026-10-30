import { site } from './site';

// Copy shared by the home page and /sobre-mi/. Keep it in sync with the CV.
export const about = {
  statement: {
    before: 'Me interesa el código que',
    marks: ['se entiende', 'se mantiene', 'resuelve un problema real'],
  },
  paragraphs: [
    'Soy Marisa Peña Rey. He terminado el Grado Superior en Desarrollo de Aplicaciones Web (DAW) y busco mi primera oportunidad profesional como desarrolladora.',
    'Trabajo con Laravel/PHP, JavaScript, HTML/CSS y MySQL, además de WordPress. Uso la IA como acelerador, pero reviso cada línea y cada decisión: el criterio no se delega.',
    'Estoy en Las Palmas de Gran Canaria y tengo disponibilidad para trabajar en remoto. Quiero formar parte de un equipo donde pueda aprender de código real y aportar desde el primer día.',
  ],
  facts: [
    { label: 'ubicación', value: site.location },
    { label: 'disponible', value: `${site.availability} · Remoto` },
    { label: 'formación', value: 'DAW 2024–2026 · Bachillerato Tecnológico 2022–2024' },
    { label: 'idiomas', value: 'Español nativo · Inglés B1' },
  ],
} as const;
