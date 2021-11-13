'use strict';

class GoogleWebCrawler {
  constructor(webCrawler, baseURL) {
    this.webCrawler = webCrawler
    this.baseURL = baseURL
  }

  async getDataFromTrends ({ country }) {

    const browser = await this.webCrawler.launch({ headless: false })
    const page = await browser.newPage()
    
    await page.goto(`${this.baseURL}?geo=${country.value}`, { waitUntil: 'networkidle0' })

    const trendsData = await page.evaluate(() => { 
      const trends = []

      document.querySelectorAll(".details").forEach(el => {
        const trend = {
          name: el.querySelector(".title").textContent.replace(/\s+/g, ' '),
          url: el.querySelector(".details-bottom a").href
        }
        trends.push(trend)
      })

      return trends
    })

    await browser.close()

    return trendsData
  };
} 

module.exports = GoogleWebCrawler;