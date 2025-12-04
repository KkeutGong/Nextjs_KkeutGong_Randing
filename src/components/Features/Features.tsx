'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

import Styles from './Features.module.scss';

// 파일명에 공백이 있어서 경로를 직접 사용
const weaknessReviewImageSrc = '/static/images/Group 8.png';
const aiRoutineImageSrc = '/static/images/Group 9.png';
const progressVisualizationImageSrc = '/static/images/Group 11.png';
const notificationScheduleImageSrc = '/static/images/Group 10.png';

const features = [
  {
    title: 'AI 학습 루틴',
    description: '시험 일정과 실력을 기반으로 자동 설계합니다.',
    imageSrc: aiRoutineImageSrc,
    width: 2240,
    height: 2000,
  },
  {
    title: '약점 반복 학습',
    description: '틀리는 부분만 집중해 시간을 아낍니다.',
    imageSrc: weaknessReviewImageSrc,
    width: 2240,
    height: 2000,
  },
  {
    title: '진행률 시각화',
    description: '오늘의 공부와 약점 변화가 한눈에 보입니다.',
    imageSrc: progressVisualizationImageSrc,
    width: 3215,
    height: 2024,
  },
  {
    title: '알림 · 일정 관리',
    description: '루틴이 무너지지 않도록 유지시켜줍니다.',
    imageSrc: notificationScheduleImageSrc,
    width: 3215,
    height: 2024,
  },
];

export default function Features(): JSX.Element {
  const firstPageRef = useRef<HTMLDivElement>(null);
  const secondPageRef = useRef<HTMLDivElement>(null);
  const isFirstPageInView = useInView(firstPageRef, { once: true, amount: 0.2 });
  const isSecondPageInView = useInView(secondPageRef, { once: true, amount: 0.2 });

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

  // 4개 카드를 2개씩 2페이지로 나누기
  const firstPageFeatures = features.slice(0, 2);
  const secondPageFeatures = features.slice(2, 4);

  return (
    <div className={Styles.Features} data-no-snap>
      {/* 첫 번째 페이지: 첫 2개 카드 */}
      <motion.div
        ref={firstPageRef}
        className={Styles.Features__page}
        variants={containerVariants}
        initial="hidden"
        animate={isFirstPageInView ? 'visible' : 'hidden'}
      >
        <motion.div
          className={Styles.Features__title}
          variants={itemVariants}
        >
          끝공은 이렇게 합격을 만듭니다.
        </motion.div>

        <motion.div
          className={Styles.Features__list}
          variants={containerVariants}
        >
          {firstPageFeatures.map((feature, index) => (
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
                  width={feature.width}
                  height={feature.height}
                  style={{ width: '100%', height: 'auto' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
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
        </motion.div>
      </motion.div>

      {/* 두 번째 페이지: 나머지 2개 카드 */}
      <motion.div
        ref={secondPageRef}
        className={Styles.Features__page}
        variants={containerVariants}
        initial="hidden"
        animate={isSecondPageInView ? 'visible' : 'hidden'}
      >
        <motion.div
          className={Styles.Features__list}
          variants={containerVariants}
        >
          {secondPageFeatures.map((feature, index) => (
            <motion.div
              key={index + 2}
              className={Styles.Features__item}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div className={Styles.Features__item__image}>
                <Image
                  src={feature.imageSrc}
                  alt={feature.title}
                  width={feature.width}
                  height={feature.height}
                  style={{ width: '100%', height: 'auto' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
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
        </motion.div>
      </motion.div>
    </div>
  );
}
