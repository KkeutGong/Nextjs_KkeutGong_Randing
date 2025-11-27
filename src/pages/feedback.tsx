import { NextSeo } from 'next-seo';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { Footer } from '@/components/Footer';
import styles from './Feedback.module.scss';

const feedbackSchema = z.object({
  name: z.string().min(2, '이름은 2자 이상 입력해주세요.').max(50, '이름은 50자 이하로 입력해주세요.').optional().or(z.literal('')),
  email: z.string().email('올바른 이메일 주소를 입력해주세요.').optional().or(z.literal('')),
  phone: z.string().regex(/^[0-9-]+$/, '올바른 전화번호 형식을 입력해주세요.').optional().or(z.literal('')),
  category: z.string().optional(),
  message: z.string().min(10, '피드백은 10자 이상 입력해주세요.').max(1000, '피드백은 1000자 이하로 입력해주세요.'),
});

type FeedbackFormData = z.infer<typeof feedbackSchema>;

export default function Feedback() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: FeedbackFormData) => {
    try {
      // 이메일 전송 API 호출
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: data.email || 'junwon@hyphen.it.com',
          subject: '[끝공 피드백] 피드백 접수',
          name: data.name,
          phone: data.phone,
          category: data.category,
          content: data.message,
          type: 'feedback',
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        reset();
        toast.success('피드백이 성공적으로 접수되었습니다!');
      } else {
        toast.error('피드백 제출에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error('피드백 제출에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <>
      <NextSeo title="피드백 - 끝공" />
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>피드백</h1>
          <div className={styles.description}>
            끝공 서비스를 개선하기 위해 여러분의 소중한 의견을 기다리고 있습니다.
            불편사항, 개선 제안, 새로운 기능 아이디어 등 무엇이든 자유롭게 남겨주세요.
          </div>

          {!submitted ? (
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.formSection}>
                <div className={styles.question}>
                  <label htmlFor="category" className={styles.questionLabel}>
                    피드백 유형
                  </label>
                  <select
                    id="category"
                    {...register('category')}
                    className={styles.select}
                  >
                    <option value="">선택해주세요</option>
                    <option value="버그신고">버그 신고</option>
                    <option value="기능제안">기능 제안</option>
                    <option value="개선사항">개선 사항</option>
                    <option value="불편사항">불편 사항</option>
                    <option value="기타">기타</option>
                  </select>
                </div>
              </div>

              <div className={styles.formSection}>
                <div className={styles.question}>
                  <label htmlFor="message" className={styles.questionLabel}>
                    피드백 내용 <span className={styles.required}>*</span>
                  </label>
                  <textarea
                    id="message"
                    {...register('message')}
                    className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
                    rows={8}
                    placeholder="피드백을 자세히 작성해주세요 (최소 10자 이상)"
                  />
                  {errors.message && (
                    <span className={styles.errorMessage}>{errors.message.message}</span>
                  )}
                  <div className={styles.helpText}>
                    구체적인 내용을 작성해주시면 더 나은 서비스 개선에 도움이 됩니다.
                  </div>
                </div>
              </div>

              <div className={styles.formSection}>
                <div className={styles.question}>
                  <label htmlFor="name" className={styles.questionLabel}>
                    이름
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register('name')}
                    className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                    placeholder="이름을 입력해주세요 (선택사항)"
                  />
                  {errors.name && (
                    <span className={styles.errorMessage}>{errors.name.message}</span>
                  )}
                </div>
              </div>

              <div className={styles.formSection}>
                <div className={styles.question}>
                  <label htmlFor="email" className={styles.questionLabel}>
                    이메일
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register('email')}
                    className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                    placeholder="이메일을 입력해주세요 (선택사항)"
                  />
                  {errors.email && (
                    <span className={styles.errorMessage}>{errors.email.message}</span>
                  )}
                  <div className={styles.helpText}>
                    답변을 받으시려면 이메일을 입력해주세요.
                  </div>
                </div>
              </div>

              <div className={styles.formSection}>
                <div className={styles.question}>
                  <label htmlFor="phone" className={styles.questionLabel}>
                    연락처
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    {...register('phone')}
                    className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                    placeholder="연락처를 입력해주세요 (선택사항)"
                  />
                  {errors.phone && (
                    <span className={styles.errorMessage}>{errors.phone.message}</span>
                  )}
                </div>
              </div>

              <div className={styles.formActions}>
                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? '제출 중...' : '피드백 제출하기'}
                </button>
              </div>
            </form>
          ) : (
            <div className={styles.successMessage}>
              <h2>피드백이 접수되었습니다!</h2>
              <p>
                소중한 피드백 감사합니다. 검토 후 개선에 반영하겠습니다.
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
            <h2 className={styles.sectionTitle}>피드백 안내</h2>
            <div className={styles.infoBox}>
              <ul>
                <li>
                  피드백은 검토 후 서비스 개선에 반영됩니다.
                </li>
                <li>
                  이메일을 입력하신 경우, 필요시 답변을 드릴 수 있습니다.
                </li>
                <li>
                  개인정보는 피드백 처리 목적으로만 사용되며, 개인정보 처리방침에 따라 보호됩니다.
                </li>
                <li>
                  개인정보 처리방침은{' '}
                  <a href="/privacy" className={styles.emailLink}>
                    여기
                  </a>
                  를 참고해주세요.
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
