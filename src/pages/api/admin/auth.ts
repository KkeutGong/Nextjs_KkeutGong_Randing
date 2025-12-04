import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { password } = req.body;
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

  if (password === adminPassword) {
    // 간단한 토큰 생성 (실제로는 더 안전한 방법 사용 권장)
    const token = Buffer.from(`${Date.now()}-${Math.random()}`).toString('base64');
    return res.status(200).json({
      success: true,
      token,
    });
  } else {
    return res.status(401).json({ error: '비밀번호가 올바르지 않습니다.' });
  }
}

