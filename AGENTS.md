# Project coding guidelines

## General principles

- Prioritize simple, maintainable, and scalable solutions.
- Avoid over-engineering.
- Prefer small, focused changes over broad refactors.
- Preserve the existing architecture and coding style unless there is a clear reason to change it.
- Avoid adding new dependencies unless strictly necessary.
- Before changing architecture, explain the tradeoff briefly and prefer the least invasive option.

## Web development

- Prefer TypeScript over JavaScript for new files and new modules.
- Prefer typed data structures, interfaces, and narrow types over loose objects.
- Avoid using `any` unless there is a strong reason.
- Keep components small and focused.
- Prefer composition over inheritance.
- Avoid mixing unrelated responsibilities in the same component, hook, service, or utility.
- Keep UI logic, data fetching, and business logic reasonably separated.
- Follow the conventions already present in the project.

## React / frontend

- Prefer clear component names and explicit props.
- Avoid unnecessary state.
- Derive values instead of duplicating state when possible.
- Avoid premature memoization with `useMemo` / `useCallback`; use them only when they solve a real problem.
- Keep effects focused and avoid large `useEffect` blocks with multiple responsibilities.
- Prefer custom hooks only when they reduce repetition or clarify intent.

## Styling

- Follow the styling approach already used in the project.
- Do not introduce a new styling library unless explicitly requested.
- Prefer reusable classes/components over duplicated styling.
- Keep responsive behavior simple and predictable.

## Comments and documentation

- Prefer self-explanatory code over comments.
- Do not add comments for obvious code.
- Add documentation only when it explains complex behavior, important constraints, public APIs, JSON/config fields, or non-obvious decisions.
- Keep comments short and useful.

## Analysis and context discipline

- Keep analysis focused on the requested task.
- Avoid scanning unrelated files.
- Before making changes, inspect only the minimum set of files needed.
- Expand the investigation only if the first files are not enough.
- Avoid long reports unless explicitly requested.
- When reporting findings, be concise and include only relevant file references, risks, and next steps.

## Git safety

- Do not run `git push`.
- Do not create commits unless explicitly requested.
- Do not rewrite history, rebase, reset, or force-push unless explicitly requested.
- Leave changes ready for manual review.