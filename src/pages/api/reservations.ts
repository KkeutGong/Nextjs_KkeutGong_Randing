import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const RESERVATIONS_FILE = path.join(DATA_DIR, 'reservations.json');

// 데이터 디렉토리와 파일 초기화
function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(RESERVATIONS_FILE)) {
    fs.writeFileSync(RESERVATIONS_FILE, JSON.stringify([], null, 2));
  }
}

interface Reservation {
  id: string;
  name: string;
  email: string;
  phone?: string;
  certification?: string[];
  interest?: string;
  message?: string;
  createdAt: string;
}

// GET: 사전예약 목록 조회 (관리자 전용)
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  ensureDataFile();

  if (req.method === 'POST') {
    // 사전예약 생성
    try {
      const { name, email, phone, certification, interest, message } = req.body;

      if (!name || !email) {
        return res.status(400).json({ error: '이름과 이메일은 필수입니다.' });
      }

      let reservations: Reservation[] = [];
      try {
        if (fs.existsSync(RESERVATIONS_FILE)) {
          const fileContent = fs.readFileSync(RESERVATIONS_FILE, 'utf-8');
          const parsed = JSON.parse(fileContent);
          if (Array.isArray(parsed)) {
            reservations = parsed;
          }
        }
      } catch (e) {
        console.warn('Failed to read/parse reservations file, starting with empty array.', e);
        reservations = [];
      }

      const newReservation: Reservation = {
        id: `reservation-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name,
        email,
        phone: phone || undefined,
        certification: certification || undefined,
        interest: interest || undefined,
        message: message || undefined,
        createdAt: new Date().toISOString(),
      };

      reservations.push(newReservation);
      fs.writeFileSync(RESERVATIONS_FILE, JSON.stringify(reservations, null, 2));

      return res.status(200).json({
        success: true,
        data: newReservation,
      });
    } catch (error) {
      console.error('Error creating reservation:', error);
      return res.status(500).json({
        error: '사전예약 저장에 실패했습니다.',
        details: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  } else if (req.method === 'GET') {
    // 관리자 인증 확인
    const authHeader = req.headers.authorization;

    // 간단한 토큰 검증 (실제로는 더 안전한 방법 사용 권장)
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: '인증이 필요합니다.' });
    }

    // 토큰이 존재하면 인증된 것으로 간주 (실제로는 JWT 등 사용 권장)
    const token = authHeader.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: '인증이 필요합니다.' });
    }

    try {
      const reservations: Reservation[] = JSON.parse(
        fs.readFileSync(RESERVATIONS_FILE, 'utf-8')
      );

      // 최신순으로 정렬
      const sortedReservations = reservations.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      return res.status(200).json({
        success: true,
        data: sortedReservations,
        count: sortedReservations.length,
      });
    } catch (error) {
      console.error('Error reading reservations:', error);
      return res.status(500).json({
        error: '사전예약 목록 조회에 실패했습니다.',
        details: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}

