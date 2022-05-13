const axios = require("axios");
const constants = require("../lib/constants");

const serviceAv = async () => {
  try {
    return await axios.get(constants.CARS_AV_TARGET)
  } catch (error) {
    console.log(error);
  }
}

module.exports = serviceAv;