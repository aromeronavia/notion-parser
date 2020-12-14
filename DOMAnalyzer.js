const puppeteer = require("puppeteer");

const waitTime = 5 * 1000;

class DOMAnalyzer {
  constructor(url, dataObserver) {
    this.url = url;
    this.dataObserver = dataObserver;
  }

  async run() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setRequestInterception(true);

    function isBlacklisted(url) {
      return !url.includes("notion.so");
    }

    page.on("request", (request) => {
      const url = request.url();

      if (isBlacklisted(url)) {
        request.abort();
        return;
      }

      request.continue();
    });

    page.on("requestfailed", (request) => {
      const url = request.url();
      if (isBlacklisted(url)) return;
      console.log("request failed url:", url);
    });

    page.on("response", async (response) => {
      const request = response.request();
      const url = request.url();
      const desiredEndpoint = "loadPageChunk";

      if (!url.includes(desiredEndpoint)) {
        return;
      }

      const data = await response.json();
      this.dataObserver.createBlockTree(data);
    });

    await page.goto(this.url, { waitUntil: "networkidle2" });
    await page.waitFor(waitTime);
  }
}

module.exports = DOMAnalyzer;
