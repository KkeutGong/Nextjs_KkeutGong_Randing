import '@/styles/globals.scss';
import localFont from 'next/font/local';
import { useEffect, useState } from 'react';

import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Toaster } from 'react-hot-toast';
import CookieConsent from 'react-cookie-consent';

import SEO from '@/constants/objects/seo';
import { ErrorBoundary } from '@/components/ErrorBoundary';

// 폰트 최적화 - next/font/local 사용
const pretendard = localFont({
  src: [
    {
      path: '../../public/static/fonts/Pretendard-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/static/fonts/Pretendard-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/static/fonts/Pretendard-SemiBold.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/static/fonts/Pretendard-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/static/fonts/Pretendard-Bold.otf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-pretendard',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
  adjustFontFallback: 'Arial',
});

export default function App({ Component, pageProps }: AppProps) {
  const [isVercel, setIsVercel] = useState(false);

  useEffect(() => {
    // Vercel 환경에서만 Analytics와 Speed Insights 활성화
    // Vercel에 배포되면 process.env.VERCEL이 자동으로 설정됨
    // 또는 호스트명이 vercel.app 또는 vercel.com으로 끝나는지 확인
    const isVercelEnv =
      process.env.VERCEL === '1' ||
      (typeof window !== 'undefined' &&
        (window.location.hostname.includes('vercel.app') ||
          window.location.hostname.includes('vercel.com')));
    setIsVercel(isVercelEnv);
  }, []);

  return (
    <ErrorBoundary>
      <div className={pretendard.variable}>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
            borderRadius: '8px',
            padding: '12px 16px',
          },
          success: {
            iconTheme: {
              primary: '#4ade80',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      <CookieConsent
        location="bottom"
        buttonText="동의합니다"
        declineButtonText="거부합니다"
        cookieName="kkeutgong-cookie-consent"
        style={{ background: '#2B373B' }}
        buttonStyle={{ background: '#4169E1', color: '#fff', fontSize: '14px', borderRadius: '4px', padding: '10px 20px' }}
        declineButtonStyle={{ background: '#6c757d', color: '#fff', fontSize: '14px', borderRadius: '4px', padding: '10px 20px' }}
        expires={365}
        enableDeclineButton
      >
        이 웹사이트는 사용자 경험을 개선하기 위해 쿠키를 사용합니다. 계속 사용하시면 쿠키 사용에 동의하는 것으로 간주됩니다.
      </CookieConsent>
        {/* Vercel 환경에서만 Analytics와 Speed Insights 로드 */}
        {isVercel && (
          <>
      <Analytics />
      <SpeedInsights />
          </>
        )}
      </div>
    </ErrorBoundary>
  );
}
