import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// 이메일 템플릿 헬퍼 함수
const getEmailTemplate = (
  title: string,
  content: string,
  type: 'reservation' | 'feedback' | 'admin'
) => {
  const isReservation = type === 'reservation';
  const isFeedback = type === 'feedback';

  return `
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Pretendard', 'Apple SD Gothic Neo', sans-serif; background-color: #f5f5f5;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
          <!-- Header with Gradient -->
          <tr>
            <td style="background: linear-gradient(135deg, #5a7ff0 0%, #4169E1 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
                끝공
              </h1>
              <p style="margin: 8px 0 0 0; color: rgba(255, 255, 255, 0.9); font-size: 14px; font-weight: 400;">
                KKEUTGONG
              </p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="margin: 0 0 24px 0; color: #202124; font-size: 24px; font-weight: 600; line-height: 1.4;">
                ${title}
              </h2>
              
              <div style="background-color: #fafafa; border-left: 4px solid #4169E1; padding: 24px; border-radius: 8px; margin-bottom: 32px;">
                ${content}
              </div>
              
              ${isReservation ? `
              <div style="background: linear-gradient(135deg, #f8f9ff 0%, #f0f4ff 100%); padding: 20px; border-radius: 8px; margin-bottom: 24px; text-align: center;">
                <p style="margin: 0; color: #4169E1; font-size: 16px; font-weight: 600;">
                  🎉 서비스 출시 시 알림을 보내드리겠습니다
                </p>
              </div>
              ` : ''}
              
              ${isFeedback ? `
              <div style="background: linear-gradient(135deg, #f8f9ff 0%, #f0f4ff 100%); padding: 20px; border-radius: 8px; margin-bottom: 24px; text-align: center;">
                <p style="margin: 0; color: #4169E1; font-size: 16px; font-weight: 600;">
                  💡 소중한 의견 감사합니다
                </p>
              </div>
              ` : ''}
              
              <div style="border-top: 1px solid #e0e0e0; padding-top: 24px; margin-top: 32px;">
                <p style="margin: 0 0 8px 0; color: #646464; font-size: 14px; line-height: 1.6;">
                  추가 문의사항이 있으시면 언제든지 연락주세요.
                </p>
                <p style="margin: 0; color: #646464; font-size: 14px; line-height: 1.6;">
                  이메일: <a href="mailto:junwon@hyphen.it.com" style="color: #4169E1; text-decoration: none; font-weight: 500;">junwon@hyphen.it.com</a>
                </p>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #fafafa; padding: 24px 30px; text-align: center; border-top: 1px solid #e0e0e0;">
              <p style="margin: 0; color: #646464; font-size: 12px; line-height: 1.5;">
                © 2024 끝공(KKEUTGONG). All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { to, subject, category, content, type, name, phone, interest } =
    req.body;

  try {
    // 이메일 내용 구성
    let emailSubject = '';
    let emailText = '';
    let userEmailHtml = '';
    let adminEmailHtml = '';

    if (type === 'feedback') {
      emailSubject = `[끝공 피드백] ${subject}`;
      emailText = `
피드백이 제출되었습니다.

유형: ${category}
제목: ${subject}
내용:
${content}

${to ? `답변 받을 이메일: ${to}` : '이메일 미제공'}
`;

      // 사용자 확인 이메일 HTML
      const feedbackContent = `
        <div style="color: #202124; font-size: 15px; line-height: 1.8;">
          <p style="margin: 0 0 16px 0; font-weight: 600; color: #202124;">제출하신 내용:</p>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #646464; font-size: 14px; width: 100px;">유형</td>
              <td style="padding: 8px 0; color: #202124; font-size: 14px; font-weight: 500;">${category}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #646464; font-size: 14px;">제목</td>
              <td style="padding: 8px 0; color: #202124; font-size: 14px; font-weight: 500;">${subject}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #646464; font-size: 14px; vertical-align: top;">내용</td>
              <td style="padding: 8px 0; color: #202124; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${content}</td>
            </tr>
          </table>
          <p style="margin: 24px 0 0 0; color: #646464; font-size: 14px; line-height: 1.6;">
            검토 후 우선순위에 따라 개선 작업에 반영하겠습니다.<br>
            감사합니다!
          </p>
        </div>
      `;

      userEmailHtml = getEmailTemplate(
        '피드백이 접수되었습니다',
        feedbackContent,
        'feedback'
      );
    } else if (type === 'reservation') {
      emailSubject = '[끝공 사전예약] 사전예약 신청';
      emailText = `
사전예약이 신청되었습니다.

이름: ${name}
이메일: ${to}
연락처: ${phone || '미제공'}
관심 분야: ${interest || '미선택'}
메시지: ${content || '없음'}
`;

      // 사용자 확인 이메일 HTML
      const reservationContent = `
        <div style="color: #202124; font-size: 15px; line-height: 1.8;">
          <p style="margin: 0 0 20px 0; color: #202124; font-size: 16px; font-weight: 600;">
            ${name}님, 사전예약이 성공적으로 접수되었습니다.
          </p>
          <p style="margin: 0 0 16px 0; color: #646464; font-size: 14px; line-height: 1.6;">
            제출하신 정보:
          </p>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #646464; font-size: 14px; width: 100px;">이름</td>
              <td style="padding: 10px 0; color: #202124; font-size: 14px; font-weight: 500;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #646464; font-size: 14px;">이메일</td>
              <td style="padding: 10px 0; color: #202124; font-size: 14px; font-weight: 500;">${to}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #646464; font-size: 14px;">연락처</td>
              <td style="padding: 10px 0; color: #202124; font-size: 14px; font-weight: 500;">${phone || '미제공'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #646464; font-size: 14px;">관심 분야</td>
              <td style="padding: 10px 0; color: #202124; font-size: 14px; font-weight: 500;">${interest || '미선택'}</td>
            </tr>
            ${content ? `
            <tr>
              <td style="padding: 10px 0; color: #646464; font-size: 14px; vertical-align: top;">메시지</td>
              <td style="padding: 10px 0; color: #202124; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${content}</td>
            </tr>
            ` : ''}
          </table>
          <p style="margin: 24px 0 0 0; color: #646464; font-size: 14px; line-height: 1.6;">
            서비스 출시 시 <strong style="color: #4169E1;">${to}</strong>로 알림을 보내드리겠습니다.<br>
            조금만 기다려주세요!
          </p>
        </div>
      `;

      userEmailHtml = getEmailTemplate(
        '사전예약이 접수되었습니다',
        reservationContent,
        'reservation'
      );
    }

    // 관리자 알림 이메일 HTML
    const adminContent = `
      <div style="color: #202124; font-size: 15px; line-height: 1.8;">
        <p style="margin: 0 0 16px 0; color: #d93025; font-size: 14px; font-weight: 600; background-color: #fce8e6; padding: 8px 12px; border-radius: 4px; display: inline-block;">
          새로운 ${type === 'feedback' ? '피드백' : '사전예약'}이 접수되었습니다
        </p>
        <div style="background-color: #ffffff; padding: 16px; border-radius: 6px; border: 1px solid #e0e0e0; margin-top: 16px;">
          <pre style="margin: 0; font-family: inherit; font-size: 14px; color: #202124; white-space: pre-wrap; line-height: 1.6;">${emailText}</pre>
        </div>
      </div>
    `;

    adminEmailHtml = getEmailTemplate(
      `새로운 ${type === 'feedback' ? '피드백' : '사전예약'} 접수`,
      adminContent,
      'admin'
    );

    // Resend를 사용한 이메일 전송
    if (process.env.RESEND_API_KEY) {
      // 관리자에게 알림
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
        to: 'junwon@hyphen.it.com',
        subject: emailSubject,
        html: adminEmailHtml,
        text: emailText,
      });

      // 사전예약인 경우 사용자에게도 확인 이메일 전송
      if (type === 'reservation' && to && userEmailHtml) {
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
          to: to,
          subject: emailSubject,
          html: userEmailHtml,
          text: `
${name}님, 사전예약이 성공적으로 접수되었습니다.

제출하신 정보:
- 이름: ${name}
- 이메일: ${to}
- 연락처: ${phone || '미제공'}
- 관심 분야: ${interest || '미선택'}
- 메시지: ${content || '없음'}

서비스 출시 시 ${to}로 알림을 보내드리겠습니다.
조금만 기다려주세요!

끝공 팀 드림
`,
        });
      }

      // 피드백이고 이메일이 제공된 경우 사용자에게 확인 이메일
      if (type === 'feedback' && to && userEmailHtml) {
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
          to: to,
          subject: '[끝공] 피드백이 접수되었습니다',
          html: userEmailHtml,
          text: `
피드백이 성공적으로 접수되었습니다.

제출하신 내용:
- 유형: ${category}
- 제목: ${subject}
- 내용: ${content}

검토 후 우선순위에 따라 개선 작업에 반영하겠습니다.
감사합니다!

끝공 팀 드림
`,
        });
      }
    } else {
      // 개발 환경에서는 콘솔에만 출력
      console.log('=== 이메일 전송 (개발 모드) ===');
      console.log('받는 사람:', to);
      console.log('제목:', emailSubject);
      console.log('내용:', emailText);
      console.log('============================');
    }

    return res.status(200).json({
      success: true,
      message: '이메일이 전송되었습니다.',
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({
      error: '이메일 전송에 실패했습니다.',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
