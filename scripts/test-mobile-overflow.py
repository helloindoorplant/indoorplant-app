from playwright.sync_api import sync_playwright
import sys

pages_to_test = ['/', '/shop', '/care', '/contact', '/about', '/ai-advisor']
base_url = 'http://localhost:3000'

def test_mobile_overflow():
    issues_found = []
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # iPhone 13 viewport
        context = browser.new_context(
            viewport={'width': 390, 'height': 844},
            user_agent='Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1'
        )
        page = context.new_page()

        for route in pages_to_test:
            url = f"{base_url}{route}"
            print(f"Testing {url} for mobile overflow...")
            try:
                page.goto(url, wait_until='networkidle')
                # Check if body scroll width is greater than client width
                has_overflow = page.evaluate("() => document.body.scrollWidth > document.documentElement.clientWidth")
                if has_overflow:
                    scroll_width = page.evaluate("document.body.scrollWidth")
                    client_width = page.evaluate("document.documentElement.clientWidth")
                    issues_found.append(f"OVERFLOW DETECTED on {route}: scrollWidth ({scroll_width}px) > clientWidth ({client_width}px)")
                else:
                    print(f"OK: {route}")
            except Exception as e:
                print(f"Error testing {route}: {e}")
        
        browser.close()
    return issues_found

if __name__ == '__main__':
    issues = test_mobile_overflow()
    if issues:
        print("\n=== ISSUES FOUND ===")
        for issue in issues:
            print(issue)
        sys.exit(1)
    else:
        print("\nAll tested pages passed mobile overflow checks.")
        sys.exit(0)
