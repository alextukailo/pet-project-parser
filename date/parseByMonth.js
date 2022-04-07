const Sugar = require("sugar");

const parseByMonth = (date) => {
  if(date.includes("января")) {
    time = date.split(" января")[0];
    return new Sugar.Date(`January ${time}`).raw;
  } else if(date.includes("февраля")) {
    time = date.split(" февраля")[0];
    return new Sugar.Date(`February ${time}`).raw;
  } else if(date.includes("марта")) {
    time = date.split(" марта")[0];
    return new Sugar.Date(`March ${time}`).raw;
  } else if(date.includes("апреля")) {
    time = date.split(" апреля")[0];
    return new Sugar.Date(`April ${time}`).raw;
  } else if(date.includes("мая")) {
    time = date.split(" мая")[0];
    return new Sugar.Date(`May ${time}`).raw;
  } else if(date.includes("июня")) {
    time = date.split(" июня")[0];
    return new Sugar.Date(`June ${time}`).raw;
  } else if(date.includes("июля")) {
    time = date.split(" июля")[0];
    return new Sugar.Date(`July ${time}`).raw;
  } else if(date.includes("августа")) {
    time = date.split(" августа")[0];
    return new Sugar.Date(`August ${time}`).raw;
  } else if(date.includes("сентября")) {
    time = date.split(" сентября")[0];
    return new Sugar.Date(`September ${time}`).raw;
  } else if(date.includes("октября")) {
    time = date.split(" октября")[0];
    return new Sugar.Date(`October ${time}`).raw;
  }  else if(date.includes("ноября")) {
    time = date.split(" ноября")[0];
    return new Sugar.Date(`November ${time}`).raw;
  }  else if(date.includes("декабря")) {
    time = date.split(" декабря")[0];
    return new Sugar.Date(`December ${time}`).raw;
  }
}

module.exports = parseByMonth;