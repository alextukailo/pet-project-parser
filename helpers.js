const Sugar = require('sugar')

const parseDate = (date) => {
  const today = new Date();
  const time = 0;

  var dates = new Sugar.Date('10 hours ago');
  console.log('test', dates.raw)

  const isHoursAgo =
    date.includes("часов") ||
    date.includes("часа") ||
    date.includes("час назад");
  const isDaysAgo =
    date.includes("дней") || date.includes("дня") || date.includes("вчера");
  let newDate = "";
  console.log(date);

  const getHoursAgo = (date) => {
    if (date.includes("часов")) {
      time = date.split(" часов назад")[0]
      
      return 
    } else if (date.includes("часа")) {
      return date.split(" часа назад")[0];
    } else if (date.includes("час назад")) {
      return 1;
    }
  };

  const getDaysAgo = (date) => {
    if (date.includes("дней")) {
      return date.split(" дней назад")[0];
    } else if (date.includes("дня")) {
      return date.split(" дня назад")[0];
    } else if (date.includes("вчера")) {
      return 1;
    }
  };

  const calculateByHours = (date) => {
    if (today.getHours() < getHoursAgo(date)) {
      newDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate() - getDaysAgo(date)} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
      return new Date(newDate).toISOString();
    } else {
      newDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate() - getDaysAgo(date)} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
      return new Date(newDate).toISOString();
    }
  };

  const calculateByDays = (date) => {
    if(today.getDate() > getDaysAgo(date)) {
      newDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate() - getDaysAgo(date)} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
      return new Date(newDate).toISOString();
    } else {
      newDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate() - getDaysAgo(date)} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
      return new Date(newDate).toISOString();
    }
  }

  if (isHoursAgo) {
    return calculateByHours(date)
  } else if (isDaysAgo) {
    return calculateByDays(date)
  } else {
    return date;
  }
};

module.exports = parseDate;
