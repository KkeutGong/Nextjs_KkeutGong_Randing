import styles from './ProcessingStatus.module.scss';

interface Props {
  step: string;
}

export default function ProcessingStatus({ step }: Props) {
  return (
    <div className={styles.processing}>
      <div className={styles.processing__spinner}>
        <div className={styles.processing__spinnerCircle}></div>
      </div>
      <p className={styles.processing__text}>{step}</p>
      <p className={styles.processing__hint}>
        잠시만 기다려주세요. AI가 PDF를 분석하고 있습니다...
      </p>
    </div>
  );
}

