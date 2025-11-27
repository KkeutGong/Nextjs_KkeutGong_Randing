'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

import { Button } from '@/components/Common/Button';

import mockupLgSrc from '../../../public/static/images/mockup-main-lg.webp';

import Styles from './Main.module.scss';

export default function Main(): JSX.Element {
  return (
    <div className={Styles.Main}>
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
      <div className={Styles.Main__image}>
        <Image
          src={mockupLgSrc}
          alt="havit mockup main"
          width={1145}
          height={716}
          priority
          fetchPriority="high"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 960px"
          quality={90}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
      </div>
    </div>
  );
}
