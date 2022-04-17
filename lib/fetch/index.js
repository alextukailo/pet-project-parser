const axios = require("axios");

const fetchAPI = async (URI) => {
  const res = await axios.get(URI)
  return await res
}

module.exports = fetchAPI;