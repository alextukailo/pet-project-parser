const { default: mongoose } = require("mongoose");

    const Car = new mongoose.Schema({
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