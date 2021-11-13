const trendsProcessor = require('./trendsProcessor')
const countries = require('../countries/countries.json')

const trends = [
  {
    name: " Fluminense FC • Botafogo de Futebol e Regatas • Campeonato Carioca de Futebol Feminino • Campeonato Carioca • Clube de Regatas do Flamengo • CR Vasco da Gama ",
    url: "https://istoe.com.br/botafogo-derrota-o-fluminense-e-garante-sua-vaga-nas-semifinais-do-carioca-feminino/",
  },
  {
    name: " Clube Atlético Mineiro • Campeonato Brasileiro Série A • Hulk • Copa do Brasil • FC Porto • 2021 ",
    url: "https://ge.globo.com/futebol/times/atletico-mg/noticia/hulk-fara-59a-partida-pelo-atletico-mg-e-iguala-temporada-de-mais-jogos-da-carreira-10-anos-depois.ghtml",
  },
]

const makeGoogleWebCrawler = (token)=> {
  class GoogleWebCrawler {
    async getDataFromTrends ({ country }) {
      return trends
    }
  }
  return new GoogleWebCrawler()
}

const makeGoogleSpreadsheetService = () => {
  class GoogleSpreadsheetService {
    async saveTrendsToSpreadsheet ({ country, trend, spreadsheetId }) {
      return trends
    }
  }
  return new GoogleSpreadsheetService()
}

const makeSut = () => {
  const googleSpreadsheetService = makeGoogleSpreadsheetService()
  const googleWebCrawler = makeGoogleWebCrawler()
  const sut = new trendsProcessor(googleWebCrawler, googleSpreadsheetService, countries)
  return {
    sut,
    googleWebCrawler,
    googleSpreadsheetService
  }
}

describe('Should add trends to a spreadsheet', () => {
  it('should ', () => {
    const { sut, googleWebCrawler } = makeSut()
    const webCrawler = jest.spyOn(googleWebCrawler, 'getDataFromTrends')
    sut.run()
    expect(webCrawler).toHaveBeenCalledWith({ country: countries[0] })
  });

  it('should ', async () => {
    const { sut, googleSpreadsheetService } = makeSut()
    const webCrawler = jest.spyOn(googleSpreadsheetService, 'saveTrendsToSpreadsheet')
    await sut.run()
    expect(webCrawler).toHaveBeenCalled()
  });
});
