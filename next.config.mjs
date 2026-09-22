const isDeployToGh = process.env.npm_lifecycle_event === 'predeploy' || process.env.npm_lifecycle_event === 'deploy';
const isGithubActions = process.env.GITHUB_ACTIONS === 'true';

const rawBasePath = process.env.NEXT_BASE_PATH || process.env.NEXT_PUBLIC_BASE_PATH || (isDeployToGh || isGithubActions ? '/sky-x-digi-solutions' : '');
const basePath = rawBasePath === '/' ? '' : rawBasePath.replace(/\/$/, '');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  transpilePackages: ['three'],
  webpack: (config) => {
    config.externals = [...(config.externals || [])];
    return config;
  },
};

export default nextConfig;
