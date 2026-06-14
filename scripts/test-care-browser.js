const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const artifactDir = "/Users/suman/.gemini/antigravity-ide/brain/de600a6e-8123-4859-9cab-cec75dff9961/artifacts";
  if (!fs.existsSync(artifactDir)) {
    fs.mkdirSync(artifactDir, { recursive: true });
  }
  const screenshotPath = path.join(artifactDir, "plant_care_test.png");

  console.log("Launching browser...");
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  page.on('console', msg => console.log('BROWSER LOG:', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err));

  try {
    console.log("Navigating to http://localhost:3000/care...");
    await page.goto('http://localhost:3000/care', { waitUntil: 'networkidle' });

    console.log("Waiting for plant cards...");
    await page.waitForSelector('h3');

    // Get list of visible plant names
    const plants = await page.locator('h3').allTextContents();
    console.log("Available plants:", plants);

    // Click the first plant card button
    console.log("Selecting the first plant card...");
    await page.locator('button.group').first().click();

    // Wait for quiz screen
    console.log("Waiting for quiz screen...");
    await page.waitForSelector('text=Customize Your Plant Care Guide');

    // Click "Generate Care Guide" button
    console.log("Clicking Generate Care Guide...");
    await page.locator('button:has-text("Generate Care Guide")').click();

    // Wait for the AI assistant view to load
    console.log("Waiting for AI Horticulturist view...");
    await page.waitForSelector('text=AI Horticulturist');

    // Wait for AI streaming output (say, up to 10 seconds)
    console.log("Waiting for AI response streaming...");
    await page.waitForTimeout(10000);

    // Capture screenshot
    console.log(`Saving screenshot to ${screenshotPath}...`);
    await page.screenshot({ path: screenshotPath, fullPage: true });

    console.log("Test finished successfully!");
  } catch (error) {
    console.error("Test failed with error:", error);
  } finally {
    await browser.close();
  }
})();
