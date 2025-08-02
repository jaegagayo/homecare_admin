// API 설정 관리
export const API_CONFIG = {
  BASE_URL: 'http://localhost:8080', // 백엔드 서버 URL
  TIMEOUT: 10000, // 요청 타임아웃 (10초)
  RETRY_ATTEMPTS: 3, // 재시도 횟수
} as const;

// API 엔드포인트 정의
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/login',
  },
} as const; 