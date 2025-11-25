# Resend 이메일 전송 설정 가이드

## 1. Resend 계정 생성 및 API 키 발급

1. [Resend 웹사이트](https://resend.com)에 접속하여 계정을 생성합니다.
2. 대시보드에서 **API Keys** 메뉴로 이동합니다.
3. **Create API Key** 버튼을 클릭하여 새 API 키를 생성합니다.
4. 생성된 API 키를 복사합니다.

## 2. 도메인 설정 (프로덕션용)

### 옵션 A: 자체 도메인 사용 (권장)
1. Resend 대시보드에서 **Domains** 메뉴로 이동합니다.
2. **Add Domain** 버튼을 클릭하여 도메인을 추가합니다.
3. DNS 설정에 제공된 레코드를 추가합니다.
4. 인증이 완료되면 해당 도메인으로 이메일을 보낼 수 있습니다.
   - 예: `noreply@kkeutgong.com`

### 옵션 B: 테스트 도메인 사용 (개발용)
- Resend는 기본적으로 `onboarding@resend.dev` 도메인을 제공합니다.
- 개발/테스트 환경에서는 이 도메인을 사용할 수 있습니다.

## 3. 환경 변수 설정

### 로컬 개발 환경
프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가합니다:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=noreply@kkeutgong.com
```

또는 테스트용:
```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=onboarding@resend.dev
```

### Vercel 배포 환경
1. Vercel 대시보드에서 프로젝트를 선택합니다.
2. **Settings** > **Environment Variables** 메뉴로 이동합니다.
3. 다음 환경 변수를 추가합니다:
   - `RESEND_API_KEY`: Resend API 키
   - `RESEND_FROM_EMAIL`: 발신 이메일 주소

## 4. 무료 티어 제한
- 월 3,000개 이메일 무료
- 일일 100개 이메일 제한
- 충분한 용량입니다!

## 5. 테스트
로컬에서 테스트하려면:
1. `.env.local` 파일에 API 키를 설정합니다.
2. 개발 서버를 실행합니다: `npm run dev`
3. 피드백 또는 사전예약 폼을 제출합니다.
4. 이메일이 정상적으로 전송되는지 확인합니다.

## 6. 대안 서비스
Resend가 마음에 들지 않으면 다음 서비스도 사용할 수 있습니다:

- **SendGrid**: 무료 티어 100개/일
- **AWS SES**: 매우 저렴하지만 설정이 복잡
- **Mailgun**: 무료 티어 5,000개/월

## 문제 해결
- API 키가 작동하지 않으면: Resend 대시보드에서 키가 활성화되어 있는지 확인
- 도메인 인증 실패: DNS 설정이 올바르게 적용되었는지 확인 (최대 24시간 소요)
- 이메일이 스팸으로 분류: SPF, DKIM 레코드가 올바르게 설정되었는지 확인

