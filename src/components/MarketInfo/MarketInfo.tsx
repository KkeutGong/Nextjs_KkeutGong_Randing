'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';

import Styles from './MarketInfo.module.scss';

const TARGET_QUALIFICATIONS = 548;
const TARGET_RATE = 32;

export default function MarketInfo(): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const qualificationsValue = useSpring(0, { stiffness: 150, damping: 25 });
  const rateValue = useSpring(0, { stiffness: 150, damping: 25 });

  const qualificationsDisplay = useTransform(qualificationsValue, (value) =>
    Math.floor(value),
  );
  const rateDisplay = useTransform(rateValue, (value) => Math.floor(value));

  useEffect(() => {
    if (isInView) {
      qualificationsValue.set(TARGET_QUALIFICATIONS);
      rateValue.set(TARGET_RATE);
    }
  }, [isInView, qualificationsValue, rateValue]);

  return (
    <motion.div
      ref={ref}
      className={Styles.MarketInfo}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className={Styles.MarketInfo__title}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        자격증 경쟁은 점점 치열해지고 있습니다.
      </motion.div>

      <div className={Styles.MarketInfo__stats}>
        <motion.div
          className={Styles.MarketInfo__stat}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className={Styles.MarketInfo__stat__number}>
            <motion.span>{qualificationsDisplay}</motion.span>개
          </div>
          <div className={Styles.MarketInfo__stat__label}>
            국가기술자격 종목 수
          </div>
        </motion.div>

        <motion.div
          className={Styles.MarketInfo__stat}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className={Styles.MarketInfo__stat__number}>
            약 <motion.span>{rateDisplay}</motion.span>%
          </div>
          <div className={Styles.MarketInfo__stat__label}>
            2024년 자격시험 합격률
          </div>
          <div className={Styles.MarketInfo__stat__source}>
            (응시 2,274,368명 / 취득 750,499명)
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
