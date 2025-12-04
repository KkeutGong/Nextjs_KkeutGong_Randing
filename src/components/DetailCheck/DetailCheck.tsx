'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

import checkImageLgSrc from '../../../public/static/images/check.webp';

import Styles from './DetailCheck.module.scss';

export default function DetailCheck(): JSX.Element {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      className={Styles.DetailCheck}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className={Styles.DetailCheck__title}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        "끊김 없는 학습, &nbsp;&nbsp;합격을 향한 흐름을 이어갑니다."
      </motion.div>
      <motion.div
        className={Styles.DetailCheck__detail}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div>끊김 없는 하루가 합격의 확률을 높입니다.</div>
        <div>하루하루가 기록된 연속학습일은
        합격을 향한 자신감을 키워냅니다.</div>
      </motion.div>
      <motion.div
        className={Styles.DetailCheck__image}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
        whileHover={{ scale: 1.02 }}
      >
        <Image
          src={checkImageLgSrc}
          alt="havit content check image"
          width={2240}
          height={2000}
          sizes="(max-width: 1200px) 100vw, 960px"
          quality={85}
        />
      </motion.div>
    </motion.div>
  );
}
