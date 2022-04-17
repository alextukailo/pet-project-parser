const cheerio = require("cheerio");

const getScrapedData = require("../lib/cheerio");
const constants = require("../lib/constants");
const fetchAPI = require("../lib/fetch");

const writeFile = require("../utils");

const scrapeAv = async () => {
  try {
    const { data } = await fetchAPI(constants.TARGET);
    const $ = cheerio.load(data);
    const listItems = $(".listing-item");
    const cars = getScrapedData($, listItems, constants.TARGET_TYPE.AV);

    writeFile(cars, "carsAv");
  } catch (err) {
    console.log(constants.SERVER_STATUS.ERROR, err);
  }
};

module.exports = scrapeAv;
