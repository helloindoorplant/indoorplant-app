from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        
        page.on("console", lambda msg: print(f"Browser Console: {msg.type}: {msg.text}"))
        page.on("pageerror", lambda err: print(f"Browser Error: {err}"))
        page.on("requestfailed", lambda req: print(f"Request Failed: {req.url} - {req.failure}"))
        page.on("response", lambda res: print(f"Response: {res.url} - {res.status}") if "api/chat" in res.url else None)
        
        try:
            print("Navigating to AI Advisor...")
            page.goto('http://localhost:3000/ai-advisor', wait_until='networkidle')
            
            print("Typing message...")
            # Wait for the input box and type
            page.locator('input[placeholder="Ask me anything about plants..."]').fill('I need an easy plant for my office desk')
            page.keyboard.press('Enter')
            
            print("Waiting for response...")
            page.wait_for_timeout(5000) # wait 5 seconds for the bot to reply
            
            print("Capturing screenshot...")
            page.screenshot(path='/Users/suman/.gemini/antigravity-ide/brain/de600a6e-8123-4859-9cab-cec75dff9961/artifacts/ai_advisor_test.png')
            
            print("Done")
        except Exception as e:
            print(f"Test Exception: {e}")
        finally:
            browser.close()

if __name__ == '__main__':
    run()
