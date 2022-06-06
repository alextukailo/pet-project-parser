const cheerio = require("cheerio");

const { getScrapedData } = require("../lib/cheerio");
const constants = require("../lib/constants");
const logger = require("../lib/logger");
const service = require("../lib/services");
const sendDataToDB = require("../lib/services/av-cars/send");

const writeFile = require("../utils");

const scrapeAv = async () => {
  try {
    const { data } = await service(constants.CARS_AV_TARGET);
    const $ = cheerio.load(data);
    const listItems = $(".listing-item");
    const cars = getScrapedData($, listItems, constants.TARGET_TYPE.AV);
    await sendDataToDB(cars);
    writeFile(cars, "carsAv");
  } catch (err) {
    logger.error(err)
  }
};

module.exports = scrapeAv;
