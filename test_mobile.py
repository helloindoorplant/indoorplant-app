from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    # create a mobile viewport
    context = browser.new_context(viewport={'width': 375, 'height': 812}, is_mobile=True)
    page = context.new_page()
    page.goto('http://localhost:3000/product/njoy-money-plant')
    page.wait_for_load_state('networkidle')
    page.screenshot(path='mobile_view.png', full_page=True)
    browser.close()
