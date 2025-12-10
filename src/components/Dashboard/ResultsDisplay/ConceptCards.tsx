import { useState } from 'react';

import styles from './ConceptCards.module.scss';

interface Concept {
  concept_id?: string;
  text: string;
  keyword: string;
  category?: string;
}

interface Props {
  concepts: Concept[];
}

export default function ConceptCards({ concepts }: Props) {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  return (
    <div className={styles.conceptCards}>
      <div className={styles.conceptCards__grid}>
        {concepts.map((concept, index) => (
          <div
            key={concept.concept_id || index}
            className={styles.conceptCard}
            onClick={() => setFlippedIndex(flippedIndex === index ? null : index)}
          >
            <div
              className={`${styles.conceptCard__inner} ${
                flippedIndex === index ? styles['conceptCard__inner--flipped'] : ''
              }`}
            >
              <div className={styles.conceptCard__front}>
                <div className={styles.conceptCard__text}>{concept.text}</div>
                <div className={styles.conceptCard__hint}>클릭하여 키워드 보기</div>
              </div>
              <div className={styles.conceptCard__back}>
                <div className={styles.conceptCard__keyword}>{concept.keyword}</div>
                {concept.category && (
                  <div className={styles.conceptCard__category}>{concept.category}</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

