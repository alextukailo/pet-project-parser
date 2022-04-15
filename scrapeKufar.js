const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const constants = require("./constants");
const parseFullDate = require("./date/getTimestamp.js");

const scrapeKufar = async () => {
  const cars = [];

  try {
    const { data } = await axios.get(constants.TARGET2);
    const $ = cheerio.load(data);
    const listItems = $("section a.kf-ogoL-7e49b");
    console.log('data:', listItems)
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

      car.name = $(item).find("h3.kf-ogoM-f51f8").text();
      car.photo_thumb = $(item)
        .find(".kf-mKMi-68fc4")
        .find("img")
        .attr("data-src");
      car.link = $(item).attr("href");
      car.location = $(item)
        .find(".kf-ogNp-cbdaa")
        .text();
      // car.posted_timestamp = parseFullDate(
      //   $(item).find(".vehicle-form__offers-part_time").children().text()
      // );
      car.scrape_date = $(item)
        .find(".kf-ogNv-a0806")
        .find("span")
        .text();
      car.production_year = $(item)
        .find(".kf-ogNA-d1e88")
        .text();
      car.short_info = $(item)
        .find("p.kf-ogF-a1136.kf-ogNg-e4e8f")
        .text();
      car.mileage = $(item)
        .find(".kf-ogNr-f67a5")
        .text();
      car.price.byn = $(item).find(".kf-ogs-27b91").find("span:first-child").text();
      car.price.usd = $(item).find(".kf-ogs-27b91").find("span:last-child").text();
      cars.push(car);
      
    });
    console.log(cars);

    fs.writeFile("carsKufar.json", JSON.stringify(cars, null, 2), (err) => {
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

module.exports = scrapeKufar;
