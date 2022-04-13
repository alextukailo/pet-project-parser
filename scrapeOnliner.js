const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const constants = require("./constants");
const parseFullDate = require("./date/getTimestamp.js");

const scrapeOnliner = async () => {
  const cars = [];

  try {
    const { data } = await axios.get(constants.TARGET2);
    const $ = cheerio.load(data);
    const listItems = $(".vehicle-form__offers-list");
    // console.log('test', listItems);
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

      car.name = $(item).find(".vehicle-form__link").text();
      car.photo_thumb = $(item)
        .find(".vehicle-form__preview")
        .children(".vehicle-form__image")
        .attr("style")
        .replace("background-image: ", "");
      car.link = "https://ab.onliner.by/" + $(item).attr("href");
      car.location = $(item)
        .find(".vehicle-form__offers-part_city")
        .children()
        .text();
      car.posted_timestamp = parseFullDate(
        $(item).find(".vehicle-form__offers-part_time").children().text()
      );
      car.scrape_date = $(item)
        .find(".vehicle-form__offers-part_time")
        .children()
        .text();
      car.production_year = $(item)
        .find(".vehicle-form__offers-part_year")
        .children()
        .text();
      car.short_info = $(item)
        .find(".listing-item__params")
        .find("div:nth-child(2)")
        .text();
      car.mileage = $(item)
        .find(".vehicle-form__offers-part_mileage")
        .children()
        .text();
      car.price.byn = $(item).find(".vehicle-form__offers-part_price").children().find("div:first-child").text();
      car.price.usd = $(item).find(".vehicle-form__offers-part_price").children().find("div:last-child").text();
      cars.push(car);
    });

    fs.writeFile("carsOnliner.json", JSON.stringify(cars, null, 2), (err) => {
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

module.exports = scrapeOnliner;
