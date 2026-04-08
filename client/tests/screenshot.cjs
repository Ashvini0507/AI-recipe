const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
  
  // Wait a bit more for Splash screen to hide
  await new Promise(r => setTimeout(r, 4000));
  
  await page.screenshot({ path: 'screenshot.png' });
  const html = await page.content();
  const fs = require('fs');
  fs.writeFileSync('page.html', html);
  
  await browser.close();
})();
