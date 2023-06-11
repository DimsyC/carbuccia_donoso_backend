const dotenv = require('dotenv');
const path = require('path');

// Determine the environment
const env = process.env.NODE_ENV || 'dev';

// Specify the path to the .env file based on the environment
const envPath = path.resolve(__dirname, `.env.${env}`);

// Load the environment variables from the specified .env file
dotenv.config({ path: envPath });

// Configuration object
const config = {
  cxnString: process.env.DB_CXN_STRING,
  dbName: process.env.DB_NAME,
  host: process.env.HOST,
  port: process.env.PORT
};

module.exports = config;