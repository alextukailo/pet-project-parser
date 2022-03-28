const axios = require('axios');
const cheerio = require('cheerio');
const pretty = require('pretty');
const fs = require("fs");

const url = 'https://cars.av.by/filter?page=2';

const scrapeData = async () => {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const listItems = $('.listing-item');
        const cars = [];
        listItems.each((key, item) => {
            const car = {
                name: '',
                photo_thumb: '',
                location: '',
                date: '',
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
            car.location = $(item).find('.listing-item__location').text();
            car.date = $(item).find('.listing-item__date').text();
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
                console.log(err)
                return;
            }
            console.log('status: done')
        })
    } catch (err) {
        console.log(err);
    }
}
scrapeData();