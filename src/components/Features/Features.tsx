'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

import Styles from './Features.module.scss';

// Images
const weaknessReviewImageSrc = '/static/images/Group 8.png';
const aiRoutineImageSrc = '/static/images/Group 9.png';
const progressVisualizationImageSrc = '/static/images/Group 11.png';
const notificationScheduleImageSrc = '/static/images/Group 10.png';

const features = [
  {
    title: '시험일 맞춤 커리큘럼',
    description: '목표 시험일까지 남은 기간을 계산해 매일 최적의 학습량을 설계합니다.',
    imageSrc: aiRoutineImageSrc,
  },
  {
    title: '핵심 개념 자동 생성',
    description: '기출문제를 분석해 내가 모르는 개념만 쏙쏙 뽑아 정리해줍니다.',
    imageSrc: weaknessReviewImageSrc,
  },
  {
    title: '학습 데이터 시각화',
    description: '나의 약점과 합격 확률 변화를 데이터로 한눈에 보여줍니다.',
    imageSrc: progressVisualizationImageSrc,
  },
  {
    title: 'Bandit 알고리즘 알림',
    description: '나의 행동 패턴을 분석해 가장 효과적인 시간에 학습을 유도합니다.',
    imageSrc: notificationScheduleImageSrc,
  },
];

export default function Features(): JSX.Element {
  const [activeIndex, setActiveIndex] = useState(0);

  // Use Intersection Observer for each text section
  // Note: In a real "sticky" setup, we might simply track scroll position or use multiple observers.
  // Here we will use a ref for each section and update activeIndex.

  return (
    <div className={Styles.Features} data-no-snap="true">
      <div className={Styles.Features__intro}>
        <motion.h2
          className={Styles.Features__title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          끝공은 이렇게
          <br />
          합격을 만듭니다.
        </motion.h2>
      </div>

      <div className={Styles.Features__stickyWrapper}>
        {/* Sticky Image Container */}
        <div className={Styles.Features__stickyContainer}>
          <div className={Styles.Features__phoneFrame}>
            {features.map((feature, index) => (
              <div
                key={`img-${index}`}
                className={`${Styles.Features__image} ${activeIndex === index ? Styles.active : Styles.inactive}`}
              >
                <Image
                  src={feature.imageSrc}
                  alt={feature.title}
                  fill
                  style={{ objectFit: 'contain' }} // Ensure full image is visible
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Content */}
        <div className={Styles.Features__scrollContent}>
          {features.map((feature, index) => (
            <FeatureTextSection
              key={`txt-${index}`}
              feature={feature}
              index={index}
              setActive={setActiveIndex}
              isActive={activeIndex === index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function FeatureTextSection({ feature, index, setActive, isActive }: any) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" }); // Center trigger

  useEffect(() => {
    if (isInView) {
      setActive(index);
    }
  }, [isInView, index, setActive]);

  return (
    <div
      ref={ref}
      className={`${Styles.Features__textSection} ${isActive ? Styles.active : ''}`}
    >
      <div className={Styles.Features__textSection__num}>
        {String(index + 1).padStart(2, '0')}
      </div>
      <h3 className={Styles.Features__textSection__heading}>
        {feature.title}
      </h3>
      <p className={Styles.Features__textSection__desc}>
        {feature.description}
      </p>
    </div>
  );
}
