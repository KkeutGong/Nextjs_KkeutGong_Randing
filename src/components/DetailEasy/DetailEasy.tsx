'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

import onboardingSrc from '../../../public/static/images/onboarding.webp';

import Styles from './DetailEasy.module.scss';

export default function DetailEasy(): JSX.Element {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9, x: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={Styles.DetailEasy}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <motion.div
        className={Styles.DetailEasy__textWrapper}
        variants={containerVariants}
      >
        <motion.div
          className={Styles.DetailEasy__textWrapper__title}
          variants={itemVariants}
        >
          <div>어디서든</div>
          <div>끝공과 함께라면</div>
        </motion.div>
        <motion.div
          className={Styles.DetailEasy__textWrapper__detail}
          variants={itemVariants}
        >
          <div>어디서 공부하든, 자격증 준비는 끝공이 끝까지 이끌어드립니다.</div>
          <div className={Styles['DetailEasy__textWrapper__detail--strong']}>
            흩어진 시간 속에서도 합격에 필요한 루틴을
          </div>
          <div className={Styles['DetailEasy__textWrapper__detail--strong']}>
            AI가 설계하고 이끌어갑니다.
          </div>
        </motion.div>
      </motion.div>
      <motion.div
        className={Styles.DetailEasy__imageWrapper}
        variants={imageVariants}
      >
        <motion.div
          className={Styles.DetailEasy__imageWrapper__image}
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <Image
            src={onboardingSrc}
            alt="onboarding image"
            width={2240}
            height={2000}
            sizes="(max-width: 1200px) 100vw, 960px"
            quality={85}
            priority
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}




