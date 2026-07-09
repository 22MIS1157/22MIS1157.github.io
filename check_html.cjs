const puppeteer = require('puppeteer');

(async () => {
  console.log('Launching Puppeteer...');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  console.log('Navigating to http://localhost:4173');
  await page.goto('http://localhost:4173', { waitUntil: 'networkidle0' });

  const html = await page.content();
  console.log(html);

  await browser.close();
})();
