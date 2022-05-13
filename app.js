const Car = require("./models/car.js");
const connectDB = require("./database/connect.js");
const scrapeAv = require("./scrape/Av.js");
const scrapeKufar = require("./scrape/Kufar.js");

//Uncomment the line bellow and comment scrape functions to clear db collection
// Car.collection.deleteMany({})

const initScripts = {
  init: function () {
    connectDB();
    scrapeAv();
    // scrapeKufar();
    
  }
}
initScripts.init()
