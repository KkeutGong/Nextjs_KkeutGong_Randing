/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // /docs 경로에 대한 404 에러 방지 (브라우저 확장 프로그램 등에서 요청하는 경우)
  async rewrites() {
    return [
      {
        source: '/docs',
        destination: '/',
      },
    ];
  },
  // HTTP 헤더 설정
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  // 프로덕션 최적화 설정 (swcMinify는 Next.js 13+에서 기본 활성화)
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  // 레거시 브라우저 지원 제거 (최신 브라우저만 타겟팅)
  experimental: {
    optimizePackageImports: ['framer-motion', '@sentry/nextjs'],
  },
  // Turbopack 설정 (Next.js 16에서 기본 활성화)
  // Turbopack이 자동으로 코드 스플리팅과 최적화를 처리합니다
  // 최신 브라우저만 타겟팅하여 레거시 폴리필 제거
  transpilePackages: [],
}

module.exports = nextConfig
