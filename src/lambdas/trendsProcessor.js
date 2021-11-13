class trendsWebCrawler {
  constructor(googleWebCrawler, googleSpreadsheetService, countries) {
    this.googleWebCrawler = googleWebCrawler
    this.googleSpreadsheetService = googleSpreadsheetService
    this.countries = countries
  }

  async run () {
    for (const country of this.countries) {
      console.log(`Getting Trends: ${country.name} - ${country.value}`);

      const trends = await this.googleWebCrawler.getDataFromTrends({ country });

      for (const [i, trend] of trends.entries()) {
        console.log(`Adding #trend${i + 1} from ${country.name} to the spreadsheet`);

        await this.googleSpreadsheetService.saveTrendsToSpreadsheet(
          { country: country.name, trend, spreadsheetId: process.env.SPREADSHEET_ID },
        );
      }
    }

    console.log('Flow ran successfully')
  }
};

module.exports = trendsWebCrawler;
