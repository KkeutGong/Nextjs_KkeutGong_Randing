// 프로덕션 도메인 설정
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://kkeutgong.hyphen.it.com');

export default {
  titleTemplate: '%s | 포기하지 않는 경험을 만듭니다',
  description: '포기하지 않는 경험을 만듭니다, 끝공',
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/favicon-16x16.png',
    },
  ],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: siteUrl,
    siteName: '끝공',
    title: '끝공 | 포기하지 않는 경험을 만듭니다.',
    description: '포기하지 않는 경험을 만듭니다, 끝공',
    images: [
      {
        url: `${siteUrl}/static/images/og-kakao.png`,
        width: 800,
        height: 400,
        alt: '끝공 - 포기하지 않는 경험을 만듭니다',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    handle: '@handle',
    site: 'kkeutgong.hyphen.it.com',
    cardType: 'summary_large_image',
  },
};
