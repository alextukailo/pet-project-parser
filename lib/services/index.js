const axios = require("axios");

const service = async (URI) => {
  try {
    return await axios.get(URI)
  } catch (error) {
    console.log(error);
  }
}

module.exports = service;