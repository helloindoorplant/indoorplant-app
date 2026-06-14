from playwright.sync_api import sync_playwright
import os

def run():
    artifact_dir = "/Users/suman/.gemini/antigravity-ide/brain/de600a6e-8123-4859-9cab-cec75dff9961/artifacts"
    os.makedirs(artifact_dir, exist_ok=True)
    screenshot_path = os.path.join(artifact_dir, "plant_care_test.png")

    with sync_playwright() as p:
        print("Launching browser...")
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        
        page.on("console", lambda msg: print(f"Browser Console: {msg.type}: {msg.text}"))
        page.on("pageerror", lambda err: print(f"Browser Error: {err}"))
        
        try:
            print("Navigating to Plant Care page...")
            page.goto('http://localhost:3000/care', wait_until='networkidle')
            
            # Wait for plant cards grid to render
            print("Waiting for plant cards to load...")
            page.wait_for_selector('h3')
            
            # Print available plant names
            plants = page.locator('h3').all_text_contents()
            print("Available plants found on page:", plants)
            
            # Click the first plant card
            print("Selecting the first plant card...")
            page.locator('button.group').first.click()
            
            # Wait for Quiz Step
            print("Waiting for quiz form...")
            page.wait_for_text("Customize Your Plant Care Guide")
            
            # Select some options if needed (they have defaults selected)
            # Click Generate Care Guide button
            print("Clicking Generate Care Guide...")
            page.locator('button:has-text("Generate Care Guide")').click()
            
            # Wait for AI streaming (Step 3: AI Assistant)
            print("Waiting for AI streaming stream...")
            page.wait_for_selector('text=AI Horticulturist')
            
            # Wait 8 seconds for streaming response to finish generating
            page.wait_for_timeout(8000)
            
            # Capture screenshot
            print(f"Capturing screenshot and saving to {screenshot_path}...")
            page.screenshot(path=screenshot_path, full_page=True)
            print("Verification script finished successfully!")
            
        except Exception as e:
            print(f"Error occurred during test: {e}")
        finally:
            browser.close()

if __name__ == '__main__':
    run()
