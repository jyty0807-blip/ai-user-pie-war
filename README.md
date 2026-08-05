# 🟢 슬라임 에볼루션 — 함께 키우는 커뮤니티 게임

> **AI 유저 파이 전쟁**에서 확장된 두 번째 포트폴리오 프로젝트.  
> 유저 간 협력으로 길드 슬라임을 진화시키는 커뮤니티 클리커 게임.

**라이브**: https://sliem-47r6rez0y-jiyoung4.vercel.app

---

## 🎯 서비스 취지

### 왜 만들었나
- 단순 대시보드를 넘어 **유저 간 상호작용**이 있는 서비스 기획 역량 입증
- **게임 루프 설계** — 클리커 → 진화 → 수집 → 커뮤니티로 이어지는 유저 여정
- **데이터 기반 밸런싱** — 실시간 지표 수집 → 자동 분석 → PR 자동화로 증명
- **분리 배포 아키텍처** — 프론트/백엔드 독립 배포 설계 경험

### 핵심 경험
1. **길드 슬라임** — 모든 유저가 함께 키우는 공동의 슬라임. 먹이 비율에 따라 진화 분기
2. **개인 슬라임** — 나만의 슬라임을 포켓몬 이브이처럼 다양한 조건으로 진화
3. **랭킹 & 소감** — 기여도 순위 + 커뮤니티 소감 게시판으로 연대감

---

## 🏗️ 아키텍처

```
┌─────────────────────────────────────────────────┐
│                    Vercel                        │
│  ┌───────────────────────────────────────────┐  │
│  │         Next.js 16 App Router              │  │
│  │  /login  /register  /my-slime  /ranking   │  │
│  │  /comments                                 │  │
│  │  apiFetch() → Bearer Token → Railway API   │  │
│  └───────────────────────────────────────────┘  │
└──────────────────────┬──────────────────────────┘
                       │ HTTPS (CORS)
┌──────────────────────▼──────────────────────────┐
│                   Railway                        │
│  ┌───────────────────────────────────────────┐  │
│  │         Hono API Server (esbuild)          │  │
│  │  /api/auth    /api/slime   /api/guild      │  │
│  │  /api/ranking /api/comments /api/stats     │  │
│  │  JWT 인증 · Rate Limit · CORS              │  │
│  └──────────────────┬────────────────────────┘  │
│  ┌──────────────────▼────────────────────────┐  │
│  │         PostgreSQL (Railway 제공)          │  │
│  │   users · slime_states · guild_slime       │  │
│  │   contributions · comments · configs        │  │
│  └───────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│              GitHub Actions (매일 12:00 KST)     │
│  Regression Master — stats 분석 → 밸런스 PR 자동 │
└─────────────────────────────────────────────────┘
```

### 기술 스택

| 계층 | 기술 | 비고 |
|---|---|---|
| **프론트** | Next.js 16 + Tailwind v4 + shadcn/ui | Vercel 배포 |
| **API 서버** | Hono + JWT (jose) + esbuild 번들 | Railway 배포 |
| **DB** | PostgreSQL + Drizzle ORM | Railway 제공 |
| **자동화** | GitHub Actions cron | 회귀마스터 밸런싱 |
| **보안** | PBKDF2 해싱 · Rate Limit (30req/분) · CORS | |

### 인증 흐름

```
POST /api/auth/register → JWT 반환 → localStorage 저장
모든 API 호출 시 Authorization: Bearer <token> 헤더 자동 주입
```

---

## 🧬 진화 시스템 — 24종 Eevee 스타일

### 진화 티어

| 티어 | 필요 레벨 | 종류 | 조건 타입 |
|---|---|---|---|
| 1차 | Lv.10 | 마그마·아쿠아·스텔라·균형·달빛·태양·무지개·독성·플라즈마·크리스탈 (10종) | 먹이비율·시간·연속출석·혼합 |
| 2차 | Lv.25 | 인페르노·쓰나미·노바·킹·이클립스·오로라·다이아·좀비 (8종) | 먹이비율·시간·연속출석·방치 |
| 3차 | Lv.50 | 피닉스·리바이어던·코스믹·엠페러·에인션트·보이드·천사 (7종) | 먹이비율·히든확률·완전균형 |

### 진화 조건

