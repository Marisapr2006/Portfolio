export const processSteps = [
  {
    number: '01',
    title: 'Especificar',
    text: 'Convierto el objetivo en historias, criterios de aceptación y no objetivos. Si no está escrito, no existe.',
  },
  {
    number: '02',
    title: 'Planificar',
    text: 'Divido el trabajo en tareas pequeñas, con dependencias y verificación. Primero lo que reduce más riesgo.',
  },
  {
    number: '03',
    title: 'Implementar',
    text: 'Construyo en vertical: una parte completa y funcionando antes de la siguiente, con commits pequeños.',
  },
  {
    number: '04',
    title: 'Verificar',
    text: 'Tipos, formato, contenido, E2E, axe y revisión a 360 px. Si algo falla, no se publica.',
  },
] as const;
