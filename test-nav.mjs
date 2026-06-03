import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext();
const page = await context.newPage();

page.on('console', msg => console.log('CONSOLE:', msg.type(), msg.text()));
page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

await page.goto('http://localhost:3000/');
await page.waitForTimeout(2000);

// Click search button - try multiple selectors
const searchBtn = await page.locator('button:has-text("Search")').first();
console.log('Found search button:', await searchBtn.count() > 0);
await searchBtn.click();
await page.waitForTimeout(500);

// Type in search
const input = await page.locator('input[type="text"]').first();
await input.fill('elon');
await page.waitForTimeout(500);

// Click first result with Elon Musk
const results = await page.locator('button:has-text("Elon Musk")').all();
console.log('Found results:', results.length);
if (results.length > 0) {
  await results[0].click();
}
await page.waitForTimeout(3000);

const html = await page.content();
console.log('Has error page:', html.includes('Something went wrong'));
console.log('Has Elon:', html.includes('Elon Musk'));
console.log('Page title:', await page.title());

await browser.close();
