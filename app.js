const scrapeAv = require("./scrape/Av.js");
const scrapeKufar = require("./scrape/Kufar.js");

const initScripts = {
  init: function () {
    scrapeAv();
    scrapeKufar();
  }
}
initScripts.init()
