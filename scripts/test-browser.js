const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  
  await page.goto('http://localhost:3000/ai-advisor');
  await page.fill('input[placeholder="Ask me anything about plants..."]', 'I need an easy plant for my office desk');
  await page.keyboard.press('Enter');
  
  await page.waitForTimeout(5000);
  await browser.close();
})();
