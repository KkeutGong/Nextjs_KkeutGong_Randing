import { useState } from 'react';
import { NextSeo } from 'next-seo';
import Head from 'next/head';

import PDFUploader from '@/components/Dashboard/PDFUploader';
import ProcessingStatus from '@/components/Dashboard/ProcessingStatus';
import ResultsDisplay from '@/components/Dashboard/ResultsDisplay';
import { aiService } from '@/lib/aiService';

import styles from './Dashboard.module.scss';

export interface ProcessingResult {
  concepts?: any[];
  questions?: any[];
  curriculum?: any;
  weaknesses?: any[];
}

export default function Dashboard() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState<string>('');
  const [results, setResults] = useState<ProcessingResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (file: File) => {
    setIsProcessing(true);
    setError(null);
    setResults(null);
    setProcessingStep('PDF 업로드 중...');

    try {
      // PDF 업로드 및 텍스트 추출
      const uploadData = await aiService.uploadPDF(file, false);
      
      // 텍스트 추출 실패 시 에러 처리
      if (!uploadData.text_length || uploadData.text_length < 100) {
        throw new Error('PDF에서 충분한 텍스트를 추출할 수 없습니다.');
      }

      // PDF 전체 텍스트 가져오기
      const pdfText = uploadData.text || '';

      // 개념카드 생성
      setProcessingStep('개념카드 생성 중...');
      const conceptData = await aiService.generateConceptCards(
        pdfText,
        'temp-subject-id',
        20
      );

      // 문제 생성
      setProcessingStep('문제 생성 중...');
      const questionData = await aiService.generateQuestions(
        pdfText,
        'temp-subject-id',
        10,
        'practice'
      );

      // 결과 설정
      setResults({
        concepts: conceptData.cards || [],
        questions: questionData.questions || [],
      });

      setProcessingStep('완료');
    } catch (err) {
      setError(err instanceof Error ? err.message : '처리 중 오류가 발생했습니다.');
      setProcessingStep('');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <NextSeo title="PDF 처리 대시보드 - 끝공" />
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className={styles.dashboard}>
        <div className={styles.dashboard__container}>
          <header className={styles.dashboard__header}>
            <h1 className={styles.dashboard__title}>PDF 처리 대시보드</h1>
            <p className={styles.dashboard__subtitle}>
              기출 PDF를 업로드하여 개념카드와 문제를 자동으로 생성하세요
            </p>
          </header>

          {!isProcessing && !results && (
            <PDFUploader onUpload={handleUpload} />
          )}

          {isProcessing && (
            <ProcessingStatus step={processingStep} />
          )}

          {error && (
            <div className={styles.dashboard__error}>
              <p>❌ {error}</p>
            </div>
          )}

          {results && !isProcessing && (
            <ResultsDisplay results={results} />
          )}
        </div>
      </div>
    </>
  );
}

