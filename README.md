# Homecare Admin - 요양보호사 관리 시스템

요양보호사 관리, 스케줄 관리, 정산 관리 기능을 제공하는 관리자 웹 애플리케이션입니다.

## 🚀 기술 스택

- **Framework**: [Remix](https://remix.run/) (React 기반 풀스택 프레임워크)
- **UI Library**: [Radix UI](https://www.radix-ui.com/) (접근성 중심 컴포넌트)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (유틸리티 퍼스트 CSS)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (타입 안전성)
- **Build Tool**: [Vite](https://vitejs.dev/) (빠른 개발 환경)
- **Package Manager**: npm

## 📁 프로젝트 구조

```
homecare_admin/
├── app/
│   ├── components/           # React 컴포넌트
│   │   ├── Admin/           # 관리자 관련 컴포넌트
│   │   ├── Calendar/        # 캘린더 및 스케줄 관리
│   │   ├── Caregivers/      # 요양보호사 관리
│   │   ├── Common/          # 공통 컴포넌트
│   │   ├── Dashboard/       # 대시보드
│   │   └── Settlement/      # 정산 관리
│   ├── api/                 # API 통신 모듈
│   ├── constants/           # 상수 정의
│   ├── data/               # 더미 데이터
│   ├── hooks/              # 커스텀 훅
│   ├── routes/             # 라우팅
│   ├── styles/             # 스타일 파일
│   ├── types/              # TypeScript 타입 정의
│   └── utils/              # 유틸리티 함수
├── public/                 # 정적 파일
└── package.json
```

## 🎯 주요 기능

### 1. 대시보드 (Dashboard)
- **현황판**: 요양보호사 현황, 정산 현황, 근무 현황 실시간 표시
- **통계**: 전체/활동/휴직/퇴사 요양보호사 수, 월별 정산 금액
- **알림**: 최근 활동, 긴급 알림 표시

### 2. 요양보호사 관리 (Caregivers)
- **인사카드**: 요양보호사 상세 정보 조회 및 관리
- **등록/말소**: 신규 등록, 퇴사 처리
- **복수 선택**: 다중 요양보호사 선택 및 일괄 작업
- **검색/필터**: 이름, 전화번호, 상태별 검색

### 3. 캘린더 관리 (Calendar)
- **월별 캘린더**: 전체 요양보호사 스케줄 월별 조회
- **스케줄 관리**: 일별 스케줄 조회, 배정, 취소
- **요양보호사별 스케줄**: 개별 요양보호사 스케줄 상세 조회
- **필터링**: 근무 유형별 필터링 (방문요양, 주야간보호 등)

### 4. 정산 관리 (Settlement)
- **정산 현황**: 월별 정산 금액, 미정산 건수
- **정산 내역**: 상세 정산 기록 조회
- **요양보호사별 정산**: 개별 요양보호사 정산 내역

## 🔧 개발 환경 설정

### 필수 요구사항
- Node.js >= 20.0.0
- npm

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start

# 타입 체크
npm run typecheck

# 린트 검사
npm run lint
```

## 🌐 API 연동

### 백엔드 서버 설정
- **기본 URL**: `http://localhost:8080/api`
- **타임아웃**: 10초
- **재시도 횟수**: 3회

### 주요 API 엔드포인트
```typescript
// 인증
POST /center/login

// 스케줄
GET /center/schedule/date?centerId={id}&year={year}&month={month}&day={day}
GET /center/schedule/{caregiverId}

// 요양보호사
GET /center/{centerId}/caregiver
GET /center/profile?caregiverId={id}

// 배정 내역
GET /center/{centerId}/assign
```

## 📊 데이터 구조

### 요양보호사 상태
```typescript
enum CaregiverStatus {
  ACTIVE = '활동 중',
  ON_LEAVE = '휴직',
  RESIGNED = '퇴사'
}
```

### 근무 유형
```typescript
enum WorkType {
  VISITING_CARE = '방문요양',
  DAY_NIGHT_CARE = '주·야간보호',
  RESPITE_CARE = '단기보호',
  VISITING_BATH = '방문목욕',
  IN_HOME_SUPPORT = '재가노인지원',
  VISITING_NURSING = '방문간호'
}
```

### 스케줄 상태
```typescript
enum ScheduleStatus {
  PLANNED = '배정됨',
  UNASSIGNED = '미배정',
  COMPLETED = '완료',
  CANCELLED = '취소'
}
```

## 🎨 UI/UX 특징

- **반응형 디자인**: 다양한 화면 크기에 대응
- **접근성**: Radix UI를 통한 WCAG 준수
- **다크 모드 지원**: 시스템 설정에 따른 자동 전환
- **로딩 상태**: 사용자 경험을 위한 로딩 인디케이터
- **에러 처리**: 친화적인 에러 메시지 표시

## 🔄 상태 관리

- **React Hooks**: useState, useEffect를 활용한 로컬 상태 관리
- **API 상태**: 로딩, 성공, 에러 상태 관리
- **필터 상태**: 검색어, 선택된 탭, 필터 조건 관리

## 📦 주요 라이브러리

### UI/UX
- `@radix-ui/themes`: 접근성 중심 UI 컴포넌트
- `@radix-ui/react-icons`: 아이콘 라이브러리

### 데이터 처리
- `xlsx`: Excel 파일 생성 및 다운로드
- `file-saver`: 파일 다운로드 기능
- `html-to-image`: 스케줄 이미지 내보내기

### 개발 도구
- `@typescript-eslint/eslint-plugin`: TypeScript 린트
- `eslint-plugin-react`: React 린트
- `tailwindcss`: 유틸리티 퍼스트 CSS
