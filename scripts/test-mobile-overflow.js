const { chromium } = require('playwright');

const pagesToTest = ['/', '/shop', '/care', '/contact', '/about', '/ai-advisor'];
const baseUrl = 'http://localhost:3000';

(async () => {
  const issuesFound = [];
  const browser = await chromium.launch({ headless: true });
  
  // iPhone 13 viewport
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1'
  });
  
  const page = await context.newPage();

  for (const route of pagesToTest) {
    const url = `${baseUrl}${route}`;
    console.log(`Testing ${url} for mobile overflow...`);
    try {
      await page.goto(url, { waitUntil: 'networkidle' });
      const hasOverflow = await page.evaluate(() => {
        return document.body.scrollWidth > document.documentElement.clientWidth;
      });
      
      if (hasOverflow) {
        const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
        const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
        issuesFound.push(`OVERFLOW DETECTED on ${route}: scrollWidth (${scrollWidth}px) > clientWidth (${clientWidth}px)`);
      } else {
        console.log(`OK: ${route}`);
      }
    } catch (e) {
      console.log(`Error testing ${route}: ${e.message}`);
    }
  }
  
  await browser.close();

  if (issuesFound.length > 0) {
    console.log("\n=== ISSUES FOUND ===");
    issuesFound.forEach(issue => console.log(issue));
    process.exit(1);
  } else {
    console.log("\nAll tested pages passed mobile overflow checks.");
    process.exit(0);
  }
})();
