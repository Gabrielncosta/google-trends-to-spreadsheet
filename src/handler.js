require('dotenv').config()
const puppeteer = require('puppeteer');
const axios = require('axios');
const GoogleSpreadsheetService = require('./services/googleSpreadsheetService');
const GoogleWebCrawler = require('./services/googleWebCrawler');
const countries = require("./countries/countries.json")
const TrendsProcessor = require('./lambdas/trendsProcessor')

async function handler() {
  const token = process.env.GOOGLE_AUTH_TOKEN
  const googleTrendsBaseURL = process.env.GOOGLE_TRENDS_URL;

  try {
   const googleSpreadsheetService = new GoogleSpreadsheetService(axios, token);
   const googleWebCrawler = new GoogleWebCrawler(puppeteer, googleTrendsBaseURL);
   const trendsProcessor = new TrendsProcessor(googleWebCrawler, googleSpreadsheetService, countries)
   trendsProcessor.run()
  } catch (err) {
    console.log('Error: ', err);
  }
};

handler();