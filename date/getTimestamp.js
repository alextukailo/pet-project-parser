const parseByHour = require("./parseByHour");
const parseByDay = require("./parseByDay");
const parseByMonth = require("./parseByMonth");

const parseDate = (date) => {
  const isHoursAgo =
    date.includes("часов") ||
    date.includes("часа") ||
    date.includes("час назад");
  const isDaysAgo =
    date.includes("дней") || date.includes("дня") || date.includes("вчера");

  console.log(date);

  if (isHoursAgo) {
    return parseByHour(date);
  } else if (isDaysAgo) {
    return parseByDay(date);
  } else {
    return parseByMonth(date);
  }
};

module.exports = parseDate;