| 조건 타입 | 설명 | 예시 |
|---|---|---|
| `feed_ratio` | 특정 먹이 60%↑ | 불젤리 위주 → 마그마 |
| `time_of_day` | 주 활동 시간대 | 밤 위주 → 달빛 슬라임 |
| `streak` | 연속 출석일 | 7일 → 무지개, 30일 → 다이아몬드 |
| `neglect` | 방치 후 복귀 | 3일↑ → 좀비 |
| `mixed` | 두 먹이 균등 | 불35%+물35% → 독성 |
| `hidden` | 랜덤 확률 | 에인션트 1%, 보이드 0.5% |

---

## 📊 데이터 기반 운영

### `/api/stats` — 실시간 지표

```
totalUsers · activeToday · avgLevel · todayFeeds
engagementRate · balanceScore · evolutionDistribution
```

### Regression Master (회귀마스터)

매일 자동 실행되는 밸런스 분석 파이프라인:

```
api/stats 수집 → 5개 룰 진단 → 패치 생성 → GitHub PR 자동 오픈
```

**진단 룰:**
1. 참여율 <15% → `expPerFeed` 상향
2. 평균레벨 >35 → `expThresholdMultiplier` 상향
3. 진화 불균형 → 티어 레벨 조정
4. 길드 저조 → `guildExpPerFeed` 상향
5. 진행 과속 → 임계값 조정

---

## 📁 프로젝트 구조

```
├── server/                     # Railway 배포 (Hono API)
│   ├── src/index.ts            # CORS + 7개 라우트 + /health
│   ├── src/routes/             # auth · slime · guild · social · stats · tree
│   ├── src/lib/                # auth · evolution · game-config
│   └── src/db/                 # PostgreSQL Drizzle schema
│
├── src/                        # Vercel 배포 (Next.js)
│   ├── app/                    # 6개 페이지 (클라이언트 컴포넌트)
│   │   ├── page.tsx            # 길드 슬라임 메인
│   │   ├── login/ · register/  # 회원가입·로그인
│   │   ├── my-slime/           # 개인 슬라임
│   │   ├── ranking/            # 기여도 랭킹
│   │   └── comments/           # 소감 게시판
│   └── lib/
│       ├── api.ts              # apiFetch() — Bearer Token 클라이언트
│       ├── auth-context.tsx    # AuthProvider — 전역 인증 상태
│       ├── evolution.ts        # 진화 테이블 (서버와 공유)
│       └── rate-limit.ts       # 미들웨어 Rate Limiter
│
├── scripts/
│   └── regression-master.ts    # 자동 밸런싱 알고리즘
│
├── .github/workflows/
│   └── regression-master.yml   # 매일 12:00 KST 크론
│
├── railway.json                # Railway 빌드·배포 설정
└── server/railway.json
```

---

## 🚀 배포

### 환경변수

**Railway** (API 서버):
```
DATABASE_URL     (자동 주입)
JWT_SECRET       openssl rand -hex 32
CORS_ORIGIN      https://sliem-xxx.vercel.app
NODE_ENV         production
```

**Vercel** (프론트엔드):
```
NEXT_PUBLIC_API_URL  https://xxx.up.railway.app
```

### Railway DB 마이그레이션
```bash
cd server && npx drizzle-kit push
```

---

## 🔒 보안

| 항목 | 구현 |
|---|---|
| 비밀번호 | PBKDF2-SHA256 100,000회 + 16바이트 솔트 |
| 세션 | JWT (HS256, 7일) + localStorage Bearer |
| Rate Limit | IP·라우트별 30req/분 토큰버킷 |
| 비번 정책 | 최소 8자 + 영문·숫자 필수 |
| CORS | Railway CORS_ORIGIN 화이트리스트 |
| JWT 시크릿 | 프로덕션 기본값 사용 시 서버 크래시 |

---

## 🛠️ Railway 프로젝트 정리

현재 4개 프로젝트 중 슬라임 에볼루션 관련:

| 프로젝트 | 상태 | 조치 |
|---|---|---|
| `peaceful-energy` | 슬라임 API 배포 시도 | 유지 (현재 Vercel 연결) |
| `extraordinary-youth` | 중복 배포 시도 | 삭제 |
| `ai-user-pie-war` | 구 대시보드 | 필요 시 유지 |
| `jobfit-pipeline` | 별개 프로젝트 | 건들지 말 것 |

Railway 대시보드에서 `extraordinary-youth` 제거하면 깔끔해짐.

---

*최종 업데이트: 2026년 8월 5일 · 포트폴리오 프로젝트*
