import { NextSeo } from 'next-seo';
import { Footer } from '@/components/Footer';
import styles from './Privacy.module.scss';

export default function Privacy() {
  return (
    <>
      <NextSeo title="개인정보 처리방침 - 끝공" />
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>개인정보 처리방침</h1>
          <div className={styles.subtitle}>
            끝공(KKEUTGONG) 개인정보 처리방침
          </div>
          <div className={styles.description}>
            끝공(KKEUTGONG)은 개인정보보호법에 따라 이용자의 개인정보 보호 및
            권익을 보호하고, 관련한 고충을 원활하게 처리할 수 있도록 다음과
            같은 처리방침을 두고 있습니다.
          </div>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>1. 개인정보의 처리 목적</h2>
            <p className={styles.paragraph}>
              끝공은 다음의 목적을 위하여 개인정보를 처리합니다. 처리 중인
              개인정보는 아래 목적 이외의 용도로는 이용되지 않으며, 이용 목적이
              변경될 경우 「개인정보 보호법」 제18조에 따라 별도의 동의를 받는
              등 필요한 조치를 이행합니다.
            </p>
            <div className={styles.list}>
              <div className={styles.listItem}>
                <strong>가. 회원가입 및 관리</strong>
                <p>
                  회원 가입 의사 확인, 회원제 서비스 제공을 위한 본인
                  식별·인증, 회원 자격 유지·관리, 서비스 부정 이용 방지, 각종
                  고지·통지를 위해 개인정보를 처리합니다.
                </p>
              </div>
              <div className={styles.listItem}>
                <strong>나. 민원사무 처리</strong>
                <p>
                  민원인의 신원 확인, 민원사항 확인, 사실조사를 위한
                  연락·통지, 처리결과 안내 등을 위하여 개인정보를 처리합니다.
                </p>
              </div>
              <div className={styles.listItem}>
                <strong>다. 서비스 제공</strong>
                <p>
                  학습 서비스 제공, 콘텐츠 제공, 맞춤형 학습 커리큘럼 제공 등을
                  위해 개인정보를 처리합니다.
                </p>
              </div>
              <div className={styles.listItem}>
                <strong>라. 마케팅 및 광고 활용</strong>
                <p>
                  이벤트 및 광고성 정보 제공, 이용자의 서비스 이용 통계 분석
                  등을 위해 개인정보를 처리합니다.
                </p>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              2. 개인정보의 처리 및 보유 기간
            </h2>
            <div className={styles.listItem}>
              <strong>가.</strong>
              <p>
                끝공은 법령에 따른 개인정보 보유·이용 기간 또는 정보주체로부터
                동의받은 기간 내에서 개인정보를 처리·보유합니다.
              </p>
            </div>
            <div className={styles.listItem}>
              <strong>나. 보유 기간</strong>
              <div className={styles.subList}>
                <p>
                  <strong>&lt;회원가입 및 관리&gt;</strong>
                </p>
                <ul>
                  <li>
                    개인정보는 회원 가입 동의일로부터 서비스 회원 탈퇴 후 30일까지
                    보유·이용합니다.
                  </li>
                  <li>보유 기간: 탈퇴 시점으로부터 30일</li>
                </ul>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              3. 정보주체와 법정대리인의 권리·의무 및 행사방법
            </h2>
            <div className={styles.list}>
              <div className={styles.listItem}>
                <strong>가.</strong>
                <p>
                  정보주체는 언제든지 끝공에 대해 개인정보 열람·정정·삭제·처리정지
                  요구 등의 권리를 행사할 수 있습니다.
                </p>
              </div>
              <div className={styles.listItem}>
                <strong>나.</strong>
                <p>
                  위 권리 행사는 개인정보보호법 시행령 제41조제1항에 따라
                  서면, 이메일 등으로 신청할 수 있으며, 끝공은 지체 없이
                  조치합니다.
                </p>
              </div>
              <div className={styles.listItem}>
                <strong>다.</strong>
                <p>
                  법정대리인이나 위임을 받은 자를 통해서도 권리 행사가 가능하며,
                  이 경우 별지 제11호 서식에 따른 위임장을 제출해야 합니다.
                </p>
              </div>
              <div className={styles.listItem}>
                <strong>라.</strong>
                <p>
                  개인정보 열람 및 처리정지는 법 제35조 제4항, 제37조 제2항에
                  따라 제한될 수 있습니다.
                </p>
              </div>
              <div className={styles.listItem}>
                <strong>마.</strong>
                <p>
                  다른 법령에서 수집이 명시된 개인정보의 경우 삭제를 요구할 수
                  없습니다.
                </p>
              </div>
              <div className={styles.listItem}>
                <strong>바.</strong>
                <p>
                  끝공은 요청자가 본인 또는 정당한 대리인인지 확인합니다.
                </p>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              4. 처리하는 개인정보 항목
            </h2>
            <p className={styles.paragraph}>
              끝공은 원활한 서비스 제공을 위해 다음의 개인정보를 수집·처리합니다.
            </p>
            <div className={styles.listItem}>
              <strong>&lt;서비스 제공 및 회원 관리&gt;</strong>
              <ul>
                <li>
                  필수항목: 소셜 로그인 정보, 이메일, 비밀번호, 로그인 ID, 이름,
                  서비스 이용 기록, 방문 일시, 불량 이용 기록
                </li>
              </ul>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>5. 개인정보의 파기</h2>
            <div className={styles.list}>
              <div className={styles.listItem}>
                <strong>가.</strong>
                <p>
                  보유 기간 경과 또는 처리 목적 달성 등 개인정보가 불필요하게
                  된 경우 지체 없이 파기합니다.
                </p>
              </div>
              <div className={styles.listItem}>
                <strong>나.</strong>
                <p>
                  법령에 따라 계속 보존해야 할 경우, 별도의 DB로 분리 보관합니다.
                </p>
              </div>
              <div className={styles.listItem}>
                <strong>다. 파기 절차 및 방법</strong>
                <ul>
                  <li>
                    파기 사유 발생 시 개인정보를 선정하고, 개인정보 보호책임자의
                    승인 후 파기합니다.
                  </li>
                  <li>전자 파일: 복구 불가능한 기술적 방법으로 파기</li>
                  <li>종이 자료: 분쇄 또는 소각</li>
                </ul>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              6. 개인정보의 안전성 확보 조치
            </h2>
            <p className={styles.paragraph}>
              끝공은 개인정보 보호를 위해 다음과 같은 조치를 취하고 있습니다.
            </p>
            <div className={styles.list}>
              <div className={styles.listItem}>
                <strong>가. 접근 제한</strong>
                <p>
                  DB 접근 권한 관리, 외부 침입 차단 시스템 운용 등 개인정보
                  접근 통제 조치 시행
                </p>
              </div>
              <div className={styles.listItem}>
                <strong>나. 물리적 접근 통제</strong>
                <p>
                  개인정보 보관 장소에 대한 출입 통제 절차 운영
                </p>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              7. 개인정보 자동 수집 장치의 설치·운영 및 거부 관련 사항
            </h2>
            <p className={styles.paragraph}>
              끝공은 이용자 정보를 저장하고 불러오는 쿠키(cookie)를 사용하지
              않습니다.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>8. 개인정보 보호책임자</h2>
            <p className={styles.paragraph}>
              끝공은 개인정보 처리와 관련된 업무를 총괄하며, 정보주체의 불만
              처리 및 피해 구제를 담당하는 개인정보 보호책임자를 다음과 같이
              지정하고 있습니다.
            </p>
            <div className={styles.contactBox}>
              <strong>&lt;개인정보 보호책임자&gt;</strong>
              <ul>
                <li>성명: 박준원</li>
                <li>직책: CEO</li>
                <li>이메일: junwon@hyphen.it.com</li>
              </ul>
              <p className={styles.note}>
                ※ 개인정보 관련 문의는 위 이메일로 접수할 수 있습니다.
              </p>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    </>
  );
}

