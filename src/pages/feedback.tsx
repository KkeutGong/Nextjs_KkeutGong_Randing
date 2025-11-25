import { NextSeo } from 'next-seo';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Footer } from '@/components/Footer';
import styles from './Feedback.module.scss';

export default function Feedback() {
  const [formData, setFormData] = useState({
    category: '',
    subject: '',
    content: '',
    email: '',
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
          to: formData.email || 'junwon@hyphen.it.com',
          subject: `[끝공 피드백] ${formData.subject || '피드백 제출'}`,
          category: formData.category,
          content: formData.content,
          type: 'feedback',
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert('피드백 제출에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('피드백 제출에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <NextSeo title="서비스 피드백 - 끝공" />
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>서비스 피드백</h1>
          <div className={styles.description}>
            끝공 서비스를 이용하시면서 불편하셨던 점이나 개선되었으면 하는 점을
            알려주세요. 여러분의 소중한 의견은 더 나은 서비스를 만드는 데 큰
            도움이 됩니다.
          </div>

          {!submitted ? (
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formSection}>
                <div className={styles.question}>
                  <label className={styles.questionLabel}>
                    피드백 유형 <span className={styles.required}>*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={styles.select}
                    required
                  >
                    <option value="">선택해주세요</option>
                    <option value="버그신고">버그 신고</option>
                    <option value="기능제안">기능 제안</option>
                    <option value="UI개선">UI/UX 개선</option>
                    <option value="성능개선">성능 개선</option>
                    <option value="기타">기타</option>
                  </select>
                </div>
              </div>

              <div className={styles.formSection}>
                <div className={styles.question}>
                  <label className={styles.questionLabel}>
                    제목 <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={styles.input}
                    required
                    placeholder="피드백 제목을 입력해주세요"
                  />
                </div>
              </div>

              <div className={styles.formSection}>
                <div className={styles.question}>
                  <label className={styles.questionLabel}>
                    내용 <span className={styles.required}>*</span>
                  </label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    className={styles.textarea}
                    rows={10}
                    required
                    placeholder="피드백 내용을 상세히 입력해주세요"
                  />
                </div>
              </div>

              <div className={styles.formSection}>
                <div className={styles.question}>
                  <label className={styles.questionLabel}>
                    이메일 (답변 받으실 주소)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="이메일을 입력해주세요 (선택사항)"
                  />
                  <div className={styles.helpText}>
                    이메일을 입력하시면 피드백에 대한 답변을 받으실 수 있습니다.
                  </div>
                </div>
              </div>

              <div className={styles.formActions}>
                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? '제출 중...' : '제출하기'}
                </button>
              </div>
            </form>
          ) : (
            <div className={styles.successMessage}>
              <h2>피드백이 제출되었습니다!</h2>
              <p>
                소중한 피드백 감사합니다. 검토 후 우선순위에 따라 개선 작업에
                반영하겠습니다.
              </p>
              {formData.email && (
                <p>
                  답변이 필요하시면 {formData.email}로 안내드리겠습니다.
                </p>
              )}
            </div>
          )}

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>피드백 처리 안내</h2>
            <div className={styles.infoBox}>
              <ul>
                <li>
                  모든 피드백은 검토 후 우선순위에 따라 개선 작업에 반영됩니다.
                </li>
                <li>
                  개인정보가 포함된 피드백의 경우, 개인정보 보호를 위해
                  익명화하여 처리할 수 있습니다.
                </li>
                <li>
                  피드백에 대한 답변은 이메일로 개별 안내드리며, 공통적으로
                  개선된 사항은 공지사항을 통해 안내드립니다.
                </li>
                <li>
                  피드백 제출 후 1-2주 내에 검토 결과를 안내드립니다.
                </li>
                <li>
                  추가 문의사항이 있으시면{' '}
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
