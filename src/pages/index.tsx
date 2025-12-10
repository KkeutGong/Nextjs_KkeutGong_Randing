import { NextSeo } from 'next-seo';
import dynamic from 'next/dynamic';

import { Main } from '@/components/Main';
import { Footer } from '@/components/Footer';

// LCP 개선: 하위 섹션들을 동적 import로 지연 로드
const Statistics = dynamic(() => import('@/components/Statistics'), {
  loading: () => null,
});
const WhyFail = dynamic(() => import('@/components/WhyFail'), {
  loading: () => null,
});
const MarketInfo = dynamic(() => import('@/components/MarketInfo'), {
  loading: () => null,
});
const WhyExist = dynamic(() => import('@/components/WhyExist'), {
  loading: () => null,
});
const NoBook = dynamic(() => import('@/components/NoBook'), {
  loading: () => null,
});
const Features = dynamic(() => import('@/components/Features'), {
  loading: () => null,
});
const TimeToHavit = dynamic(() => import('@/components/TimeToHavit').then(mod => ({ default: mod.TimeToHavit })), {
  loading: () => null,
});

import styles from '@/styles/Home.module.scss';

export default function Home() {
  return (
    <>
      <NextSeo title="끝공" canonical="https://kkeutgong.hyphen.it.com" />
      <main className={styles.main}>
        <Main />
        <Statistics />
        <WhyFail />
        <MarketInfo />
        <WhyExist />
        <NoBook />
        <Features />
        <TimeToHavit />
        <Footer />
      </main>
    </>
  );
}
