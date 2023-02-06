const axios = require("axios");
const logger = require("../../logger");
const constants = require("../lib/constants");

const serviceAv = async () => {
  try {
    return await axios.get(constants.CARS_AV_TARGET)
  } catch (error) {
    logger.error(error)
  }
}

module.exports = serviceAv;