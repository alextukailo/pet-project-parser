const fs = require("fs");
const constants = require("../lib/constants");
const logger = require("../lib/logger");

const writeFile = (data, fileName) => {
  fs.writeFile(`data/${fileName}.json`, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      logger.error(err)
      return;
    }
    logger.info(constants.SERVER_STATUS.DONE)
  });
}

module.exports = writeFile;