'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

import { Button } from '@/components/Common/Button';

import mockupLgSrc from '../../../public/static/images/mockup-phone-lg.webp';

import Styles from './TimeToHavit.module.scss';

export default function TimeToHavit(): JSX.Element {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      className={Styles.TimeToHavit}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className={Styles.TimeToHavit__image}
        initial={{ opacity: 0, y: 50, rotateY: -15 }}
        animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
        transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
        whileHover={{ 
          scale: 1.05,
          rotateY: 5,
          transition: { type: 'spring', stiffness: 300, damping: 20 }
        }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <Image
          src={mockupLgSrc}
          alt="mockup phone"
          style={{ width: '100%', height: 'auto' }}
        />
      </motion.div>
      <motion.div
        className={Styles.TimeToHavit__subtitle}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div>여러분의 노력에</div>
        <div>방향을 더할 시간!</div>
      </motion.div>
      <motion.div
        className={Styles.TimeToHavit__detail}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div>자격증 합격 미리 축하드립니다.</div>
      </motion.div>
      <motion.div
        className={Styles.TimeToHavit__store}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.7 }}
      >
        <Button type="reservation" text="사전 예약하기" />
      </motion.div>
    </motion.div>
  );
}
