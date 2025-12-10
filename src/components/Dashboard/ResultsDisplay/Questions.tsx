import { useState } from 'react';

import styles from './Questions.module.scss';

interface QuestionChoice {
  number: number;
  text: string;
}

interface Question {
  question_id?: string;
  text: string;
  choices: QuestionChoice[];
  correct_answer: number;
  explanation: string;
  difficulty?: string;
}

interface Props {
  questions: Question[];
}

export default function Questions({ questions }: Props) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showAnswers, setShowAnswers] = useState<Record<number, boolean>>({});

  const handleAnswerSelect = (questionIndex: number, choiceNumber: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: choiceNumber,
    }));
  };

  const toggleAnswer = (questionIndex: number) => {
    setShowAnswers((prev) => ({
      ...prev,
      [questionIndex]: !prev[questionIndex],
    }));
  };

  return (
    <div className={styles.questions}>
      {questions.map((question, index) => {
        const selectedAnswer = selectedAnswers[index];
        const isCorrect = selectedAnswer === question.correct_answer;
        const showAnswer = showAnswers[index];

        return (
          <div key={question.question_id || index} className={styles.question}>
            <div className={styles.question__header}>
              <span className={styles.question__number}>문제 {index + 1}</span>
              {question.difficulty && (
                <span className={styles.question__difficulty}>{question.difficulty}</span>
              )}
            </div>
            <div className={styles.question__text}>{question.text}</div>
            <div className={styles.question__choices}>
              {question.choices.map((choice) => {
                const isSelected = selectedAnswer === choice.number;
                const isCorrectChoice = choice.number === question.correct_answer;

                return (
                  <label
                    key={choice.number}
                    className={`${styles.question__choice} ${
                      isSelected
                        ? isCorrect
                          ? styles['question__choice--correct']
                          : styles['question__choice--incorrect']
                        : ''
                    } ${showAnswer && isCorrectChoice ? styles['question__choice--answer'] : ''}`}
                  >
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={choice.number}
                      checked={selectedAnswer === choice.number}
                      onChange={() => handleAnswerSelect(index, choice.number)}
                      disabled={showAnswer}
                    />
                    <span className={styles.question__choiceNumber}>{choice.number}.</span>
                    <span className={styles.question__choiceText}>{choice.text}</span>
                  </label>
                );
              })}
            </div>
            {selectedAnswer && (
              <div className={styles.question__result}>
                {isCorrect ? (
                  <span className={styles.question__resultCorrect}>✓ 정답입니다!</span>
                ) : (
                  <span className={styles.question__resultIncorrect}>✗ 오답입니다.</span>
                )}
                <button
                  type="button"
                  className={styles.question__showAnswer}
                  onClick={() => toggleAnswer(index)}
                >
                  {showAnswer ? '해설 숨기기' : '해설 보기'}
                </button>
              </div>
            )}
            {showAnswer && (
              <div className={styles.question__explanation}>
                <strong>정답:</strong> {question.correct_answer}번
                <br />
                <strong>해설:</strong> {question.explanation}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

