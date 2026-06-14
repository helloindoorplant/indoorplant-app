const { chromium } = require('playwright');
const path = require('path');

(async () => {
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  // Log browser console messages
  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  page.on('pageerror', err => console.error('BROWSER ERROR:', err.message));

  console.log('Navigating to blog post...');
  try {
    await page.goto('http://localhost:3000/blog/decorative-plants-for-home-online-india', { 
      waitUntil: 'networkidle',
      timeout: 15000 
    });
  } catch (error) {
    console.error('Failed to load page:', error);
    await browser.close();
    process.exit(1);
  }

  // Scroll down to the carousel section
  console.log('Scrolling to product carousel...');
  await page.evaluate(() => {
    const headings = Array.from(document.querySelectorAll('h2'));
    const target = headings.find(el => el.textContent.includes('Featured Plants') || el.textContent.includes('Shop the Guide'));
    if (target) {
      target.scrollIntoView({ behavior: 'auto', block: 'center' });
    } else {
      window.scrollTo(0, document.body.scrollHeight * 0.7);
    }
  });

  // Wait for images to load
  await page.waitForTimeout(3000);

  // Take screenshot
  const screenshotPath = '/Users/suman/.gemini/antigravity-ide/brain/de600a6e-8123-4859-9cab-cec75dff9961/blog_carousel.png';
  console.log(`Taking screenshot to: ${screenshotPath}`);
  await page.screenshot({ path: screenshotPath });

  // Check if products exist in carousel
  const productCardsCount = await page.locator('div.snap-start').count();
  console.log(`Number of product cards found in carousel: ${productCardsCount}`);

  if (productCardsCount > 0) {
    console.log('TEST PASSED: Product card carousel renders successfully!');
  } else {
    console.error('TEST FAILED: No product cards found in the carousel.');
  }

  await browser.close();
})();
