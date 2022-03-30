const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cheerio = require('cheerio');
const pretty = require('pretty');
const fs = require("fs");
const constants = require('./constants');

const app = express()

const cars = [];



const parseDate = (date) => {
    const today = new Date();
    const isHoursAgo = date.includes('часов') || date.includes('часа') || date.includes('час назад');
    const isDaysAgo = date.includes('дней') || date.includes('дня');
    let newDate = '';
    
    const getHoursAgo = (date) => {
      if(date.includes('часов')) {
        return date.split(' часов назад')[0];
      } else if(date.includes('часа')) {
        return date.split(' часа назад')[0];
      } else if(date.includes('час назад')) {
        return 1;
      }
    }
  
    const getDaysAgo = (date) => {
      if(date.includes('дней')) {
        return date.split(' дней назад')[0];
      } else if(date.includes('дня')) {
        return date.split(' дня назад')[0];
      }
  }
    
    if(isHoursAgo) {
      newDate = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()} ${today.getHours() - getHoursAgo(date)}:${today.getMinutes()}:${today.getSeconds()}`;
      return new Date(newDate).toISOString();
    } else if(isDaysAgo) {
      newDate = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate() - getDaysAgo(date)} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
      return new Date(newDate).toISOString();
    } else {
      return date;
    }
}

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



app.get('/', (req, res) => {
    fs.readFile('./app.js', 'utf8', (err, data) => {
      if (err) {
        throw err;
      }
      res.send((data));
    });
  });

app.listen(constants.PORT)

// mongoose.connect('mongodb://localhost:27017/{db name}')
//     .then(() => {
//         console.log('test connection')
//     })