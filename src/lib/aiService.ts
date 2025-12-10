/**
 * AI 서비스 API 클라이언트
 */

const AI_SERVICE_URL = process.env.NEXT_PUBLIC_AI_SERVICE_URL || 'http://localhost:8000';

export interface PDFUploadResponse {
  success: boolean;
  text: string;  // 전체 텍스트
  text_length: number;
  preview: string;
}

export interface ConceptCard {
  concept_id?: string;
  text: string;
  keyword: string;
  category?: string;
  subject_id?: string;
}

export interface ConceptCardGenerationResponse {
  success: boolean;
  count: number;
  cards: ConceptCard[];
}

export interface QuestionChoice {
  number: number;
  text: string;
}

export interface Question {
  question_id?: string;
  text: string;
  choices: QuestionChoice[];
  correct_answer: number;
  explanation: string;
  difficulty?: string;
  category?: string;
  subject_id?: string;
}

export interface QuestionGenerationResponse {
  success: boolean;
  count: number;
  questions: Question[];
}

class AIService {
  /**
   * PDF 업로드 및 텍스트 추출
   */
  async uploadPDF(file: File, useOCR: boolean = false): Promise<PDFUploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('use_ocr', useOCR.toString());

    const response = await fetch(`${AI_SERVICE_URL}/api/v1/pdf/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'PDF 업로드 실패' }));
      throw new Error(error.detail || 'PDF 업로드 실패');
    }

    return response.json();
  }

  /**
   * 개념카드 생성
   */
  async generateConceptCards(
    pdfText: string,
    subjectId: string,
    count: number = 20
  ): Promise<ConceptCardGenerationResponse> {
    const response = await fetch(`${AI_SERVICE_URL}/api/v1/concept/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pdf_text: pdfText,
        subject_id: subjectId,
        count,
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: '개념카드 생성 실패' }));
      throw new Error(error.detail || '개념카드 생성 실패');
    }

    return response.json();
  }

  /**
   * 문제 생성
   */
  async generateQuestions(
    pdfText: string,
    subjectId: string,
    count: number = 10,
    type: 'concept' | 'practice' | 'review' | 'mock' = 'practice'
  ): Promise<QuestionGenerationResponse> {
    const response = await fetch(`${AI_SERVICE_URL}/api/v1/question/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pdf_text: pdfText,
        subject_id: subjectId,
        count,
        type,
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: '문제 생성 실패' }));
      throw new Error(error.detail || '문제 생성 실패');
    }

    return response.json();
  }

  /**
   * 문제 변형 생성
   */
  async generateQuestionVariation(
    originalQuestion: Question,
    variationType: 'similar' | 'difficulty_adjust' = 'similar'
  ): Promise<Question> {
    const response = await fetch(`${AI_SERVICE_URL}/api/v1/question/variation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        original_question: originalQuestion,
        variation_type: variationType,
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: '문제 변형 생성 실패' }));
      throw new Error(error.detail || '문제 변형 생성 실패');
    }

    const data = await response.json();
    return data.question;
  }
}

export const aiService = new AIService();

