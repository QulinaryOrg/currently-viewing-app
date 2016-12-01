"use strict";

let winston = require("winston");

module.exports = app => {
    let logger;
    if (process.env.NODE_ENV !== "test") {
        logger = new (winston.Logger)({
            transports: [
                new (winston.transports.Console)(),
                new (winston.transports.File)({ filename: "stdout.log" })
            ]
        });
    } else {
        /**
         * Use this logger while testing
         * This won't pollute the console
         * */
        logger = new (winston.Logger)({
            transports: [
                new (winston.transports.File)({ filename: "stdout.log" })
            ]
        });
    }

    return logger;
};
