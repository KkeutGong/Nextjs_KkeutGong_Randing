import { Html, Head, Main, NextScript } from 'next/document'

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://kkeutgong.hyphen.it.com')

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        {/* 카카오톡 링크 미리보기 최적화 */}
        <meta property="og:image" content={`${siteUrl}/static/images/og-kakao.png`} />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="400" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:url" content={siteUrl} />
        {/* LCP 이미지 preload는 next/image priority가 처리함 */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
