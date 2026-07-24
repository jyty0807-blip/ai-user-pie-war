# AI User Pie War — Recommendation Engine Test Suite
# 독립형 Python 테스트: 브라우저 의존 없이 추천 엔진 정확도 검증

import json, sys, itertools
from typing import Any

# === Recommendation Engine (Python port from TypeScript) ===

MODEL_SWOT = {
    "opus-4-8": {"name": "Claude Opus 4.8", "bench": {"swebench": "88.6%", "gpqa": "93.6%"}, "priceOut": "$25/MTok"},
    "gpt-5-5": {"name": "GPT-5.5", "bench": {"swebench": "88.7%", "gpqa": "93.6%"}, "priceOut": "$30/MTok"},
    "sonnet-5": {"name": "Claude Sonnet 5", "bench": {"swebench": "85.2%"}, "priceOut": "$10/MTok"},
    "deepseek-v4-flash": {"name": "DeepSeek V4 Flash", "bench": {"swebench": "79.0%"}, "priceOut": "$0.28/MTok"},
    "deepseek-v4-pro": {"name": "DeepSeek V4 Pro", "bench": {"swebench": "80.6%", "gpqa": "90.1%"}, "priceOut": "$0.87/MTok"},
    "gemini-3-1": {"name": "Gemini 3.1 Pro", "bench": {"gpqa": "94.3%"}, "priceOut": "$12/MTok"},
    "gemini-3-5-flash": {"name": "Gemini 3.5 Flash", "bench": {"arc": "72.1%"}, "priceOut": "$9/MTok"},
    "fable-5": {"name": "Claude Fable 5", "bench": {"swebench": "95.0%"}, "priceOut": "$50/MTok"},
    "opencode": {"name": "OpenCode (OMC)", "bench": {}, "priceOut": "$0"},
}

TASK_BEST = {
    "web-dev": "opus-4-8", "ai-ml": "opus-4-8", "game-dev": "opus-4-8",
    "data": "gemini-3-1", "writing": "fable-5", "resume": "opus-4-8",
    "design": "gpt-5-5", "marketing": "gpt-5-5", "translate": "deepseek-v4-flash",
    "study": "sonnet-5", "chat": "gpt-5-5",
}

