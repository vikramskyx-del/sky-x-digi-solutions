/**
 * SKYX Digi Solutions — Asset & Resource Path Management
 * 
 * Ensures robust image, media and asset resolution across all deployment environments:
 * - Local dev (http://localhost:3000)
 * - GitHub Pages subpath (https://vikramskyx-del.github.io/sky-x-digi-solutions/)
 * - Cloudflare Pages / custom domain (https://skyxdigi.com/)
 */

const isGhEnv = 
  process.env.GITHUB_ACTIONS === 'true' || 
  process.env.npm_lifecycle_event === 'predeploy' || 
  process.env.npm_lifecycle_event === 'deploy';

const defaultBasePath = isGhEnv ? '/sky-x-digi-solutions' : '';

export function getAssetPath(path: string): string {
  if (!path) return '';

  // External, data, or blob URLs should be returned verbatim
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path;
  }

  // Normalize path with leading slash
  const cleanPath = path.startsWith('/') ? path : `/${path}`;

  // Priority 1: Environment variable configured at build time (e.g. from next.config.mjs or deploy script)
  const envBasePath = process.env.NEXT_PUBLIC_BASE_PATH || process.env.NEXT_BASE_PATH || defaultBasePath;

  if (envBasePath) {
    // Avoid double prefixing if path already starts with envBasePath
    if (cleanPath.startsWith(envBasePath)) {
      return cleanPath;
    }
    return `${envBasePath}${cleanPath}`;
  }

  // Priority 2: Runtime fallback detection for client-side hydration on GitHub Pages subpath
  if (typeof window !== 'undefined' && window.location) {
    const pathname = window.location.pathname;
    if (pathname.startsWith('/sky-x-digi-solutions')) {
      return `/sky-x-digi-solutions${cleanPath}`;
    }
  }

  return cleanPath;
}

/**
 * Fallback handler for <img> elements:
 * If an asset fails to load (e.g. due to subpath mismatch), attempts recovery automatically.
 */
export function handleAssetError(e: React.SyntheticEvent<HTMLImageElement, Event>) {
  const img = e.currentTarget;
  if (img.dataset.retried) return;
  img.dataset.retried = 'true';
  const src = img.getAttribute('src') || '';
  const filename = src.split('/').pop();
  if (filename) {
    if (!src.includes('/sky-x-digi-solutions/')) {
      img.src = `/sky-x-digi-solutions/assets/${filename}`;
    } else {
      img.src = `./assets/${filename}`;
    }
  }
}
