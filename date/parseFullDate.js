const Sugar = require("sugar");
const parseByMonth = require("./parseByMonth");

const parseDate = (date) => {
  let time = 0;

  let dates = new Sugar.Date("March 15").raw;
  
  const isHoursAgo =
  date.includes("часов") ||
  date.includes("часа") ||
  date.includes("час назад");
  const isDaysAgo =
  date.includes("дней") || date.includes("дня") || date.includes("вчера");
  console.log(date);
  
  const getByHoursAgo = (date) => {
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
  
  const getByDaysAgo = (date) => {
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
  console.log("test", dates);
  
  if (isHoursAgo) {
    return getByHoursAgo(date);
  } else if (isDaysAgo) {
    return getByDaysAgo(date);
  } else {
    return parseByMonth(date);
  }
};

module.exports = parseDate;
