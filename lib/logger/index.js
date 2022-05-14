const winston = require('winston');
const { combine, timestamp, printf, colorize, align, json } = winston.format;
const { createLogger, transports } = require("winston");
const { DB } = require("../../database/constants");
require("winston-mongodb");

const errorFilter = winston.format((info, opts) => {
  return info.level === 'error' ? info : false;
});

const infoFilter = winston.format((info, opts) => {
  return info.level === 'info' ? info : false;
});

const logger = createLogger({
  format: combine(
    colorize({ all: true }),
    timestamp({
      format: 'YYYY-MM-DD hh:mm:ss.SSS A',
    }),
    align(),
    printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
  ),
  transports: [
    new winston.transports.File({
      filename: 'combined.log',
    }),
    new winston.transports.File({
      filename: 'app-error.log',
      level: 'error',
      format: combine(errorFilter(), timestamp(), json()),
    }),
    new winston.transports.File({
      filename: 'app-info.log',
      level: 'info',
      format: combine(infoFilter(), timestamp(), json()),
    }),
    new transports.Console({
      level: "info",
    }),
    new transports.MongoDB({
      db: DB,
      level: "error",
      collection: "cars",
    }),
  ],
});

logger.info('Info message');
logger.error('Error message');
logger.warn('Warning message');

module.exports = logger;
