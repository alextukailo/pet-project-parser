const fs = require("fs");
const constants = require("../lib/constants");

const writeFile = (data, fileName) => {
  fs.writeFile(`data/${fileName}.json`, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.log(constants.SERVER_STATUS.ERROR, err);
      return;
    }
    console.log(constants.SERVER_STATUS.DONE);
  });
}

module.exports = writeFile;