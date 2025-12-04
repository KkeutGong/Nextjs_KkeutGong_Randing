'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

import mockupLgSrc from '../../../public/static/images/mockup-content-list-pc.webp';

import Styles from './DetailContent.module.scss';

export default function DetailContent(): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div ref={ref} className={Styles.DetailContent}>
      <div className={Styles.DetailContent__mainWrapper}>
        <motion.div
          className={Styles.DetailContent__mainWrapper__mainImage}
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <Image
            src={mockupLgSrc}
            alt="havit mockup content list"
            width={2240}
            height={2000}
            sizes="(max-width: 1200px) 100vw, 960px"
            quality={85}
          />
        </motion.div>
        <motion.div
          className={Styles.DetailContent__mainWrapper__textWrapper}
        >
          <motion.div
            className={Styles.DetailContent__mainWrapper__title}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span>
              학습 여정이 <br /> 선명하게 보입니다
            </span>
          </motion.div>
          <motion.div
            className={Styles.DetailContent__mainWrapper__detail}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div>내가 준비 중인 자격증,</div>
            <div>지금 어느 단계인지 한눈에 보입니다.</div>
            <div>진행률, 약점, 남은 학습량까지</div>
            <div>합격을 위한 모든 정보가 명확하게 정리됩니다.</div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
