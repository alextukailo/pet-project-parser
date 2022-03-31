const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cheerio = require('cheerio');
const pretty = require('pretty');
const fs = require("fs");
const constants = require('./constants');
const parseDate = require('./helpers.js');
const BodyParser = require('body-parser');

const app = express()

const cars = [];

const scrapeData = async () => {
    try {
        const { data } = await axios.get(constants.TARGET);
        const $ = cheerio.load(data);
        const listItems = $('.listing-item');
        listItems.each((key, item) => {
            const car = {
                name: '',
                photo_thumb: '',
                link: '',
                location: '',
                posted_timestamp: '',
                scrape_date: '',
                production_year: '',
                short_info: '',
                mileage: '',
                price: {
                    byn: '',
                    usd: ''
                }
            };

            car.name = $(item).find('h3.listing-item__title').text();
            car.photo_thumb = $(item).find('.listing-item__photo').find('img').attr('data-src');
            car.link = 'https://cars.av.by' + $(item).find('.listing-item__link').attr('href');
            car.location = $(item).find('.listing-item__location').text();
            car.posted_timestamp = parseDate($(item).find('.listing-item__date').text());
            car.scrape_date = $(item).find('.listing-item__date').text();
            car.production_year = $(item).find('.listing-item__params').find('div:first-child').text();
            car.short_info = $(item).find('.listing-item__params').find('div:nth-child(2)').text();
            car.mileage =  $(item).find('.listing-item__params').find('div:nth-child(3)').find('span').text();
            car.price.byn = $(item).find('.listing-item__price').text();
            car.price.usd = $(item).find('.listing-item__priceusd').text();
            cars.push(car);
        })
        console.log(cars);
        
        fs.writeFile('cars.json', JSON.stringify(cars, null, 2), (err) => {
            if(err) {
                console.log(constants.SERVER_STATUS.ERROR, err);
                return;
            }
            console.log(constants.SERVER_STATUS.DONE);
        })
    } catch (err) {
        console.log(constants.SERVER_STATUS.ERROR, err);
    }
}
scrapeData();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));


const CarModel = mongoose.model('cars', {
  name: String,
  url: String,
  photo_thumb: String,
  link: String,
  location: String,
  posted_timestamp: String,
  scrape_date: String,
  production_year: String,
  short_info: String,
  mileage: String,
  price: {
      byn: String,
      usd: String
  },
  created: { type: Date, default: Date.now },
})

app.post('/cars', async (req, res, next) => {
  try {
    const car = new CarModel(req.body);
    const result = await car.save();
    res.send(result);
  } catch (err) {
    res.status(500).send(err)
  }
})

app.get('/cars', async (req, res, next) => {
  try {
    const result = await CarModel.find().exec();
    res.send(result);
  } catch (err) {
    res.status(500).send(err)
  }
})

// app.get('/', (req, res) => {
//     fs.readFile('./app.js', 'utf8', (err, data) => {
//       if (err) {
//         throw err;
//       }
//       res.send((data));
//     });
//   });

app.listen(constants.PORT)

mongoose.connect('mongodb://localhost:27017', {useNewUrlParser: true, useUnifiedTopology: true});
