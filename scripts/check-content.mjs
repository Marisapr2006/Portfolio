import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const projectsDir = 'src/content/projects';
const requiredSections = [
  '## Contexto',
  '## El problema',
  '## Restricciones',
  '## Decisiones',
  '## Resultado',
  '## Qué haría después',
];
const maxSummaryLength = 160;

let files = [];

try {
  files = (await readdir(projectsDir)).filter((file) => file.endsWith('.md'));
} catch (error) {
  if (error.code === 'ENOENT') {
    console.log(`check-content: ${projectsDir} does not exist yet; nothing to validate.`);
    process.exit(0);
  }
  throw error;
}

if (files.length === 0) {
  console.log(`check-content: no projects found in ${projectsDir}; nothing to validate.`);
  process.exit(0);
}

const errors = [];

for (const file of files) {
  const path = join(projectsDir, file);
  const source = await readFile(path, 'utf8');
  const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);

  if (!frontmatter) {
    errors.push(`${file}: missing frontmatter block`);
    continue;
  }

  const summary = frontmatter[1].match(/^summary:\s*(.+)$/m)?.[1]?.replace(/^['"]|['"]$/g, '');
  if (!summary) {
    errors.push(`${file}: missing summary`);
  } else if (summary.length > maxSummaryLength) {
    errors.push(`${file}: summary is ${summary.length} characters (max ${maxSummaryLength})`);
  }

  if (!/^cover:\s*.+$/m.test(frontmatter[1])) {
    errors.push(`${file}: missing cover`);
  }

  const positions = requiredSections.map((section) => source.indexOf(`\n${section}`));
  requiredSections.forEach((section, index) => {
    if (positions[index] === -1) {
      errors.push(`${file}: missing section "${section}"`);
      return;
    }
    if (index > 0 && positions[index] < positions[index - 1]) {
      errors.push(`${file}: section "${section}" is out of order`);
    }
  });
}

if (errors.length > 0) {
  console.error('check-content: validation failed');
  for (const error of errors) {
    console.error(`  - ${error}`);
  }
  process.exit(1);
}

console.log(`check-content: ${files.length} project(s) validated.`);
