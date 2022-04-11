const express = require("express");
const mongoose = require("mongoose");
const BodyParser = require("body-parser");

const scraper = require("./scraper.js");

const app = express();

scraper();

// app.use(BodyParser.json());
// app.use(BodyParser.urlencoded({ extended: true }));

// const CarModel = mongoose.model("cars", {
//   name: String,
//   url: String,
//   photo_thumb: String,
//   link: String,
//   location: String,
//   posted_timestamp: String,
//   scrape_date: String,
//   production_year: String,
//   short_info: String,
//   mileage: String,
//   price: {
//     byn: String,
//     usd: String,
//   },
//   created: { type: Date, default: Date.now },
// });

// app.post("/cars", async (req, res, next) => {
//   try {
//     const car = new CarModel(req.body);
//     const result = await car.save();
//     res.send(result);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// app.get("/cars", async (req, res, next) => {
//   try {
//     const result = await CarModel.find().exec();
//     res.send(result);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// app.listen(constants.PORT);

// mongoose.connect("mongodb://localhost:27017", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
