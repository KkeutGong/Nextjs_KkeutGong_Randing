import { useState } from 'react';
import classNames from 'classnames';

import ConceptCards from './ConceptCards';
import Questions from './Questions';

import styles from './ResultsDisplay.module.scss';
import type { ProcessingResult } from '@/pages/dashboard';

interface Props {
  results: ProcessingResult;
}

export default function ResultsDisplay({ results }: Props) {
  const [activeTab, setActiveTab] = useState<'concepts' | 'questions'>('concepts');

  return (
    <div className={styles.results}>
      <div className={styles.results__header}>
        <h2 className={styles.results__title}>처리 결과</h2>
        <div className={styles.results__tabs}>
          <button
            type="button"
            className={classNames(styles.results__tab, {
              [styles['results__tab--active']]: activeTab === 'concepts',
            })}
            onClick={() => setActiveTab('concepts')}
          >
            개념카드 ({results.concepts?.length || 0})
          </button>
          <button
            type="button"
            className={classNames(styles.results__tab, {
              [styles['results__tab--active']]: activeTab === 'questions',
            })}
            onClick={() => setActiveTab('questions')}
          >
            문제 ({results.questions?.length || 0})
          </button>
        </div>
      </div>

      <div className={styles.results__content}>
        {activeTab === 'concepts' && results.concepts && (
          <ConceptCards concepts={results.concepts} />
        )}
        {activeTab === 'questions' && results.questions && (
          <Questions questions={results.questions} />
        )}
      </div>
    </div>
  );
}

