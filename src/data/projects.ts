import type { CollectionEntry } from 'astro:content';

export const projectStatus = {
  live: 'Demo online',
  repo: 'Código publicado',
  'case-study': 'Caso de estudio',
} as const;

export function projectStatusLabel(status: keyof typeof projectStatus): string {
  return projectStatus[status];
}

export function sortProjects(
  projects: CollectionEntry<'projects'>[],
): CollectionEntry<'projects'>[] {
  return [...projects].sort((a, b) => a.data.order - b.data.order);
}
