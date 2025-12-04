'use client';

import { LINK_LIST } from '@/constants/objects/link';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

import { Line } from '@/components/Common/Line';

import Styles from './Footer.module.scss';

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
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
      className={Styles.Footer}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <motion.div
        className={Styles.Footer__linkWrapper}
        variants={containerVariants}
      >
        <motion.a
          href={LINK_LIST['feedback']}
          variants={itemVariants}
          whileHover={{ scale: 1.05, color: '#4169E1' }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          서비스 피드백
        </motion.a>
        <motion.a
          href={LINK_LIST['policy']}
          variants={itemVariants}
          whileHover={{ scale: 1.05, color: '#4169E1' }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          개인정보 처리방침
        </motion.a>
        <motion.a
          href={LINK_LIST['partnership']}
          variants={itemVariants}
          whileHover={{ scale: 1.05, color: '#4169E1' }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          제휴 및 광고 문의
        </motion.a>
      </motion.div>
      <motion.div
        variants={itemVariants}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.5 }}
        style={{ originX: 0.5 }}
      >
        <Line classname={Styles.Footer__line} direction="row" />
      </motion.div>
      <motion.div
        className={Styles.Footer__email}
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
      >
        junwon@hyphen.it.com
      </motion.div>
      <motion.div
        className={Styles.Footer__copyright}
        variants={itemVariants}
      >
        Copyright 끝공(KKEUTGONG) All rights reserved
      </motion.div>
    </motion.div>
  );
}
