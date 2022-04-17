const cheerio = require("cheerio");
const { selectors } = require("../../helpers/selectors");
const fetchAPI = require("../fetch");

const getHTML = async (url) => {
  const { data } = await fetchAPI(url);
  return cheerio.load(data);
}

const getScrapedData = ($, listItems, type) => {
  const cars = [];
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

    car.name = selectors($, item, type).name;
    car.photo_thumb = selectors($, item, type).photo_thumb;
    car.link = selectors($, item, type).link;
    car.location = selectors($, item, type).location;
    car.posted_timestamp = selectors($, item, type).posted_timestamp;
    car.scrape_date = selectors($, item, type).scrape_date;
    car.production_year = selectors($, item, type).production_year;
    car.short_info = selectors($, item, type).short_info;
    car.mileage = selectors($, item, type).mileage;
    car.price.byn = selectors($, item, type).priceByn;
    car.price.usd = selectors($, item, type).priceUsd;
    cars.push(car);
  });

  return cars;
};

module.exports = getHTML;
module.exports = getScrapedData;
