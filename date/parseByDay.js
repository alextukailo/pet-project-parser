const Sugar = require("sugar");

const parseByDay = (date) => {
  let time = 0;

  if (date.includes("дней")) {
    time = date.split(" дней назад")[0];
    return new Sugar.Date(`${time} days ago`).raw;
  } else if (date.includes("дня")) {
    time = date.split(" дня назад")[0];
    return new Sugar.Date(`${time} days ago`).raw;
  } else if (date.includes("вчера")) {
    return new Sugar.Date(`1 day ago`).raw;
  }
};

module.exports = parseByDay;
