'use client';

import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
} from 'react-share';
import { motion } from 'framer-motion';

import Styles from './SocialShare.module.scss';

// KakaoIcon은 react-share에서 제공하지 않으므로 커스텀 컴포넌트 생성
const KakaoIcon = ({ size, round }: { size: number; round?: boolean }) => {
  const style: React.CSSProperties = {
    width: size,
    height: size,
    borderRadius: round ? '50%' : '0',
    backgroundColor: '#FEE500',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    overflow: 'hidden',
  };

  return (
    <div style={style}>
      <svg
        width={size * 0.55}
        height={size * 0.55}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 3C6.477 3 2 6.477 2 11c0 2.84 1.81 5.35 4.5 6.8L5.5 21l3.5-1.5c1.05.3 2.15.45 3.25.45 5.523 0 10-3.477 10-8s-4.477-8-10-8z"
          fill="#000000"
        />
      </svg>
    </div>
  );
};

// 카카오톡 공유 버튼 컴포넌트 (react-share에서 제공하지 않음)
const KakaoShareButton = ({
  url,
  title,
  className,
  children,
}: {
  url: string;
  title: string;
  className?: string;
  children: React.ReactNode;
}) => {
  const handleKakaoShare = () => {
    // 카카오톡 링크 공유 URL 생성
    const shareUrl = `https://story.kakao.com/s/share?url=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank', 'width=600,height=600');
  };

  return (
    <button
      type="button"
      onClick={handleKakaoShare}
      className={className}
      aria-label="카카오톡으로 공유하기"
    >
      {children}
    </button>
  );
};

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://kkeutgong.hyphen.it.com');

const shareTitle = '끝공 - 포기하지 않는 경험을 만듭니다';
const shareDescription = 'AI가 매일의 학습 루틴을 설계하고 합격까지 이끌어 드립니다.';

export default function SocialShare(): JSX.Element {
  return (
    <motion.div
      className={Styles.SocialShare}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div className={Styles.SocialShare__label}>공유하기</div>
      <div className={Styles.SocialShare__buttons}>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <KakaoShareButton
            url={siteUrl}
            title={shareTitle}
            className={Styles.SocialShare__button}
          >
            <KakaoIcon size={40} round />
          </KakaoShareButton>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FacebookShareButton
            url={siteUrl}
            hashtag="#끝공"
            className={Styles.SocialShare__button}
          >
            <FacebookIcon size={40} round />
          </FacebookShareButton>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <TwitterShareButton
            url={siteUrl}
            title={shareTitle}
            className={Styles.SocialShare__button}
          >
            <TwitterIcon size={40} round />
          </TwitterShareButton>
        </motion.div>
      </div>
    </motion.div>
  );
}

