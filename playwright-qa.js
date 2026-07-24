const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const BASE_URL = "https://ai-user-pie-war-production.up.railway.app";
const RESULTS_DIR = path.join(__dirname, "playwright-results", "qa");
const SCREENSHOTS_DIR = path.join(RESULTS_DIR, "screenshots");

const REPORT = { tests: [], passed: 0, failed: 0, startTime: new Date().toISOString() };

function record(label, passed, detail = "") {
  const status = passed ? "PASS" : "FAIL";
  if (passed) REPORT.passed++; else REPORT.failed++;
  REPORT.tests.push({ label, status, detail, timestamp: new Date().toISOString() });
  console.log(`  ${passed ? "✅" : "❌"} ${status}: ${label}${detail ? " — " + detail : ""}`);
}

async function screenshot(page, name, fullPage = true) {
  const filePath = path.join(SCREENSHOTS_DIR, name);
  await page.screenshot({ path: filePath, fullPage });
  console.log(`    📸 ${name}`);
  return filePath;
}

(async () => {
  // Ensure dirs
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  });

  console.log("=" .repeat(60));
  console.log("🧪 AI User Pie War — Comprehensive Playwright QA");
  console.log(`🌐 Target: ${BASE_URL}`);
  console.log("=" .repeat(60));

  // ──────────────────────────────────────────
  // TEST 1: All pages load with HTTP 200
  // ──────────────────────────────────────────
  console.log("\n📋 TEST 1: Page Load Status (HTTP 200)");
  const pagesToTest = [
    { path: "/", label: "Landing (/)", screenshot: "01-landing.png" },
    { path: "/recommend", label: "Recommend (/recommend)", screenshot: "02-recommend.png" },
    { path: "/dashboard", label: "Dashboard (/dashboard)", screenshot: "03-dashboard.png" },
    { path: "/dashboard/news", label: "News (/dashboard/news)", screenshot: "04-news.png" },
    { path: "/dashboard/platforms", label: "Platforms (/dashboard/platforms)", screenshot: "05-platforms.png" },
    { path: "/dashboard/insights", label: "Insights (/dashboard/insights)", screenshot: "06-insights.png" },
    { path: "/dashboard/onboarding", label: "Onboarding (/dashboard/onboarding)", screenshot: "07-onboarding.png" },
    { path: "/dashboard/about", label: "About (/dashboard/about)", screenshot: "08-about.png" },
  ];

  for (const p of pagesToTest) {
    const page = await context.newPage();
    try {
      const resp = await page.goto(BASE_URL + p.path, { waitUntil: "networkidle", timeout: 30000 });
      const status = resp ? resp.status() : 0;
      const ok = status >= 200 && status < 400;
      record(`Load: ${p.label}`, ok, `HTTP ${status}`);
      if (ok) await screenshot(page, p.screenshot);
    } catch (e) {
      record(`Load: ${p.label}`, false, e.message.substring(0, 100));
      await screenshot(page, p.screenshot.replace(".png", "-error.png"));
    }
    await page.close();
  }

  // ──────────────────────────────────────────
  // TEST 2: Navigation works — click nav items
  // ──────────────────────────────────────────
  console.log("\n📋 TEST 2: Navigation — Click each nav item");
  const dashboardNavItems = [
    { label: "대시보드", href: "/dashboard" },
    { label: "뉴스", href: "/dashboard/news" },
    { label: "플랫폼 비교", href: "/dashboard/platforms" },
    { label: "인사이트", href: "/dashboard/insights" },
    { label: "온보딩", href: "/dashboard/onboarding" },
    { label: "소개", href: "/dashboard/about" },
  ];

  const navPage = await context.newPage();
  await navPage.goto(BASE_URL + "/dashboard", { waitUntil: "networkidle", timeout: 30000 });
  await navPage.waitForTimeout(1500);

  for (const item of dashboardNavItems) {
    try {
      // Click nav link by text content
      const navLinks = await navPage.$$("nav a");
      let clicked = false;
      for (const link of navLinks) {
        const text = await link.textContent();
        if (text && text.trim() === item.label) {
          await link.click();
          await navPage.waitForTimeout(2000);
          clicked = true;
          break;
        }
      }
      if (!clicked) {
        record(`Nav click: ${item.label}`, false, "Nav link not found");
        continue;
      }
      const currentUrl = navPage.url();
      const urlMatch = currentUrl.includes(item.href);
      record(`Nav click: ${item.label}`, urlMatch, `URL: ${currentUrl}`);
      await screenshot(navPage, `nav-${item.label.replace(/\s+/g, "-")}.png`);
    } catch (e) {
      record(`Nav click: ${item.label}`, false, e.message.substring(0, 100));
    }
  }
  await navPage.close();

  // Also test the "/recommend" link from dashboard nav
  const recNavPage = await context.newPage();
  await recNavPage.goto(BASE_URL + "/dashboard", { waitUntil: "networkidle", timeout: 30000 });
  await recNavPage.waitForTimeout(1500);
  try {
    const recLink = await recNavPage.$('a[href="/recommend"]');
    if (recLink) {
      await recLink.click();
      await recNavPage.waitForTimeout(2000);
      const onRec = recNavPage.url().includes("/recommend");
      record("Nav click: 🎯 추천", onRec, `URL: ${recNavPage.url()}`);
      await screenshot(recNavPage, "nav-recommend.png");
    } else {
      record("Nav click: 🎯 추천", false, "Recommend link not found");
    }
  } catch (e) {
    record("Nav click: 🎯 추천", false, e.message.substring(0, 100));
  }
  await recNavPage.close();

  // ──────────────────────────────────────────
  // TEST 3: Recommendation survey flow (6 questions)
  // ──────────────────────────────────────────
  console.log("\n📋 TEST 3: Recommendation Survey Flow (6 questions)");
  const surveyPage = await context.newPage();
  try {
    await surveyPage.goto(BASE_URL + "/recommend", { waitUntil: "networkidle", timeout: 30000 });
    await surveyPage.waitForTimeout(1500);
    await screenshot(surveyPage, "survey-step0.png");

    // Q1: role (single choice)
    const q1Btn = await surveyPage.$("button");
    if (q1Btn) { await q1Btn.click(); await surveyPage.waitForTimeout(800); }
    await surveyPage.click('button:has-text("다음 →")');
    await surveyPage.waitForTimeout(800);
    await screenshot(surveyPage, "survey-step1.png");

    // Q2: task (multi choice)
    const q2Btns = await surveyPage.$$("main button");
    if (q2Btns.length > 2) { await q2Btns[2].click(); await surveyPage.waitForTimeout(500); }
    if (q2Btns.length > 3) { await q2Btns[3].click(); await surveyPage.waitForTimeout(500); }
    await surveyPage.click('button:has-text("다음 →")');
    await surveyPage.waitForTimeout(800);
    await screenshot(surveyPage, "survey-step2.png");

    // Q3: env (single)
    const q3Btns = await surveyPage.$$("main button");
    if (q3Btns.length > 2) { await q3Btns[2].click(); await surveyPage.waitForTimeout(500); }
    await surveyPage.click('button:has-text("다음 →")');
    await surveyPage.waitForTimeout(800);
    await screenshot(surveyPage, "survey-step3.png");

    // Q4: exp (single)
    const q4Btns = await surveyPage.$$("main button");
    if (q4Btns.length > 2) { await q4Btns[2].click(); await surveyPage.waitForTimeout(500); }
    await surveyPage.click('button:has-text("다음 →")');
    await surveyPage.waitForTimeout(800);
    await screenshot(surveyPage, "survey-step4.png");

    // Q5: budget (single)
    const q5Btns = await surveyPage.$$("main button");
    if (q5Btns.length > 2) { await q5Btns[2].click(); await surveyPage.waitForTimeout(500); }
    await surveyPage.click('button:has-text("다음 →")');
    await surveyPage.waitForTimeout(800);
    await screenshot(surveyPage, "survey-step5.png");

    // Q6: style (single) — last question, click "추천 받기"
    const q6Btns = await surveyPage.$$("main button");
    if (q6Btns.length > 2) { await q6Btns[2].click(); await surveyPage.waitForTimeout(500); }
    await surveyPage.click('button:has-text("추천 받기")');
    await surveyPage.waitForTimeout(3000);
    await screenshot(surveyPage, "survey-result.png");

    // Verify result page has recommendation content
    const resultTitle = await surveyPage.$("h1");
    const hasResult = resultTitle !== null;
    const koreanInResult = await surveyPage.evaluate(() => {
      const body = document.body.textContent || "";
      return /[가-힣]/.test(body) && body.length > 200;
    });
    record("Survey: Complete 6-question flow", true, "All steps completed");
    record("Survey: Result page renders", hasResult, hasResult ? "h1 found" : "No h1 on result page");
    record("Survey: Result has Korean content", koreanInResult, koreanInResult ? "Korean text found" : "No Korean text");
  } catch (e) {
    record("Survey: Flow error", false, e.message.substring(0, 100));
    await screenshot(surveyPage, "survey-error.png");
  }
  await surveyPage.close();

  // ──────────────────────────────────────────
  // TEST 4: Evidence tooltips (? icons) hover
  // ──────────────────────────────────────────
  console.log("\n📋 TEST 4: Evidence Tooltips (? icon hover)");
  const tooltipPage = await context.newPage();
  try {
    await tooltipPage.goto(BASE_URL + "/dashboard", { waitUntil: "networkidle", timeout: 30000 });
    await tooltipPage.waitForTimeout(2000);
    await screenshot(tooltipPage, "tooltip-before.png");

    // Find all ? help icon buttons (aria-label containing "출처")
    const helpButtons = await tooltipPage.$$('button[aria-label*="데이터 출처"], button[aria-label*="출처"]');
    const iconCount = helpButtons.length;
    record("Evidence icons: Count", iconCount > 0, `${iconCount} icons found`);

    if (iconCount > 0) {
      // Hover first icon
      await helpButtons[0].hover();
      await tooltipPage.waitForTimeout(1500);
      await screenshot(tooltipPage, "tooltip-hovered.png");

      // Check tooltip appeared
      const tooltipVisible = await tooltipPage.evaluate(() => {
        const tooltips = document.querySelectorAll('[role="tooltip"], [data-state="delayed-open"], [data-state="instant-open"]');
        return tooltips.length > 0;
      });
      record("Evidence tooltip: Hover shows content", tooltipVisible, tooltipVisible ? "Tooltip appeared" : "No tooltip visible");

      // Check tooltip content has Korean text (데이터 근거)
      const tooltipKorean = await tooltipPage.evaluate(() => {
        const tooltips = document.querySelectorAll('[role="tooltip"]');
        for (const t of tooltips) {
          const text = t.textContent || "";
          if (/데이터 근거/.test(text) || /출처/.test(text)) return true;
        }
        return false;
      });
      record("Evidence tooltip: Korean content", tooltipKorean, tooltipKorean ? "Korean labels found" : "No Korean in tooltip");
    } else {
      // Try fallback: look for HelpCircle icons or ? buttons
      const helpFallback = await tooltipPage.$$("button svg.lucide-help-circle");
      record("Evidence icons: Fallback search", helpFallback.length > 0, `${helpFallback.length} Lucide help icons found`);
    }
  } catch (e) {
    record("Evidence tooltips: Error", false, e.message.substring(0, 100));
  }
  await tooltipPage.close();

  // Also test tooltips on other pages
  for (const extraPage of ["/dashboard/platforms", "/dashboard/insights", "/dashboard/onboarding"]) {
    const ep = await context.newPage();
    try {
      await ep.goto(BASE_URL + extraPage, { waitUntil: "networkidle", timeout: 30000 });
      await ep.waitForTimeout(1500);
      const btns = await ep.$$("button[aria-label*='출처']");
      record(`Evidence icons: ${extraPage}`, btns.length > 0, `${btns.length} icons`);
    } catch (e) {
      record(`Evidence icons: ${extraPage}`, false, e.message.substring(0, 80));
    }
    await ep.close();
  }

  // ──────────────────────────────────────────
  // TEST 5: Korean text rendering
  // ──────────────────────────────────────────
  console.log("\n📋 TEST 5: Korean Text Rendering");
  const korPage = await context.newPage();
  try {
    await korPage.goto(BASE_URL + "/dashboard", { waitUntil: "networkidle", timeout: 30000 });
    await korPage.waitForTimeout(2000);

    // Check for Korean characters in key areas
    const koreanChecks = await korPage.evaluate(() => {
      const results = {};
      // h1 heading
      const h1 = document.querySelector("h1");
      results.h1HasKorean = h1 ? /[가-힣]/.test(h1.textContent || "") : false;
      results.h1Text = h1 ? h1.textContent?.substring(0, 60) : "no h1";

      // Body text length
      results.bodyLength = (document.body.textContent || "").length;

      // Any mojibake patterns (broken CJK common in encoding issues)
      const body = document.body.textContent || "";
      results.hasMojibake = /[\ufffd\u0080-\u00ff]{3,}/.test(body); // replacement chars

      // Korean in nav
      const nav = document.querySelector("nav");
      results.navHasKorean = nav ? /[가-힣]/.test(nav.textContent || "") : false;

      // Total Korean chars
      const koreanChars = (body.match(/[가-힣]/g) || []).length;
      results.koreanCharCount = koreanChars;

      return results;
    });

    record("Korean: h1 has Korean", koreanChecks.h1HasKorean, `"${koreanChecks.h1Text}"`);
    record("Korean: Nav has Korean", koreanChecks.navHasKorean, koreanChecks.navHasKorean ? "Yes" : "No Korean in nav");
    record("Korean: No mojibake", !koreanChecks.hasMojibake, koreanChecks.hasMojibake ? "Mojibake detected!" : "Clean rendering");
    record("Korean: Char count > 100", koreanChecks.koreanCharCount > 100, `${koreanChecks.koreanCharCount} Korean characters`);
    await screenshot(korPage, "korean-main.png");
  } catch (e) {
    record("Korean: Error", false, e.message.substring(0, 100));
  }
  await korPage.close();

  // Check Korean on a content-heavy page (news)
  const korNewsPage = await context.newPage();
  try {
    await korNewsPage.goto(BASE_URL + "/dashboard/news", { waitUntil: "networkidle", timeout: 30000 });
    await korNewsPage.waitForTimeout(2000);
    const newsKorean = await korNewsPage.evaluate(() => {
      const body = document.body.textContent || "";
      return {
        charCount: (body.match(/[가-힣]/g) || []).length,
        hasContent: body.length > 100,
        sample: body.substring(0, 150),
      };
    });
    record("Korean: News page content", newsKorean.hasContent && newsKorean.charCount > 50,
      `${newsKorean.charCount} Korean chars — "${newsKorean.sample.substring(0, 80)}"`);
    await screenshot(korNewsPage, "korean-news.png");
  } catch (e) {
    record("Korean: News page error", false, e.message.substring(0, 100));
  }
  await korNewsPage.close();

  // ──────────────────────────────────────────
  // TEST 6: Company report dialogs
  // ──────────────────────────────────────────
  console.log("\n📋 TEST 6: Company Report Dialogs");
  const dialogPage = await context.newPage();
  try {
    await dialogPage.goto(BASE_URL + "/dashboard", { waitUntil: "networkidle", timeout: 30000 });
    await dialogPage.waitForTimeout(2000);

    // Find company buttons (DialogButton components in the header area)
    const companyNames = ["OpenAI", "Anthropic", "DeepSeek", "Google"];
    let dialogsOpened = 0;

    for (const name of companyNames) {
      try {
        // Click the company quick-report button
        const btn = await dialogPage.$(`button:has-text("${name}")`);
        if (!btn) {
          // Try broader search
          const allBtns = await dialogPage.$$("button");
          let found = false;
          for (const b of allBtns) {
            const text = await b.textContent();
            if (text && text.includes(name)) {
              await b.click();
              await dialogPage.waitForTimeout(1500);
              found = true;
              break;
            }
          }
          if (!found) {
            record(`Dialog: ${name} button`, false, "Button not found");
            continue;
          }
        } else {
          await btn.click();
          await dialogPage.waitForTimeout(1500);
        }

        // Check dialog appeared
        const dialogVisible = await dialogPage.evaluate(() => {
          const dialogs = document.querySelectorAll('[role="dialog"], [data-state="open"]');
          return dialogs.length > 0;
        });
        if (dialogVisible) {
          dialogsOpened++;
          await screenshot(dialogPage, `dialog-${name.toLowerCase().replace(/\s+/g, "-")}.png`);

          // Close dialog
          await dialogPage.keyboard.press("Escape");
          await dialogPage.waitForTimeout(500);
        }

        record(`Dialog: ${name}`, dialogVisible, dialogVisible ? "Dialog opened & screenshot taken" : "No dialog appeared");
      } catch (e) {
        record(`Dialog: ${name}`, false, e.message.substring(0, 100));
      }
    }
    record("Dialog: Summary", dialogsOpened >= 2, `${dialogsOpened}/4 company dialogs opened`);
  } catch (e) {
    record("Dialog: Error", false, e.message.substring(0, 100));
  }
  await dialogPage.close();

  // ──────────────────────────────────────────
  // TEST 7: Responsive (375px viewport)
  // ──────────────────────────────────────────
  console.log("\n📋 TEST 7: Responsive Design (375px viewport)");
  const mobileContext = await browser.newContext({
    viewport: { width: 375, height: 812 },
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
  });

  const mobilePages = [
    { path: "/", label: "Landing" },
    { path: "/recommend", label: "Recommend" },
    { path: "/dashboard", label: "Dashboard" },
    { path: "/dashboard/news", label: "News" },
    { path: "/dashboard/platforms", label: "Platforms" },
  ];

  for (const mp of mobilePages) {
    const mpPage = await mobileContext.newPage();
    try {
      await mpPage.goto(BASE_URL + mp.path, { waitUntil: "networkidle", timeout: 30000 });
      await mpPage.waitForTimeout(1500);
      await screenshot(mpPage, `mobile-${mp.label.toLowerCase().replace(/[\/\s]+/g, "-")}.png`);

      // Check horizontal overflow
      const overflow = await mpPage.evaluate(() => {
        const docWidth = document.documentElement.scrollWidth;
        const winWidth = window.innerWidth;
        const bodyWidth = document.body.scrollWidth;
        return { docWidth, winWidth, bodyWidth, overflows: docWidth > winWidth + 5 || bodyWidth > winWidth + 5 };
      });
      record(`Responsive: ${mp.label} no h-overflow`, !overflow.overflows,
        `doc=${overflow.docWidth}px, win=${overflow.winWidth}px, body=${overflow.bodyWidth}px`);
    } catch (e) {
      record(`Responsive: ${mp.label}`, false, e.message.substring(0, 100));
    }
    await mpPage.close();
  }

  // Test hamburger menu on mobile
  const mobileMenuPage = await mobileContext.newPage();
  try {
    await mobileMenuPage.goto(BASE_URL + "/dashboard", { waitUntil: "networkidle", timeout: 30000 });
    await mobileMenuPage.waitForTimeout(1500);
    // Look for hamburger button (lucide menu icon in a button)
    const hamburger = await mobileMenuPage.$("button svg.lucide-menu, button svg");
    if (hamburger) {
      // Click the parent button
      const parentBtn = await hamburger.evaluateHandle(el => el.closest("button"));
      if (parentBtn) {
        await parentBtn.asElement().click();
        await mobileMenuPage.waitForTimeout(1000);
        await screenshot(mobileMenuPage, "mobile-hamburger-open.png");
        const sheetVisible = await mobileMenuPage.evaluate(() => {
          return document.querySelectorAll('[role="dialog"], [data-state="open"]').length > 0;
        });
        record("Responsive: Hamburger menu opens", sheetVisible, sheetVisible ? "Sheet opened" : "No sheet");
      }
    } else {
      record("Responsive: Hamburger menu", false, "Menu button not found");
    }
  } catch (e) {
    record("Responsive: Hamburger menu", false, e.message.substring(0, 100));
  }
  await mobileMenuPage.close();

  await mobileContext.close();

  // ──────────────────────────────────────────
  // TEST 8: Accessibility — Color contrast check
  // ──────────────────────────────────────────
  console.log("\n📋 TEST 8: Accessibility — Color Contrast");
  const a11yPage = await context.newPage();
  try {
    await a11yPage.goto(BASE_URL + "/dashboard", { waitUntil: "networkidle", timeout: 30000 });
    await a11yPage.waitForTimeout(2000);

    // Check WCAG contrast on key text elements
    const contrastResults = await a11yPage.evaluate(() => {
      const issues = [];

      // Helper: parse CSS color to RGB
      function parseColor(color) {
        const ctx = document.createElement("canvas").getContext("2d");
        ctx.fillStyle = color;
        ctx.fillStyle = ctx.fillStyle; // normalize
        const match = ctx.fillStyle.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
        if (!match) return null;
        return {
          r: parseInt(match[1], 16),
          g: parseInt(match[2], 16),
          b: parseInt(match[3], 16),
        };
      }

      function relativeLuminance({ r, g, b }) {
        const [rs, gs, bs] = [r, g, b].map(c => {
          const s = c / 255;
          return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
      }

      function contrastRatio(c1, c2) {
        const l1 = relativeLuminance(c1);
        const l2 = relativeLuminance(c2);
        const lighter = Math.max(l1, l2);
        const darker = Math.min(l1, l2);
        return (lighter + 0.05) / (darker + 0.05);
      }

      // Check h1
      const h1 = document.querySelector("h1");
      if (h1) {
        const style = window.getComputedStyle(h1);
        const fg = parseColor(style.color);
        const bg = parseColor(style.backgroundColor) || parseColor("rgb(253, 252, 252)"); // fallback bg
        if (fg && bg) {
          const ratio = contrastRatio(fg, bg);
          if (ratio < 4.5) issues.push(`h1 contrast ${ratio.toFixed(1)}:1 (needs 4.5:1) - "${h1.textContent?.substring(0, 30)}"`);
        }
      }

      // Check nav links
      const navLinks = document.querySelectorAll("nav a");
      let navFailures = 0;
      navLinks.forEach(link => {
        const style = window.getComputedStyle(link);
        const fg = parseColor(style.color);
        const bg = parseColor(style.backgroundColor) || parseColor("rgb(253, 252, 252)");
        if (fg && bg) {
          const ratio = contrastRatio(fg, bg);
          if (ratio < 3.0) navFailures++; // nav text needs 3:1 (large text)
        }
      });
      if (navFailures > 0) issues.push(`${navFailures} nav links below 3:1 contrast`);

      // Check body text contrast
      const body = document.body;
      const bodyStyle = window.getComputedStyle(body);
      const bodyFg = parseColor(bodyStyle.color);

      return { issues, issueCount: issues.length };
    });

    if (contrastResults.issues.length === 0) {
      record("A11y: h1 text contrast", true, "Meets WCAG AA (4.5:1)");
    } else {
      contrastResults.issues.forEach(i => record("A11y: Contrast issue", false, i));
    }

    // Check for alt text on images
    const altText = await a11yPage.evaluate(() => {
      const imgs = document.querySelectorAll("img");
      let missing = 0;
      imgs.forEach(img => { if (!img.alt) missing++; });
      return { total: imgs.length, missing };
    });
    if (altText.total > 0) {
      record("A11y: Image alt text", altText.missing === 0,
        altText.missing > 0 ? `${altText.missing}/${altText.total} images missing alt` : `All ${altText.total} images have alt`);
    } else {
      record("A11y: Image alt text", true, "No img elements to check");
    }

    // Check for ARIA landmarks
    const landmarks = await a11yPage.evaluate(() => {
      const roles = [];
      document.querySelectorAll("[role]").forEach(el => roles.push(el.getAttribute("role")));
      const hasNav = roles.includes("navigation") || document.querySelectorAll("nav").length > 0;
      const hasMain = roles.includes("main") || document.querySelectorAll("main").length > 0;
      const hasHeader = roles.includes("banner") || document.querySelectorAll("header").length > 0;
      return { hasNav, hasMain, hasHeader, roleCount: roles.length };
    });
    record("A11y: Semantic structure", landmarks.hasMain && landmarks.hasNav,
      `nav=${landmarks.hasNav}, main=${landmarks.hasMain}, header=${landmarks.hasHeader}, roles=${landmarks.roleCount}`);
  } catch (e) {
    record("A11y: Error", false, e.message.substring(0, 100));
  }
  await a11yPage.close();

  // ──────────────────────────────────────────
  // Cleanup & Report
  // ──────────────────────────────────────────
  await browser.close();

  console.log("\n" + "=" .repeat(60));
  console.log("📊 QA REPORT SUMMARY");
  console.log("=" .repeat(60));
  console.log(`✅ Passed: ${REPORT.passed}`);
  console.log(`❌ Failed: ${REPORT.failed}`);
  console.log(`📋 Total:  ${REPORT.passed + REPORT.failed}`);
  console.log(`🕐 Started: ${REPORT.startTime}`);
  console.log(`🕐 Ended:   ${new Date().toISOString()}`);
  console.log("=" .repeat(60));

  // Print detailed results
  console.log("\n📝 Detailed Results:");
  REPORT.tests.forEach(t => {
    console.log(`  ${t.status === "PASS" ? "✅" : "❌"} ${t.label}${t.detail ? " — " + t.detail : ""}`);
  });

  // Write JSON report
  const jsonReport = {
    ...REPORT,
    endTime: new Date().toISOString(),
    totalTests: REPORT.passed + REPORT.failed,
    screenshotsDir: SCREENSHOTS_DIR,
  };
  fs.writeFileSync(path.join(RESULTS_DIR, "qa-report.json"), JSON.stringify(jsonReport, null, 2));
  console.log(`\n📄 Full report saved: ${path.join(RESULTS_DIR, "qa-report.json")}`);
  console.log(`📸 Screenshots saved: ${SCREENSHOTS_DIR}`);

  if (REPORT.failed > 0) {
    console.log(`\n⚠️  ${REPORT.failed} test(s) FAILED. Review the report for details.`);
    process.exit(1);
  } else {
    console.log("\n🎉 All tests PASSED!");
  }
})().catch(err => {
  console.error("\n💥 Fatal error:", err);
  process.exit(1);
});
