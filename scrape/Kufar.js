const cheerio = require("cheerio");

const { getScrapedData } = require("../lib/cheerio");
const constants = require("../lib/constants");
const logger = require("../lib/logger");
const service = require("../lib/services");

const writeFile = require("../utils");

const scrapeKufar = async () => {
  try {
    const { data } = await service(constants.KUFAR_AUTO_TARGET);
    const $ = cheerio.load(data);
    const pageNumber = $(".kf-zPzS-11622").eq(-2).text();
    const listItems = $(".kf-aRES-05a6c section");
    const cars = getScrapedData($, listItems, constants.TARGET_TYPE.KUFAR);

    writeFile(cars, "carsKufar");
  } catch (err) {
    logger.error(err)
  }
};

module.exports = scrapeKufar;
