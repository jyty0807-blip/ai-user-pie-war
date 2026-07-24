const { chromium } = require("playwright");

(async () => {
  const baseUrl = "https://ai-user-pie-war-production.up.railway.app";
  const resultsDir = "playwright-results";

  const browser = await chromium.launch({ headless: true });

  // Test 1: Landing page
  console.log("📸 Landing page...");
  const page1 = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page1.goto(baseUrl, { waitUntil: "networkidle" });
  await page1.screenshot({ path: `${resultsDir}/01-landing.png`, fullPage: true });
  console.log("  ✅ 01-landing.png");

  // Test 2: Dashboard main
  console.log("📸 Dashboard main...");
  const page2 = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page2.goto(`${baseUrl}/dashboard`, { waitUntil: "networkidle" });
  await page2.waitForTimeout(2000);
  await page2.screenshot({ path: `${resultsDir}/02-dashboard.png`, fullPage: true });
  console.log("  ✅ 02-dashboard.png");

  // Test 3: News page
  console.log("📸 News page...");
  const page3 = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page3.goto(`${baseUrl}/dashboard/news`, { waitUntil: "networkidle" });
  await page3.waitForTimeout(2000);
  await page3.screenshot({ path: `${resultsDir}/03-news.png`, fullPage: true });
  console.log("  ✅ 03-news.png");

  // Test 4: Platform comparison
  console.log("📸 Platform comparison...");
  const page4 = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page4.goto(`${baseUrl}/dashboard/platforms`, { waitUntil: "networkidle" });
  await page4.waitForTimeout(2000);
  await page4.screenshot({ path: `${resultsDir}/04-platforms.png`, fullPage: true });
  console.log("  ✅ 04-platforms.png");

  // Test 5: Insights page
  console.log("📸 Insights page...");
  const page5 = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page5.goto(`${baseUrl}/dashboard/insights`, { waitUntil: "networkidle" });
  await page5.waitForTimeout(2000);
  await page5.screenshot({ path: `${resultsDir}/05-insights.png`, fullPage: true });
  console.log("  ✅ 05-insights.png");

  // Test 6: Onboarding page
  console.log("📸 Onboarding page...");
  const page6 = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page6.goto(`${baseUrl}/dashboard/onboarding`, { waitUntil: "networkidle" });
  await page6.waitForTimeout(2000);
  await page6.screenshot({ path: `${resultsDir}/06-onboarding.png`, fullPage: true });
  console.log("  ✅ 06-onboarding.png");

  // Test 7: About page
  console.log("📸 About page...");
  const page7 = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page7.goto(`${baseUrl}/dashboard/about`, { waitUntil: "networkidle" });
  await page7.screenshot({ path: `${resultsDir}/07-about.png`, fullPage: true });
  console.log("  ✅ 07-about.png");

  // Test 8: Mobile viewport - Dashboard
  console.log("📸 Mobile viewport...");
  const mobile = await browser.newPage({ viewport: { width: 375, height: 812 } });
  await mobile.goto(`${baseUrl}/dashboard/news`, { waitUntil: "networkidle" });
  await mobile.waitForTimeout(2000);
  await mobile.screenshot({ path: `${resultsDir}/08-mobile-news.png`, fullPage: true });
  console.log("  ✅ 08-mobile-news.png");

  // Test 9: Korean title check - verify news titles are in Korean
  console.log("🌐 Checking Korean news titles...");
  const page9 = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page9.goto(`${baseUrl}/dashboard/news`, { waitUntil: "networkidle" });
  const newsTitle = await page9.textContent("h1");
  console.log(`  News page title: "${newsTitle}"`);

  // Check if Korean text is present in cards
  const koreanText = await page9.evaluate(() => {
    const cards = document.querySelectorAll("[class*='card']");
    const texts = Array.from(cards).map(c => c.textContent?.substring(0, 80));
    return texts.filter(t => t && /[가-힣]/.test(t)).slice(0, 5);
  });
  console.log(`  Korean text found in ${koreanText.length} cards`);
  koreanText.forEach((t, i) => console.log(`    Card ${i + 1}: "${t}"`));

  // Test 10: Evidence tooltip hover test
  console.log("📸 Evidence tooltip test...");
  const page10 = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page10.goto(`${baseUrl}/dashboard`, { waitUntil: "networkidle" });
  await page10.waitForTimeout(2000);
  // Try to find and hover over an evidence ? icon
  const helpIcons = await page10.$$('button[aria-label*="데이터 출처"]');
  if (helpIcons.length > 0) {
    console.log(`  Found ${helpIcons.length} evidence icons`);
    await helpIcons[0].hover();
    await page10.waitForTimeout(1000);
    await page10.screenshot({ path: `${resultsDir}/10-evidence-tooltip.png`, fullPage: false });
    console.log("  ✅ 10-evidence-tooltip.png");
  } else {
    console.log("  ⚠️ No evidence icons found");
  }

  await browser.close();
  console.log("\n✅ All screenshots captured!");
})().catch(err => {
  console.error("❌ Playwright error:", err);
  process.exit(1);
});