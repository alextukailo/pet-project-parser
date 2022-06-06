const parseFullDate = require("./../date/timestamp");
const constants = require("./../../lib/constants");

exports.selectors = ($, item, type) => {
  switch (type) {
    case constants.TARGET_TYPE.AV:
      return {
        name: $(item).find("h3.listing-item__title").text(),
        photo_thumb: $(item).find(".listing-item__photo").find("img").attr("data-src"),
        link: "https://cars.av.by" + $(item).find(".listing-item__link").attr("href"),
        location: $(item).find(".listing-item__location").text(),
        posted_timestamp: parseFullDate($(item).find(".listing-item__date").text()),
        scrape_date: $(item).find(".listing-item__date").text(),
        production_year: $(item).find(".listing-item__params").find("div:first-child").text(),
        short_info: $(item).find(".listing-item__params").find("div:nth-child(2)").text(),
        mileage: $(item).find(".listing-item__params").find("div:nth-child(3)").find("span").text(),
        priceByn: $(item).find(".listing-item__price").text(),
        priceUsd: $(item).find(".listing-item__priceusd").text(),
      }
    case constants.TARGET_TYPE.KUFAR:
      return {
        name: $(item).find(".kf-aCSR-806ed").find("h3.kf-aCV-520e3").text(),
        photo_thumb: $(item).find(".kf-aAzt-ddf28").find("img").attr("data-src"),
        link: $(item).children().attr("href"),
        location: $(item).find(".kf-aCSY-33abf").text(),
        posted_timestamp: parseFullDate($(item).find(".kf-aCSU-5b9d4").find("span:contains('Сегодня')").text()),
        scrape_date: $(item).find(".kf-aCSU-5b9d4").find("span:contains('Сегодня')").text(),
        production_year: $(item).find(".kf-aCSw-cf1bc").text(),
        short_info: $(item).find("p.kf-aCU-5d6a1.kf-aCMh-f94a0").text(),
        mileage: $(item).find(".kf-aCSH-4949c").text(),
        priceByn: $(item).find(".kf-aCP-07949").find("span:first-child").text(),
        priceUsd: $(item).find(".kf-aCP-07949").find("span:last-child").text(),
      }
    default:
      return null
  }
}
