export interface TimelineEntry {
  id: string;
  period: string;
  kind: string;
  title: string;
  organization?: string;
  summary?: string;
  tasks?: readonly string[];
  tags?: readonly string[];
  duration?: { value: string; unit: string };
  finalProject?: string;
}

// Source: CV (docs/CV_Marisa.pdf). The internship describes tasks only: no
// client names or material, as required by docs/Spec.md §13.
export const timeline: readonly TimelineEntry[] = [
  {
    id: 'practicas',
    period: '2026',
    kind: 'Prácticas (FCT)',
    title: 'Desarrolladora web — técnica en prácticas',
    organization: 'Empire Systems',
    duration: { value: '4', unit: 'meses' },
    tasks: [
      'Desarrollo, personalización y mantenimiento de sitios web con WordPress.',
      'Gestión de contenidos, maquetación y configuración de plugins para optimizar la web.',
      'Soporte en tareas administrativas digitales y elaboración de documentación y justificaciones técnicas.',
      'Colaboración polivalente en la resolución de incidencias informáticas del equipo.',
    ],
    tags: ['WordPress', 'Plugins', 'Maquetación', 'Documentación técnica'],
  },
  {
    id: 'daw',
    period: '2024 – 2026',
    kind: 'Formación',
    title: 'Grado Superior en Desarrollo de Aplicaciones Web (DAW)',
    summary:
      'Formación en desarrollo full-stack, bases de datos y maquetación web, con especial atención al desarrollo asistido por IA y a la especificación antes del código.',
    finalProject:
      'Aplicación web completa con backend en Laravel, frontend dinámico en JavaScript, base de datos MySQL y autenticación de usuarios. Caso de estudio en preparación.',
  },
  {
    id: 'bachillerato',
    period: '2022 – 2024',
    kind: 'Formación',
    title: 'Bachillerato Tecnológico',
  },
];

export const skills = [
  'Aprendizaje rápido',
  'Polivalencia y resolución',
  'Trabajo en equipo',
  'Atención al detalle',
] as const;
