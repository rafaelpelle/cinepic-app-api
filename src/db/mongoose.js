const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const { DATABASE_URI, DATABASE_NAME } = process.env;

mongoose.connect(`${DATABASE_URI}/${DATABASE_NAME}?retryWrites=true`, {
  useNewUrlParser: true,
});
