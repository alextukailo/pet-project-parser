const axios = require("axios");
const logger = require("../logger");

const service = async (URI) => {
  try {
    return await axios.get(URI)
  } catch (error) {
    logger.error(error)
  }
}

module.exports = service;