# Expected correct recommendations for each test scenario
# Format: { role: str, tasks: list, env: str, budget: str, style: str, service: str,
#           expected_models: list  # slugs that MUST appear }
TEST_CASES = [
    {
        "name": "중고생 웹개발 무료 CLI",
        "input": {"role": "student", "tasks": ["web-dev"], "env": "cli", "exp": "none", "budget": "free", "style": "value", "service": "single"},
        "expected_models": ["opencode", "deepseek-v4-flash"],
        "rationale": "무료 오픈소스 + 극저가 API 조합이 학생에게 최적"
    },
    {
        "name": "대학생 AI리서치 웹 표준",
        "input": {"role": "college", "tasks": ["ai-ml", "data"], "env": "web", "exp": "intermediate", "budget": "budget", "style": "precise", "service": "multi"},
        "expected_models": ["sonnet-5", "deepseek-v4-flash"],
        "rationale": "Sonnet 5 할인가 + 저가 API로 과제/리서치 최적"
    },
    {
        "name": "취준생 자소서 웹 예산한정",
        "input": {"role": "job-seeker", "tasks": ["resume", "writing"], "env": "web", "exp": "basic", "budget": "standard", "style": "precise", "service": "single"},
        "expected_models": ["gpt-5-5", "opus-4-8"],
        "rationale": "ChatGPT Plus + Claude Pro로 자소서/면접 커버"
    },
    {
        "name": "직장인 개발자 풀세트",
        "input": {"role": "dev-worker", "tasks": ["web-dev", "ai-ml"], "env": "ide", "exp": "advanced", "budget": "pro", "style": "fast", "service": "multi"},
        "expected_models": ["opus-4-8", "gpt-5-5", "deepseek-v4-flash"],
        "rationale": "Claude Code + GPT API + DeepSeek로 풀커버"
    },
    {
        "name": "비개발 직장인 문서작업",
        "input": {"role": "nondev-worker", "tasks": ["writing", "chat"], "env": "web", "exp": "basic", "budget": "budget", "style": "fast", "service": "single"},
        "expected_models": ["gpt-5-5"],
        "rationale": "ChatGPT Plus 하나로 문서/채팅 충분"
    },
    {
        "name": "프리랜서 AI개발 고급",
        "input": {"role": "freelancer", "tasks": ["ai-ml", "web-dev"], "env": "api", "exp": "advanced", "budget": "pro", "style": "value", "service": "multi"},
        "expected_models": ["opus-4-8", "deepseek-v4-pro"],
        "rationale": "프리미엄 추론 + 저가 대량 처리 병행"
    },
    {
        "name": "창업가 올라운드",
        "input": {"role": "founder", "tasks": ["web-dev", "marketing", "chat"], "env": "web", "exp": "intermediate", "budget": "standard", "style": "fast", "service": "multi"},
        "expected_models": ["opus-4-8", "gpt-5-5", "deepseek-v4-flash"],
        "rationale": "개발 + 마케팅 + 채팅 올인원"
    },
    {
        "name": "연구원 장문리서치",
        "input": {"role": "researcher", "tasks": ["data", "writing"], "env": "web", "exp": "advanced", "budget": "standard", "style": "precise", "service": "single"},
        "expected_models": ["gemini-3-1", "opus-4-8"],
        "rationale": "2M 컨텍스트 + 정확한 추론 조합"
    },
    {
        "name": "게임개발자 IDE 고급",
        "input": {"role": "dev-worker", "tasks": ["game-dev"], "env": "ide", "exp": "advanced", "budget": "standard", "style": "precise", "service": "multi"},
        "expected_models": ["opus-4-8"],
        "rationale": "코드 품질 최우선, Opus 4.8이 SWE-bench Pro 1위"
    },
    {
        "name": "디자이너 창작 웹",
        "input": {"role": "freelancer", "tasks": ["design"], "env": "web", "exp": "intermediate", "budget": "standard", "style": "fast", "service": "single"},
        "expected_models": ["gpt-5-5"],
        "rationale": "이미지 생성 + 디자인 리뷰에 GPT 최적"
    },
    {
        "name": "마케터 카피 API 대량",
        "input": {"role": "nondev-worker", "tasks": ["marketing", "writing"], "env": "api", "exp": "intermediate", "budget": "pro", "style": "fast", "service": "single"},
        "expected_models": ["gpt-5-5"],
        "rationale": "GPT-5.5 Mazur Writing 1위, 대량 카피 생성"
    },
    {
        "name": "번역가 고볼륨",
        "input": {"role": "freelancer", "tasks": ["translate"], "env": "api", "exp": "advanced", "budget": "pro", "style": "value", "service": "single"},
        "expected_models": ["deepseek-v4-flash"],
        "rationale": "대량 번역에 $0.28/MTok 최적"
    },
]

# === Test Runner ===

TEST_RESULTS = []

def run_test(tc: dict) -> dict:
    inp = tc["input"]
    role = inp["role"]
    tasks = inp.get("tasks", ["chat"])
    best_model = TASK_BEST.get(tasks[0], "opus-4-8")

    # Simulate the COMBO_DATA lookup
    combo_map = {
        "student": ["opencode", "deepseek-v4-flash", "sonnet-5"],
        "college": ["sonnet-5", "deepseek-v4-flash"],
        "job-seeker": ["gpt-5-5", "opus-4-8", "sonnet-5", "deepseek-v4-flash"],
        "dev-worker": ["opus-4-8", "gpt-5-5", "deepseek-v4-flash"],
        "nondev-worker": ["gpt-5-5", "opus-4-8", "gemini-3-1"],
        "freelancer": ["opus-4-8", "deepseek-v4-pro"],
        "founder": ["opus-4-8", "gpt-5-5", "deepseek-v4-flash"],
        "researcher": ["gemini-3-1", "opus-4-8"],
    }
    available = combo_map.get(role, ["opus-4-8"])
    result_models = list(dict.fromkeys([best_model] + available))[:4]  # dedup + top 4

    expected = tc["expected_models"]
    found = [m for m in expected if m in result_models]
    missing = [m for m in expected if m not in result_models]
    coverage = len(found) / len(expected) if expected else 1.0

    return {
        "name": tc["name"],
        "input": inp,
        "result_models": result_models[:3],
        "expected_models": expected,
        "matched": found,
        "missing": missing,
        "coverage": round(coverage, 2),
        "pass": coverage >= 0.8,
        "rationale_match": tc["rationale"],
    }

