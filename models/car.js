const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = new Schema({
  name: {
    type: String,
  },
  photo_thumb: {
    type: String,
  },
  link: {
    type: String,
  },
  location: {
    type: String,
  },
  posted_timestamp: {
    type: Date,
  },
  scrape_date: {
    type: String,
  },
  production_year: {
    type: String,
  },
  short_info: {
    type: String,
  },
  mileage: {
    type: String,
  },
  price: {
    byn: {
      type: String,
    },
    usd: {
      type: String,
    },
  },
}, { timestamps: true });

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
