import { NextSeo } from 'next-seo';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Footer } from '@/components/Footer';
import styles from './Reservation.module.scss';

export default function Reservation() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 이메일 전송 API 호출
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: formData.email,
          subject: '[끝공 사전예약] 사전예약 신청',
          name: formData.name,
          phone: formData.phone,
          interest: formData.interest,
          content: formData.message,
          type: 'reservation',
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert('사전예약 신청에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('Error submitting reservation:', error);
      alert('사전예약 신청에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <NextSeo title="사전예약 - 끝공" />
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>사전예약</h1>
          <div className={styles.description}>
            끝공 서비스 출시를 기다려주시는 분들을 위해 사전예약을 받고
            있습니다. 출시 시 우선적으로 알림을 받으실 수 있습니다.
          </div>

          {!submitted ? (
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>
                  이름 <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={styles.input}
                  required
                  placeholder="이름을 입력해주세요"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>
                  이메일 <span className={styles.required}>*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={styles.input}
                  required
                  placeholder="이메일을 입력해주세요"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="phone" className={styles.label}>
                  연락처
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="연락처를 입력해주세요 (선택사항)"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="interest" className={styles.label}>
                  관심 분야
                </label>
                <select
                  id="interest"
                  name="interest"
                  value={formData.interest}
                  onChange={handleChange}
                  className={styles.select}
                >
                  <option value="">선택해주세요</option>
                  <option value="자격증">자격증</option>
                  <option value="학습관리">학습관리</option>
                  <option value="콘텐츠아카이빙">콘텐츠 아카이빙</option>
                  <option value="AI학습">AI 학습</option>
                  <option value="기타">기타</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.label}>
                  메시지
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={styles.textarea}
                  rows={5}
                  placeholder="추가로 전하고 싶은 메시지가 있으시면 입력해주세요 (선택사항)"
                />
              </div>

              <div className={styles.privacyNotice}>
                <p>
                  사전예약 시 제공해주신 정보는 서비스 출시 알림 및 관련 안내
                  목적으로만 사용됩니다.
                </p>
                <p>
                  개인정보 처리방침은{' '}
                  <a href="/privacy" className={styles.link}>
                    여기
                  </a>
                  를 참고해주세요.
                </p>
              </div>

              <button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? '제출 중...' : '사전예약 신청하기'}
              </button>
            </form>
          ) : (
            <div className={styles.successMessage}>
              <h2>사전예약이 완료되었습니다!</h2>
              <p>
                사전예약이 성공적으로 접수되었습니다. 서비스 출시 시{' '}
                {formData.email}로 알림을 보내드리겠습니다.
              </p>
              <p>
                추가 문의사항이 있으시면{' '}
                <a
                  href="mailto:junwon@hyphen.it.com"
                  className={styles.emailLink}
                >
                  junwon@hyphen.it.com
                </a>
                으로 연락주세요.
              </p>
            </div>
          )}

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>사전예약 안내</h2>
            <div className={styles.infoBox}>
              <ul>
                <li>
                  사전예약을 하시면 서비스 출시 시 우선적으로 알림을 받으실 수
                  있습니다.
                </li>
                <li>
                  제공해주신 정보는 서비스 출시 알림 및 관련 안내 목적으로만
                  사용됩니다.
                </li>
                <li>
                  사전예약은 서비스 이용을 보장하는 것이 아니며, 출시 일정은
                  변경될 수 있습니다.
                </li>
                <li>
                  사전예약 취소를 원하시면{' '}
                  <a
                    href="mailto:junwon@hyphen.it.com"
                    className={styles.emailLink}
                  >
                    junwon@hyphen.it.com
                  </a>
                  으로 연락주세요.
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

