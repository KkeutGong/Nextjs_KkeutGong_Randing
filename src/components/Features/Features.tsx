'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

import Styles from './Features.module.scss';

// 플레이스홀더 이미지 - 나중에 실제 이미지로 교체
import mockupContentListPcSrc from '../../../public/static/images/mockup-content-list-pc.webp';

const features = [
  {
    title: 'AI 학습 루틴',
    description: '시험 일정과 실력을 기반으로 자동 설계합니다.',
    imageSrc: mockupContentListPcSrc,
  },
  {
    title: '약점 반복 학습',
    description: '틀리는 부분만 집중해 시간을 아낍니다.',
    imageSrc: mockupContentListPcSrc,
  },
  {
    title: '진행률 시각화',
    description: '오늘의 공부와 약점 변화가 한눈에 보입니다.',
    imageSrc: mockupContentListPcSrc,
  },
  {
    title: '알림 · 일정 관리',
    description: '루틴이 무너지지 않도록 유지시켜줍니다.',
    imageSrc: mockupContentListPcSrc,
  },
];

export default function Features(): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

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

  return (
    <motion.div
      ref={ref}
      className={Styles.Features}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <motion.div
        className={Styles.Features__title}
        variants={itemVariants}
      >
        끝공은 이렇게 합격을 만듭니다.
      </motion.div>

      <div className={Styles.Features__list}>
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className={Styles.Features__item}
            variants={itemVariants}
            whileHover={{ y: -5 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <div className={Styles.Features__item__image}>
              <Image
                src={feature.imageSrc}
                alt={feature.title}
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
            <div className={Styles.Features__item__content}>
              <div className={Styles.Features__item__title}>{feature.title}</div>
              <div className={Styles.Features__item__description}>
                {feature.description}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
