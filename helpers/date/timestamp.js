const parseByHour = require("./parse-by-hour");
const parseByDay = require("./parse-by-day");
const parseByMonth = require("./parse-by-month");

const parseDate = (date) => {
  const isHoursAgo =
    date.includes("часов") ||
    date.includes("часа") ||
    date.includes("час назад");
  const isDaysAgo =
    date.includes("дней") || date.includes("дня") || date.includes("вчера");

  if (isHoursAgo) {
    return parseByHour(date);
  } else if (isDaysAgo) {
    return parseByDay(date);
  } else {
    return parseByMonth(date);
  }
};

module.exports = parseDate;
