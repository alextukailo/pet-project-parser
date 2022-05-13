const cheerio = require("cheerio");

const { getScrapedData, getHTML } = require("../lib/cheerio");
const constants = require("../lib/constants");
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
    console.log(err)
    throw new Error(constants.SERVER_STATUS.ERROR, err);
  }
};

module.exports = scrapeKufar;
