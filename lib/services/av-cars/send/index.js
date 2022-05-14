const Car = require("../../../../models/car");
const logger = require("../../../logger");

const sendDataToDB = async (data) => {
  Car.collection.insertMany(data, (err, docs) => {
    err
      ? logger.error(error)
      : logger.info('Cars have been inserted');
  });
};

module.exports = sendDataToDB;
