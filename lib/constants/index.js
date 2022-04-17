exports.SERVER_STATUS = {
  DONE: "Done",
  STARTED: "Server has been started",
  ERROR: "Error",
};

exports.TARGET = "https://cars.av.by/filter?page=2";
exports.TARGET2 = "https://auto.kufar.by/l/cars?cur=BYR";

exports.PORT = process.env.PORT || 3000;

exports.TARGET_TYPE = {
  AV: "av",
  KUFAR: "kufar",
};
