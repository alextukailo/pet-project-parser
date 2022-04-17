const cheerio = require("cheerio");

const getScrapedData = require("../lib/cheerio");
const constants = require("../lib/constants");
const fetchAPI = require("../lib/fetch");

const writeFile = require("../utils");

const scrapeKufar = async () => {
  try {
    const { data } = await fetchAPI(constants.TARGET2);
    const $ = cheerio.load(data);
    const pageNumber = $(".kf-zPzS-11622").eq(-2).text();
    const listItems = $(".kf-aRES-05a6c section");
    const cars = getScrapedData($, listItems, constants.TARGET_TYPE.KUFAR);

    writeFile(cars, "carsKufar");
  } catch (err) {
    throw new Error(constants.SERVER_STATUS.ERROR, err);
  }
};

module.exports = scrapeKufar;
