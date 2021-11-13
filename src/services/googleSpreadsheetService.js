class GoogleSpreadsheetService {
  constructor(httpClient, token) {
    this.httpClient = httpClient;
    this.token = token
  }

  async saveTrendsToSpreadsheet({ country, trend, spreadsheetId }) {
    const body = {
      values: [
        [
          country,
          trend.name,
          trend.url,
        ],

      ],
    };

    const config = {
      headers: { Authorization: `Bearer ${this.token}` },
      params: {
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
      },
    };

    return await this.httpClient.post(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/A1:D1:append`,
      body,
      config,
    );
  }
}

module.exports = GoogleSpreadsheetService;
