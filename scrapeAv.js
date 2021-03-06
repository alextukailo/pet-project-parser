const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const constants = require("./constants");
const parseFullDate = require("./date/getTimestamp.js");

const scrapeAv = async () => {
  const cars = [];

  try {
    const { data } = await axios.get(constants.TARGET);
    const $ = cheerio.load(data);
    const listItems = $(".listing-item");
    console.log('test', listItems)
    listItems.each((key, item) => {
      const car = {
        name: "",
        photo_thumb: "",
        link: "",
        location: "",
        posted_timestamp: "",
        scrape_date: "",
        production_year: "",
        short_info: "",
        mileage: "",
        price: {
          byn: "",
          usd: "",
        },
      };

      car.name = $(item).find("h3.listing-item__title").text();
      car.photo_thumb = $(item)
        .find(".listing-item__photo")
        .find("img")
        .attr("data-src");
      car.link =
        "https://cars.av.by" + $(item).find(".listing-item__link").attr("href");
      car.location = $(item).find(".listing-item__location").text();
      car.posted_timestamp = parseFullDate(
        $(item).find(".listing-item__date").text()
      );
      car.scrape_date = $(item).find(".listing-item__date").text();
      car.production_year = $(item)
        .find(".listing-item__params")
        .find("div:first-child")
        .text();
      car.short_info = $(item)
        .find(".listing-item__params")
        .find("div:nth-child(2)")
        .text();
      car.mileage = $(item)
        .find(".listing-item__params")
        .find("div:nth-child(3)")
        .find("span")
        .text();
      car.price.byn = $(item).find(".listing-item__price").text();
      car.price.usd = $(item).find(".listing-item__priceusd").text();
      cars.push(car);
    });
    console.log(cars);

    fs.writeFile("carsAv.json", JSON.stringify(cars, null, 2), (err) => {
      if (err) {
        console.log(constants.SERVER_STATUS.ERROR, err);
        return;
      }
      console.log(constants.SERVER_STATUS.DONE);
    });
  } catch (err) {
    console.log(constants.SERVER_STATUS.ERROR, err);
  }
};

module.exports = scrapeAv;
