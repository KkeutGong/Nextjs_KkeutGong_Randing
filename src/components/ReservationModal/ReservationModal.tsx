'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import styles from './ReservationModal.module.scss';

const CERTIFICATION_OPTIONS = [
  '컴퓨터활용능력 1급',
  '컴퓨터활용능력 2급',
  '한국사능력검정시험',
  '정보처리기능사',
  '정보처리산업기사',
  'SQLD (SQL 개발자)',
  'SQLP (SQL 전문가)',
  '리눅스 마스터',
  '네트워크 관리사',
  '빅데이터분석기사',
  '데이터분석준전문가(ADsP)',
  '기타',
];

const reservationSchema = z.object({
  name: z.string().min(2, '이름은 2자 이상 입력해주세요.').max(50, '이름은 50자 이하로 입력해주세요.'),
  email: z.string().email('올바른 이메일 주소를 입력해주세요.'),
  phone: z.string().regex(/^[0-9-]+$/, '올바른 전화번호 형식을 입력해주세요.').optional().or(z.literal('')),
  certification: z.array(z.string()).optional(),
  interest: z.string().optional(),
  message: z.string().max(500, '메시지는 500자 이하로 입력해주세요.').optional().or(z.literal('')),
});

type ReservationFormData = z.infer<typeof reservationSchema>;

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReservationModal({ isOpen, onClose }: ReservationModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [selectedCertifications, setSelectedCertifications] = useState<string[]>([]);
  const [otherCertification, setOtherCertification] = useState('');
  const isOtherSelected = selectedCertifications.some((cert) => cert === '기타' || cert.startsWith('기타:'));

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
    mode: 'onBlur',
    defaultValues: {
      certification: [],
    },
  });

  const handleCertificationChange = (certification: string, checked: boolean) => {
    let updatedCertifications: string[];

    if (certification === '기타') {
      if (checked) {
        updatedCertifications = selectedCertifications.filter((cert) => !cert.startsWith('기타'));
        const existingOther = selectedCertifications.find((cert) => cert.startsWith('기타:'));
        if (existingOther) {
          const existingValue = existingOther.replace('기타: ', '');
          setOtherCertification(existingValue);
        }
        updatedCertifications.push('기타');
      } else {
        updatedCertifications = selectedCertifications.filter((cert) => !cert.startsWith('기타'));
        setOtherCertification('');
      }
    } else {
      if (checked) {
        updatedCertifications = [...selectedCertifications, certification];
      } else {
        updatedCertifications = selectedCertifications.filter((cert) => cert !== certification);
      }
    }

    setSelectedCertifications(updatedCertifications);
    updateCertificationValue(updatedCertifications);
  };

  const updateCertificationValue = (certs: string[]) => {
    const finalCerts = [...certs];

    const otherIndex = finalCerts.findIndex((cert) => cert === '기타' || cert.startsWith('기타:'));
    if (otherIndex !== -1) {
      if (otherCertification.trim()) {
        finalCerts[otherIndex] = `기타: ${otherCertification.trim()}`;
      } else {
        finalCerts[otherIndex] = '기타';
      }
    }

    setValue('certification', finalCerts, { shouldValidate: true });
  };

  const handleOtherCertificationChange = (value: string) => {
    setOtherCertification(value);
    if (isOtherSelected) {
      updateCertificationValue(selectedCertifications);
    }
  };

  const onSubmit = async (data: ReservationFormData) => {
    try {
      // 사전예약 저장 API 호출
      const saveResponse = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          certification: data.certification,
          interest: data.interest,
          message: data.message,
        }),
      });

      if (!saveResponse.ok) {
        throw new Error('사전예약 저장에 실패했습니다.');
      }

      // 이메일 전송 API 호출
      const emailResponse = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: data.email,
          subject: '[끝공 사전예약] 사전예약 신청',
          name: data.name,
          phone: data.phone,
          certification: data.certification,
          interest: data.interest,
          content: data.message,
          type: 'reservation',
        }),
      });

      if (emailResponse.ok) {
        setSubmitted(true);
        setSelectedCertifications([]);
        setOtherCertification('');
        reset({
          name: '',
          email: '',
          phone: '',
          certification: [],
          interest: '',
          message: '',
        });
        toast.success('사전예약이 성공적으로 접수되었습니다!');
      } else {
        // 저장은 성공했지만 이메일 전송 실패
        toast.success('사전예약이 접수되었습니다. (이메일 전송에 실패했습니다.)');
      }
    } catch (error) {
      console.error('Error submitting reservation:', error);
      toast.error('사전예약 신청에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setSubmitted(false);
      setSelectedCertifications([]);
      setOtherCertification('');
      reset({
        name: '',
        email: '',
        phone: '',
        certification: [],
        interest: '',
        message: '',
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={handleClose} disabled={isSubmitting}>
          ×
        </button>

        {!submitted ? (
          <>
            <h2 className={styles.title}>사전예약</h2>
            <div className={styles.description}>
              <p>끝공 서비스 출시를 기다려주시는 분들을 위해 사전예약을 받고 있습니다.</p>
              <p>출시 시 우선적으로 알림을 받으실 수 있습니다.</p>
            </div>

            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>
                  이름 <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  {...register('name')}
                  className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                  placeholder="이름을 입력해주세요"
                />
                {errors.name && (
                  <span className={styles.errorMessage}>{errors.name.message}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>
                  이메일 <span className={styles.required}>*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  {...register('email')}
                  className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                  placeholder="이메일을 입력해주세요"
                />
                {errors.email && (
                  <span className={styles.errorMessage}>{errors.email.message}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="phone" className={styles.label}>
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

              <div className={styles.formGroup}>
                <label className={styles.label}>
                  준비 중인 자격증 (중복 선택 가능)
                </label>
                <div className={styles.checkboxGroup}>
                  {CERTIFICATION_OPTIONS.map((certification) => {
                    const isOther = certification === '기타';
                    let isSelected: boolean;

                    if (isOther) {
                      isSelected = isOtherSelected;
                    } else {
                      isSelected = selectedCertifications.includes(certification);
                    }

                    return (
                      <div key={certification} className={isOther ? styles.otherCertificationWrapper : ''}>
                        <label className={styles.checkboxLabel}>
                          <input
                            type="checkbox"
                            value={certification}
                            checked={isSelected}
                            onChange={(e) =>
                              handleCertificationChange(certification, e.target.checked)
                            }
                            className={styles.checkbox}
                          />
                          <span className={styles.checkboxText}>{certification}</span>
                        </label>
                        {isOther && isOtherSelected && (
                          <div className={styles.otherInputWrapper}>
                            <input
                              type="text"
                              value={otherCertification}
                              onChange={(e) => handleOtherCertificationChange(e.target.value)}
                              placeholder="자격증명을 입력해주세요"
                              className={styles.otherInput}
                              maxLength={50}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                <input type="hidden" {...register('certification')} />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="interest" className={styles.label}>
                  관심 분야
                </label>
                <select
                  id="interest"
                  {...register('interest')}
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
                  {...register('message')}
                  className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
                  rows={5}
                  placeholder="추가로 전하고 싶은 메시지가 있으시면 입력해주세요 (선택사항)"
                />
                {errors.message && (
                  <span className={styles.errorMessage}>{errors.message.message}</span>
                )}
              </div>

              <div className={styles.privacyNotice}>
                <p>
                  사전예약 시 제공해주신 정보는 서비스 출시 알림 및 관련 안내
                  목적으로만 사용됩니다.
                </p>
                <p>
                  개인정보 처리방침은{' '}
                  <a href="/privacy" className={styles.link} target="_blank" rel="noreferrer">
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
          </>
        ) : (
          <div className={styles.successMessage}>
            <h2>사전예약이 완료되었습니다!</h2>
            <p>
              사전예약이 성공적으로 접수되었습니다. 서비스 출시 시 알림을 보내드리겠습니다.
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
            <button onClick={handleClose} className={styles.closeSuccessButton}>
              닫기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


