'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

import { Button } from '@/components/Common/Button';

// 파일명에 공백이 있어서 경로를 직접 사용
const threePhonesImageSrc = '/static/images/Group 7.png';

import Styles from './Main.module.scss';

export default function Main(): JSX.Element {
  return (
    <div className={Styles.Main}>
      <div className={Styles.Main__container}>
        {/* 왼쪽: 텍스트 콘텐츠 */}
        <motion.div
          className={Styles.Main__content}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className={Styles.Main__title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            포기하지 않는 경험
          </motion.div>
          <motion.div
            className={Styles.Main__logo}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            끝공
          </motion.div>
          <motion.div
            className={Styles.Main__introText}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            AI가 매일의 학습 루틴을 설계하고 합격까지 이끌어 드립니다.
          </motion.div>
          <motion.div
            className={Styles.Main__store}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Button type="reservation" text="'끝공' 사전 예약하기" />
          </motion.div>
        </motion.div>

        {/* 오른쪽: 폰 이미지 */}
        <motion.div
          className={Styles.Main__imageWrapper}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div
            className={Styles.Main__phoneImage}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
          >
            <Image
              src={threePhonesImageSrc}
              alt="끝공 앱 화면"
              width={4000}
              height={2400}
              priority
              fetchPriority="high"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 4000px"
              quality={90}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
