'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

import Styles from './WhyFail.module.scss';

const problems = [
  {
    title: '계획 없는 반복',
    description: '똑같이 공부하고, 똑같이 틀립니다.',
  },
  {
    title: '약점 미파악',
    description: '전체 복습으로 시간만 흘러갑니다.',
  },
  {
    title: '루틴 이탈',
    description: '무너지면 처음부터 다시 시작합니다.',
  },
];

export default function WhyFail(): JSX.Element {
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
      className={Styles.WhyFail}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <motion.div
        className={Styles.WhyFail__title}
        variants={itemVariants}
      >
        왜 대부분 실패할까?
      </motion.div>

      <div className={Styles.WhyFail__cards}>
        {problems.map((problem, index) => (
          <motion.div
            key={index}
            className={Styles.WhyFail__card}
            variants={itemVariants}
            whileHover={{ y: -10, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <div className={Styles.WhyFail__card__number}>
              {String(index + 1).padStart(2, '0')}
            </div>
            <div className={Styles.WhyFail__card__icon}>
              {index === 0 && '🔄'}
              {index === 1 && '❌'}
              {index === 2 && '💔'}
            </div>
            <div className={Styles.WhyFail__card__title}>{problem.title}</div>
            <div className={Styles.WhyFail__card__description}>
              {problem.description}
            </div>
            <div className={Styles.WhyFail__card__accent} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

