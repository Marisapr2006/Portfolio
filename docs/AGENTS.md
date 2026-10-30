# AGENTS.md

Instructions for any AI coding agent working in this repository.

## Repository layout

- `README.md` — project overview, setup and commands.
- `src/` — Astro application: components, layouts, pages, data, scripts and styles.
- `public/` — static assets (CV, fonts, favicon, robots).
- `tests/e2e/` — Playwright and axe test suites.
- `scripts/` — content validation.
- `.agents/skills/` — canonical, agent-neutral Agent Skills collection.
- `.claude/skills/` — identical mirror of the same skills for Claude Code.
- `.vscode/launch.json` — dev-server launch configuration.
- `docs/Spec.md` — source of truth for product and technical decisions.

## Skills

This repo ships a portable [Agent Skills](https://agentskills.io) collection. Each skill is a directory containing a `SKILL.md` file: YAML frontmatter with `name` and `description`, followed by the workflow.

Load a skill before starting work when its description matches the task. If you are unsure which one applies, read `.agents/skills/using-agent-skills/SKILL.md` — it maps common tasks to the right skill.

### Skill index

This table is a quick index for agents that only read `AGENTS.md`. The `SKILL.md` is the source of truth: open it for the full steps, checklists, and examples.

| Skill | Use it when |
| --- | --- |
| `using-agent-skills` | Starting a session, or you do not know which skill applies. Entry point that maps a task to the right workflow. |
| `interview-me` | The request is underspecified (missing who/why/success/constraint), or the user says "interview me", "grill me", or "are we sure?". Use before any plan, spec, or code. |
| `spec-driven-development` | Starting a new project, feature, or significant change with no written spec, or when requirements are vague or ambiguous. |
| `planning-and-task-breakdown` | You have a spec and need ordered, verifiable tasks; the work feels too big to start or needs to be parallelized. |
| `context-engineering` | Starting a session, output quality is degrading, you are switching tasks, or you need to set up the project's rules and context. |
| `source-driven-development` | You are about to write framework- or library-specific code from memory, or correctness must be backed by official docs. |
| `incremental-implementation` | Implementing any multi-file change, or any task where writing everything at once is risky. Build thin vertical slices. |
| `frontend-ui-engineering` | Building or modifying UI, components, layouts, responsiveness, accessibility, or when the result must look production-quality. |
| `api-and-interface-design` | Designing REST/GraphQL endpoints, module boundaries, component props, type contracts, or any public interface. |
| `test-driven-development` | Implementing logic, fixing a bug, or changing behavior. Write the failing test first and prove the fix. |
| `browser-testing-with-devtools` | Anything that runs in a browser needs runtime verification: DOM, console errors, network requests, performance, or visual output. Requires Chrome DevTools MCP. |
| `debugging-and-error-recovery` | Tests fail, the build breaks, runtime behavior is wrong, or an unexpected error appears. Find the root cause instead of guessing. |
| `code-review-and-quality` | Before merging any change, or when reviewing code written by yourself, another agent, or a human. |
| `code-simplification` | Code works but is harder to read, maintain, or extend than it should be; refactor for clarity without changing behavior. |
| `security-and-hardening` | Handling user input, authentication, sessions, sensitive data, uploads, webhooks, or third-party integrations. |
| `performance-optimization` | Performance requirements exist, a regression is suspected, Core Web Vitals are poor, or profiling revealed a bottleneck. Measure before optimizing. |
| `git-workflow-and-versioning` | Making any code change: committing, branching, resolving conflicts, cutting a release, choosing a version bump, tagging, or writing a changelog. |
| `documentation-and-adrs` | Making an architectural decision, changing a public API, shipping a feature, or recording context that future engineers and agents will need. |
| `seo-audit` | Auditing metadata, canonical URLs, sitemap, structured data, indexing, or Core Web Vitals. |
| `design-taste-frontend` | Designing or restyling pages so they do not look templated. Heavy (39 files); palette and typography changes still require asking first (Spec §13). |
| `frontend-design` | Choosing an aesthetic direction, typography and composition for new or reshaped UI. |
| `copywriting` | Writing or rewriting page copy (hero, Sobre mí, case studies). Copy stays in Spanish. |
| `emil-design-eng` | UI polish, component details and animation decisions. |
| `animate` | Adding motion from scratch. Always honor `prefers-reduced-motion`. |
| `review-animations` | Reviewing existing motion code. |
| `animation-performance` | Animations that drop frames, or choosing which properties to animate. |
| `playwright-cli` | Automating a browser or working with the Playwright tests in `tests/e2e/`. |
| `break-ui` | Stress-testing a component with worst-case data (long names, empty lists, emoji). |
| `mobile-native` | Touch behavior, the `100vh` bug, tap highlights and notch safe areas on phones. |
| `launch` | Pre-launch QA and go-live checklist before publishing the site. |

### Typical workflows

- **New feature:** `interview-me` → `spec-driven-development` → `planning-and-task-breakdown` → `incremental-implementation` → `test-driven-development` → `code-review-and-quality` → `documentation-and-adrs`.
- **Bug fix:** `debugging-and-error-recovery` → `test-driven-development` → `code-review-and-quality`.
- **UI work:** `frontend-ui-engineering` + `browser-testing-with-devtools`.
- **Uncertain which skill applies:** start with `using-agent-skills`.

Discovery paths by agent:

| Agent | Auto-discovers |
| --- | --- |
| Codex | `.agents/skills/` |
| OpenCode | `.agents/skills/` and `.claude/skills/` |
| Claude Code | `.claude/skills/` |
| Other agents | Point the agent at `.agents/skills/`, or read the relevant `SKILL.md` directly |

The two skill directories must stay identical. After editing a skill, mirror the change: copy `.agents/skills/` over `.claude/skills/`.

## Commands

Requires Node.js `>=22.23.4` and npm `>=11`.

- Dev: `npm run dev` — Astro on <http://localhost:4321/> (see `.vscode/launch.json`)
- Build: `npm run build` — static output in `dist/`
- Preview: `npm run preview` — serve the production build
- Types and templates: `npm run check`
- Format check: `npm run lint`; apply with `npm run format`
- Content: `npm run check:content` — validates required sections in project Markdown
- Tests: `npm test` (build + Playwright), `npm run test:e2e`, `npm run test:a11y`
- Full gate: `npm run verify`

## Conventions

- Design tokens live in `src/styles/tokens.css`; never hardcode colors or spacing in components.
- Project copy lives in Markdown, not in components.
- Keep `.agents/skills/` and `.claude/skills/` in sync.
- Skills follow the Agent Skills spec: `name` must match the directory and be lowercase kebab-case.
