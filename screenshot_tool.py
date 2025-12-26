import asyncio
import os
from urllib.parse import urljoin, urlparse
from playwright.async_api import async_playwright
import requests
from bs4 import BeautifulSoup

START_URL = "https://hadash.org.il/"
BASE_DOMAIN = urlparse(START_URL).netloc
SCREENSHOT_DIR = "screenshots"

async def take_screenshot(page, url):
    try:
        print(f"Capturing: {url}")
        await page.goto(url, wait_until="networkidle", timeout=60000)
        
        # Create a filename from the URL
        parsed = urlparse(url)
        path = parsed.path.strip("/").replace("/", "_") or "index"
        filename = f"{path}.png"
        filepath = os.path.join(SCREENSHOT_DIR, filename)
        
        # Ensure directory exists
        os.makedirs(os.path.dirname(filepath), exist_ok=True)
        
        await page.screenshot(path=filepath, full_page=True)
        print(f"Saved: {filepath}")
    except Exception as e:
        print(f"Error capturing {url}: {e}")

async def crawl_and_screenshot():
    os.makedirs(SCREENSHOT_DIR, exist_ok=True)
    
    visited = set()
    queue = [START_URL]
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        # Set viewport to a common desktop size
        await page.set_viewport_size({"width": 1280, "height": 800})

        while queue:
            url = queue.pop(0)
            if url in visited:
                continue
            
            visited.add(url)
            
            # Take screenshot
            await take_screenshot(page, url)
            
            # Find more links to crawl (simpler to do this via requests to avoid overhead in Playwright for just finding links)
            try:
                response = requests.get(url, timeout=10)
                if response.status_code == 200:
                    soup = BeautifulSoup(response.text, 'html.parser')
                    for a in soup.find_all('a', href=True):
                        href = a['href']
                        full_url = urljoin(url, href)
                        parsed_full = urlparse(full_url)
                        
                        # Only follow links on the same domain and avoid non-html files
                        if (parsed_full.netloc == BASE_DOMAIN and 
                            full_url not in visited and 
                            not any(full_url.endswith(ext) for ext in ['.jpg', '.png', '.pdf', '.zip'])):
                            queue.append(full_url)
            except Exception as e:
                print(f"Error finding links on {url}: {e}")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(crawl_and_screenshot())
