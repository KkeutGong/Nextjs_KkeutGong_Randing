'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

import { Button } from '@/components/Common/Button';

import mockupLgSrc from '../../../public/static/images/mockup-main-lg.webp';

import Styles from './Main.module.scss';

export default function Main(): JSX.Element {
  return (
    <div className={Styles.Main}>
      <motion.div
        className={Styles.Main__title}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        포기하지 않는 경험을 만듭니다.
      </motion.div>
      <motion.div
        className={Styles.Main__logo}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
      >
        끝공
      </motion.div>
      <motion.div
        className={Styles.Main__introText}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
      >
        AI가 매일의 학습 루틴을 설계하고 &nbsp;
        <motion.span
          className={Styles['Main__introText--strong']}
          animate={{
            backgroundPosition: ['0%', '100%', '0%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            background: 'linear-gradient(90deg, #fff 0%, #4169E1 50%, #fff 100%)',
            backgroundSize: '200% 100%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          합격까지 이끌어 드립니다.
        </motion.span>
      </motion.div>
      <motion.div
        className={Styles.Main__store}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
      >
        <Button type="reservation" text="사전예약" />
      </motion.div>
      <div className={Styles.Main__image}>
        <Image
          src={mockupLgSrc}
          alt="havit mockup main"
          width={1145}
          height={716}
          priority
          fetchPriority="high"
          sizes="(max-width: 1200px) 100vw, 960px"
          quality={85}
        />
      </div>
    </div>
  );
}
