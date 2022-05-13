const Car = require("../../../../models/car");

const sendDataToDB = async (data) => {
    Car.collection.insertMany(data, (err, docs) => {
      err ? console.log(err) : console.log("Cars have been inserted");
    });
}

module.exports = sendDataToDB;