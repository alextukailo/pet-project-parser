const axios = require("axios");
const constants = require("../lib/constants");

const serviceKufar = async () => {
  try {
    return await axios.get(constants.KUFAR_AUTO_TARGET)
  } catch (error) {
    console.log(error);
  }
}

module.exports = serviceKufar;