'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

import Styles from './WhyExist.module.scss';

export default function WhyExist(): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
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

  return (
    <motion.div
      ref={ref}
      className={Styles.WhyExist}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <motion.div
        className={Styles.WhyExist__title}
        variants={itemVariants}
      >
        끝공의 존재 이유
      </motion.div>

      <motion.div
        className={Styles.WhyExist__emphasis}
        variants={itemVariants}
      >
        의지가 아니라,
        <br />
        구조가 필요합니다.
      </motion.div>

      <motion.div
        className={Styles.WhyExist__description}
        variants={itemVariants}
      >
        공부를
        <br />
        나만의{' '}
        <span className={Styles.WhyExist__description__flow}>
          '계획 → 분석 → 루틴'
        </span>
        으로
        <br />
        다시 설계합니다.
      </motion.div>

      <motion.div
        className={Styles.WhyExist__flow}
        variants={itemVariants}
      >
        <div className={Styles.WhyExist__flow__item}>계획</div>
        <div className={Styles.WhyExist__flow__arrow}>→</div>
        <div className={Styles.WhyExist__flow__item}>분석</div>
        <div className={Styles.WhyExist__flow__arrow}>→</div>
        <div className={Styles.WhyExist__flow__item}>루틴</div>
      </motion.div>
    </motion.div>
  );
}

