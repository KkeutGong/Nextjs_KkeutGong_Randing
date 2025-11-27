'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';

import Styles from './Statistics.module.scss';

const TARGET_CHALLENGE = 2317887;
const TARGET_PASS = 750499;

export default function Statistics(): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const challengeValue = useSpring(0, { stiffness: 150, damping: 25 });
  const passValue = useSpring(0, { stiffness: 150, damping: 25 });

  const challengeDisplay = useTransform(challengeValue, (value) =>
    Math.floor(value).toLocaleString(),
  );
  const passDisplay = useTransform(passValue, (value) =>
    Math.floor(value).toLocaleString(),
  );

  useEffect(() => {
    if (isInView) {
      challengeValue.set(TARGET_CHALLENGE);
      passValue.set(TARGET_PASS);
    }
  }, [isInView, challengeValue, passValue]);

  return (
    <motion.div
      ref={ref}
      className={Styles.Statistics}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className={Styles.Statistics__title}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className={Styles.Statistics__title__challenge}>
          1년에{' '}
          <motion.span className={Styles.Statistics__title__number}>
            {challengeDisplay}
          </motion.span>
          명 도전
        </div>
        <div className={Styles.Statistics__title__pass}>
          합격은{' '}
          <motion.span className={Styles.Statistics__title__number}>
            {passDisplay}
          </motion.span>
          명뿐
        </div>
      </motion.div>

      <motion.div
        className={Styles.Statistics__description}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div>3명 중 2명은 실패합니다.</div>
        <div>이유는 하나.</div>
        <div>방향이 없습니다.</div>
      </motion.div>
    </motion.div>
  );
}
