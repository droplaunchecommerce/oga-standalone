/**
 * Resolves a public asset path relative to Vite's base URL.
 * Needed because GitHub Pages serves from a subdirectory (/oga-standalone/).
 */
export const asset = (path: string): string =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
