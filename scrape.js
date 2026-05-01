const scrape = require('website-scraper').default;
const PuppeteerPlugin = require('website-scraper-puppeteer').default;

scrape({
  urls: ['https://www.gatoescondido.net/'],
  directory: './cloned-site',
  plugins: [
    new PuppeteerPlugin({
      launchOptions: { headless: 'new' },
      scrollToBottom: { timeout: 10000, viewportN: 10 },
      blockNavigation: true,
    })
  ],
  recursive: true,
  maxDepth: 3,
  sources: [
    { selector: 'img', attr: 'src' },
    { selector: 'link[rel="stylesheet"]', attr: 'href' },
    { selector: 'script', attr: 'src' },
    { selector: 'video', attr: 'src' },
    { selector: 'source', attr: 'src' },
    { selector: 'link[rel="icon"]', attr: 'href' },
    { selector: 'link[rel="apple-touch-icon"]', attr: 'href' },
    { selector: 'a', attr: 'href' }, // Follow links for recursive scraping
  ]
}).then((result) => {
  console.log("Website successfully cloned");
}).catch((err) => {
  console.error("Error cloning website", err);
});
