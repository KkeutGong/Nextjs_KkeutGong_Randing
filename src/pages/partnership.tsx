import { NextSeo } from 'next-seo';
import { Footer } from '@/components/Footer';
import styles from './Partnership.module.scss';

export default function Partnership() {
  return (
    <>
      <NextSeo title="제휴 및 광고 문의 - 끝공" />
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>제휴 및 광고 문의</h1>
          <div className={styles.description}>
            끝공과 함께 성장하고 싶은 파트너를 찾고 있습니다. 다양한 제휴 및
            광고 기회를 통해 함께 가치를 만들어가요.
          </div>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>제휴 문의</h2>
            <div className={styles.list}>
              <div className={styles.listItem}>
                <strong>콘텐츠 제휴</strong>
                <p>
                  학습 콘텐츠, 교육 자료, 자격증 관련 콘텐츠를 제공하시는
                  파트너를 찾고 있습니다. 양질의 콘텐츠로 끝공 사용자들에게 더
                  나은 학습 경험을 제공해주세요.
                </p>
              </div>
              <div className={styles.listItem}>
                <strong>기술 제휴</strong>
                <p>
                  AI 기술, 학습 분석 도구, 플랫폼 통합 등 기술적 협력을 통해
                  서비스를 함께 발전시켜 나가고 싶습니다.
                </p>
              </div>
              <div className={styles.listItem}>
                <strong>마케팅 제휴</strong>
                <p>
                  상호 홍보, 이벤트 협업, 크로스 프로모션 등을 통해 함께
                  성장할 수 있는 마케팅 파트너를 모집합니다.
                </p>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>광고 문의</h2>
            <div className={styles.list}>
              <div className={styles.listItem}>
                <strong>앱 내 광고</strong>
                <p>
                  끝공 앱 내에서 타겟팅된 광고를 통해 적합한 사용자들에게
                  브랜드를 알릴 수 있습니다.
                </p>
              </div>
              <div className={styles.listItem}>
                <strong>랜딩 페이지 광고</strong>
                <p>
                  끝공 랜딩 페이지에서 브랜드 노출 및 링크를 통한 트래픽 유도가
                  가능합니다.
                </p>
              </div>
              <div className={styles.listItem}>
                <strong>협찬 콘텐츠</strong>
                <p>
                  교육 관련 제품, 서비스, 이벤트 등의 협찬 콘텐츠를 통해
                  사용자들에게 유용한 정보를 제공할 수 있습니다.
                </p>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>문의 방법</h2>
            <div className={styles.contactBox}>
              <div className={styles.contactItem}>
                <strong>이메일</strong>
                <a
                  href="mailto:junwon@hyphen.it.com"
                  className={styles.emailLink}
                >
                  junwon@hyphen.it.com
                </a>
              </div>
              <div className={styles.contactItem}>
                <strong>문의 시 포함 사항</strong>
                <ul>
                  <li>회사/기관명 및 담당자 정보</li>
                  <li>제휴/광고 유형 및 목적</li>
                  <li>제안 내용 및 기대 효과</li>
                  <li>예상 일정 및 예산 범위</li>
                </ul>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>처리 안내</h2>
            <div className={styles.infoBox}>
              <ul>
                <li>
                  제휴 및 광고 문의는 검토 후 1-2주 내에 답변드립니다.
                </li>
                <li>
                  제안 내용에 따라 추가 자료 요청 또는 미팅 일정 조율이 있을
                  수 있습니다.
                </li>
                <li>
                  끝공의 서비스 정책 및 사용자 경험에 부합하지 않는 제안은
                  거절될 수 있습니다.
                </li>
                <li>
                  개인정보 보호 및 사용자 경험을 최우선으로 고려하여 제휴 및
                  광고를 진행합니다.
                </li>
              </ul>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    </>
  );
}

