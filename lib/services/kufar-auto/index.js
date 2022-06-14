const axios = require("axios");
const logger = require("../../logger");
const constants = require("../lib/constants");

const serviceKufar = async () => {
  try {
    return await axios.get(constants.KUFAR_AUTO_TARGET)
  } catch (error) {
    logger.error(error)
  }
}

module.exports = serviceKufar;