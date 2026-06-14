const { chromium } = require('playwright');

(async () => {
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  // Log console and errors
  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  page.on('pageerror', err => console.error('BROWSER ERROR:', err.message));

  console.log('Navigating to New Product Page...');
  try {
    await page.goto('http://localhost:3000/admin/products/new', { 
      waitUntil: 'networkidle',
      timeout: 15000 
    });
  } catch (error) {
    console.error('Failed to load page:', error);
    await browser.close();
    process.exit(1);
  }

  // Find Select All checkbox
  const selectAllLabel = page.locator('label:has-text("Select All")');
  const selectAllCheckbox = selectAllLabel.locator('input[type="checkbox"]');
  
  const initialSelectAllChecked = await selectAllCheckbox.isChecked();
  console.log(`Initial Select All checked state: ${initialSelectAllChecked}`);

  // Find other category checkboxes
  const categoryCheckboxes = page.locator('input[name="categoryIds"]');
  const count = await categoryCheckboxes.count();
  console.log(`Found ${count} category checkboxes.`);

  // Click Select All
  console.log('Clicking Select All...');
  await selectAllCheckbox.click();
  await page.waitForTimeout(500);

  // Verify all category checkboxes are now checked
  let allChecked = true;
  for (let i = 0; i < count; i++) {
    const isChecked = await categoryCheckboxes.nth(i).isChecked();
    if (!isChecked) {
      allChecked = false;
      console.error(`Checkbox ${i} is NOT checked after Select All click.`);
    }
  }
  console.log(`Are all checkboxes checked? ${allChecked}`);

  // Take screenshot
  const screenshotPath = '/Users/suman/.gemini/antigravity-ide/brain/de600a6e-8123-4859-9cab-cec75dff9961/admin_select_all.png';
  console.log(`Taking screenshot to: ${screenshotPath}`);
  
  // Focus or scroll to Classification section
  const classificationHeading = page.locator('h3:has-text("Classification")');
  if (await classificationHeading.isVisible()) {
    await classificationHeading.scrollIntoViewIfNeeded();
  }
  
  await page.waitForTimeout(1000);
  await page.screenshot({ path: screenshotPath });

  // Click Select All again to uncheck
  console.log('Clicking Select All again...');
  await selectAllCheckbox.click();
  await page.waitForTimeout(500);

  // Verify all category checkboxes are now unchecked
  let allUnchecked = true;
  for (let i = 0; i < count; i++) {
    const isChecked = await categoryCheckboxes.nth(i).isChecked();
    if (isChecked) {
      allUnchecked = false;
      console.error(`Checkbox ${i} is still checked after unselecting.`);
    }
  }
  console.log(`Are all checkboxes unchecked? ${allUnchecked}`);

  if (allChecked && allUnchecked) {
    console.log('TEST PASSED: "Select All" works perfectly for categories!');
  } else {
    console.error('TEST FAILED: "Select All" check/uncheck logic failed.');
  }

  await browser.close();
})();
