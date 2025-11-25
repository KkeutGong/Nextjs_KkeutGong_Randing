# Docker 배포 가이드

## 빌드 및 실행

### 1. Docker 이미지 빌드
```bash
docker build -t havit-landing-web .
```

### 2. Docker Compose로 실행 (권장)
```bash
docker-compose up -d
```

### 3. 직접 실행
```bash
docker run -d \
  --name havit-landing-web \
  -p 3000:3000 \
  -e RESEND_API_KEY=your_api_key \
  -e RESEND_FROM_EMAIL=your_email@domain.com \
  havit-landing-web
```

## 환경 변수 설정

`.env` 파일을 생성하거나 Docker 실행 시 환경 변수를 전달하세요:

- `RESEND_API_KEY`: Resend API 키
- `RESEND_FROM_EMAIL`: 발신 이메일 주소

## 로그 확인

```bash
# Docker Compose 사용 시
docker-compose logs -f

# 직접 실행 시
docker logs -f havit-landing-web
```

## 컨테이너 중지 및 제거

```bash
# Docker Compose 사용 시
docker-compose down

# 직접 실행 시
docker stop havit-landing-web
docker rm havit-landing-web
```

## 프로덕션 배포 팁

1. **리버스 프록시 설정**: Nginx나 Traefik 같은 리버스 프록시를 앞에 두는 것을 권장합니다.

2. **환경 변수 관리**: Docker secrets나 환경 변수 파일을 사용하여 민감한 정보를 관리하세요.

3. **포트 변경**: 필요시 `docker-compose.yml`에서 포트를 변경할 수 있습니다.

4. **리소스 제한**: 프로덕션 환경에서는 메모리 및 CPU 제한을 설정하는 것을 권장합니다.

```yaml
# docker-compose.yml에 추가
deploy:
  resources:
    limits:
      cpus: '1'
      memory: 1G
    reservations:
      cpus: '0.5'
      memory: 512M
```

## 트러블슈팅

### 빌드 실패 시
- Node.js 버전 확인 (18.x 필요)
- `package-lock.json` 삭제 후 재생성: `rm package-lock.json && npm install`

### 컨테이너가 시작되지 않을 때
- 로그 확인: `docker logs havit-landing-web`
- 포트 충돌 확인: `lsof -i :3000`

