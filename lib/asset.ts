/**
 * Prefixes a public-folder path with the deployment's base path.
 *
 * Next.js rewrites URLs for `next/image` and `next/link` automatically, but raw
 * `<img src>`, `<video poster>`, and `<source src>` attributes are passed through
 * untouched. On GitHub Pages the site lives at /fitmaximgym/, so those bare
 * absolute paths would resolve against the domain root and 404. Everything that
 * points at /public goes through here.
 *
 * The value is inlined at build time from next.config.js, so it costs nothing at
 * runtime and stays empty for local dev and any root-domain deployment.
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export function asset(path: string) {
  return `${BASE_PATH}${path}`;
}
