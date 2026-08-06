/** @type {import('next').NextConfig} */

/* GitHub Pages serves the repo from a subpath (…github.io/fitmaximgym), so every
   asset URL needs that prefix. Locally there is no prefix, hence the env gate —
   the workflow sets GITHUB_PAGES=true, `npm run dev` leaves it unset. */
const isPages = process.env.GITHUB_PAGES === 'true';
const repo = '/fitmaximgym';

const nextConfig = {
  reactStrictMode: true,

  /* Pages is a static file host: no Node server, so no on-demand rendering and
     no image optimization endpoint. `export` emits plain HTML/CSS/JS to out/. */
  output: 'export',

  basePath: isPages ? repo : '',
  assetPrefix: isPages ? repo : '',

  /* Mirrored to the client so `lib/asset.ts` can prefix raw <video>/<img> src
     attributes, which Next.js does not rewrite the way it does next/image. */
  env: {
    NEXT_PUBLIC_BASE_PATH: isPages ? repo : '',
  },

  /* Emit `/about/index.html` rather than `/about.html` so Pages resolves
     extensionless URLs without a rewrite layer. */
  trailingSlash: true,

  images: {
    /* The optimizer runs on a server that Pages doesn't provide. Without this the
       build fails outright. Source files ship as-is — the logo is a 1080×240 PNG,
       so the cost is small. */
    unoptimized: true,
  },
};

module.exports = nextConfig;
