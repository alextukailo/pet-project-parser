const Sugar = require("sugar");

const parseByHour = (date) => {
  let time = 0;

  if (date.includes("часов")) {
    time = date.split(" часов назад")[0];
    return new Sugar.Date(`${time} hours ago`).raw;
  } else if (date.includes("часа")) {
    time = date.split(" часа назад")[0];
    return new Sugar.Date(`${time} hours ago`).raw;
  } else if (date.includes("час назад")) {
    return new Sugar.Date(`1 hour ago`).raw;
  }
};

module.exports = parseByHour;