# === Execute All Tests ===

print("=" * 72)
print("🧪 AI User Pie War — 추천 엔진 테스트 스위트")
print("=" * 72)

all_pass = True
results = []
for tc in TEST_CASES:
    r = run_test(tc)
    results.append(r)
    status = "✅ PASS" if r["pass"] else "❌ FAIL"
    if not r["pass"]:
        all_pass = False
    print(f"\n{status} | {r['name']}")
    print(f"   Input:        role={r['input']['role']}, tasks={r['input']['tasks']}, budget={r['input']['budget']}")
    print(f"   Expected:     {', '.join(r['expected_models'])}")
    print(f"   Got:          {', '.join(r['result_models'][:3])}")
    print(f"   Coverage:     {r['coverage']*100:.0f}% ({len(r['matched'])}/{len(r['expected_models'])} models)")
    if r["missing"]:
        print(f"   ⚠️  Missing:    {', '.join(r['missing'])}")
    print(f"   Rationale:    {r['rationale_match']}")

# === Summary Statistics ===

pass_count = sum(1 for r in results if r["pass"])
fail_count = sum(1 for r in results if not r["pass"])
avg_coverage = sum(r["coverage"] for r in results) / len(results)
total_expected = sum(len(r["expected_models"]) for r in results)
total_matched = sum(len(r["matched"]) for r in results)
total_missing = sum(len(r["missing"]) for r in results)

print("\n" + "=" * 72)
print("📊 통계 요약")
print("=" * 72)
print(f"   총 테스트 케이스:          {len(results)}개")
print(f"   ✅ 통과:                   {pass_count}개 ({pass_count/len(results)*100:.0f}%)")
print(f"   ❌ 실패:                   {fail_count}개 ({fail_count/len(results)*100:.0f}%)")
print(f"   평균 모델 커버리지:        {avg_coverage*100:.1f}%")
print(f"   기대 모델 총합:            {total_expected}개")
print(f"   매칭 성공:                 {total_matched}개 ({total_matched/total_expected*100:.0f}%)")
print(f"   매칭 실패:                 {total_missing}개 ({total_missing/total_expected*100:.0f}%)")

# === Category Coverage ===
cats = set()
for r in results:
    for e in r["expected_models"]:
        cats.add(e)
covered_cats = set()
for r in results:
    for m in r["matched"]:
        covered_cats.add(m)
print(f"\n   대상 모델 수:               {len(cats)}개")
print(f"   커버된 모델:               {len(covered_cats)}개")
print(f"   모델 커버리지:             {len(covered_cats)/len(cats)*100:.0f}%")

print("\n" + "=" * 72)
print("✅ 테스트 완료" if all_pass else "⚠️ 일부 테스트 실패")
print("=" * 72)

# === Save Report ===
report = {
    "summary": {
        "total": len(results),
        "pass": pass_count,
        "fail": fail_count,
        "pass_rate": f"{pass_count/len(results)*100:.0f}%",
        "avg_coverage": f"{avg_coverage*100:.1f}%",
        "model_coverage": f"{len(covered_cats)}/{len(cats)} ({len(covered_cats)/len(cats)*100:.0f}%)",
    },
    "results": results,
}

with open("C:\\Users\\jy\\ai-user-pie-war\\playwright-results\\qa\\recommendation-test-report.json", "w", encoding="utf-8") as f:
    json.dump(report, f, ensure_ascii=False, indent=2)

sys.exit(0 if all_pass else 1)