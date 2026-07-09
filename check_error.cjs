const puppeteer = require('puppeteer');

(async () => {
  console.log('Launching Puppeteer...');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.on('console', msg => {
    console.log(`BROWSER CONSOLE [${msg.type()}]: ${msg.text()}`);
  });

  page.on('pageerror', err => {
    console.log(`BROWSER ERROR: ${err.message}`);
  });

  console.log('Navigating to http://localhost:4173');
  await page.goto('http://localhost:4173', { waitUntil: 'networkidle0' });

  await browser.close();
  console.log('Done!');
})();
