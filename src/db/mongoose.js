const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const { DATABASE_URI, DATABASE_NAME } = process.env;

mongoose.connection.on('connected', function () {
  console.log('Mongoose connection open to ' + DATABASE_NAME);
});

mongoose.connection.on('error', function (err) {
  console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose connection disconnected');
});

mongoose.connect(`${DATABASE_URI}/${DATABASE_NAME}?retryWrites=true`, {
  useNewUrlParser: true,
});
