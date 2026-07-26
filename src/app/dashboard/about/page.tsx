export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            소개
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            이 대시보드는 AI 4개 기업의 유저 확보 경쟁을 퍼포먼스 마케팅 관점에서 분석합니다.
          </p>
        </div>

        <div className="rounded-sm border border-border bg-card p-6">
          <h2 className="inline-flex items-center gap-1.5 text-lg font-semibold">
            프로젝트 목적
          </h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            OpenAI, Anthropic, DeepSeek, Google — 4개 AI 기업이 2026년 벌이고 있는 
            &apos;유저 파이(User Pie) 전쟁&apos;을 추적합니다. 단순한 모델 성능 비교가 아닌, 
            광고 전략, 유저 획득 비용(CAC), 전환율, 시장 점유율 등 퍼포먼스 마케팅 핵심 지표를 중심으로 분석합니다.
          </p>
        </div>

        <div className="rounded-sm border border-border bg-card p-6">
          <h2 className="text-lg font-semibold">데이터 소스</h2>
          <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <span className="text-muted-foreground">•</span>
              <span><strong>공시 데이터</strong> — SEC filings, IPO 공개 자료</span>
            </li>
            <li className="flex gap-2">
              <span className="text-muted-foreground">•</span>
              <span><strong>시장 조사</strong> — Sensor Tower, SimilarWeb, FourWeekMBA, 앱 스토어 데이터</span>
            </li>
            <li className="flex gap-2">
              <span className="text-muted-foreground">•</span>
              <span><strong>공식 발표</strong> — 각사 공식 블로그, 보도자료, 컨퍼런스 발표</span>
            </li>
            <li className="flex gap-2">
              <span className="text-muted-foreground">•</span>
              <span><strong>가격 정보</strong> — 각사 공식 API 가격 페이지 (2026년 7월 기준)</span>
            </li>
          </ul>
          <p className="mt-3 text-xs text-muted-foreground">
            ※ 일부 수치는 공개 데이터 기반 추정치입니다. 실제 값과 차이가 있을 수 있습니다.
          </p>
        </div>

        <div className="rounded-sm border border-border bg-card p-6">
          <h2 className="text-lg font-semibold">기술 스택</h2>
          <div className="mt-3 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
            {[
              { label: "프레임워크", value: "Next.js 16" },
              { label: "스타일링", value: "Tailwind v4 + shadcn/ui" },
              { label: "차트", value: "Recharts" },
              { label: "DB", value: "PostgreSQL (Railway)" },
              { label: "ORM", value: "Drizzle ORM" },
              { label: "배포", value: "Railway ($5 Hobby)" },
              { label: "오케스트레이션", value: "OpenCode (OMC)" },
              { label: "언어", value: "TypeScript strict" },
            ].map((item) => (
              <div key={item.label} className="rounded-full bg-muted p-3 text-center">
                <p className="text-[0.6rem] text-muted-foreground">{item.label}</p>
                <p className="mt-0.5 text-xs font-semibold text-foreground">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-sm border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/50">
          <p className="text-xs font-medium text-slate-800 dark:text-slate-200">
            면접 포트폴리오 안내
          </p>
          <p className="mt-1 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            이 대시보드는 AI 성능 마케팅 역량을 보여주기 위해 제작된 포트폴리오 프로젝트입니다.
            모든 데이터는 공개 출처 기반 추정치이며, 실제 기업 내부 데이터가 아닙니다.
            전체 프로젝트는 3개의 병렬 AI 에이전트와 오케스트레이터(Sisyphus)가 단기간에 구축했습니다.
          </p>
        </div>
      </div>
    </div>
  );
}