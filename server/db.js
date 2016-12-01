import config from "./config";
const mongoose = require('mongoose');

// Use native Node promises
mongoose.Promise = global.Promise;

// connect to MongoDB
export const mongoConnect =
  () => mongoose.connect(config.dbUrl)
  .then(() => console.log('Connection Successful'))
  .catch((err) => console.error(err));
