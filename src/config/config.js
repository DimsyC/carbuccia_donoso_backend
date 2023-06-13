const dotenv = require('dotenv');
const path = require('path');

// Determine the environment
const env = process.env.NODE_ENV || 'dev';

// Specify the path to the .env file based on the environment
const envPath = path.resolve(__dirname, `.env.${env}`);

// Load the environment variables from the specified .env file
dotenv.config({ path: envPath });


const mongodb = {
  cxnString: process.env.DB_CXN_STRING,
  dbName: process.env.DB_NAME,
}

const express = {
  host: process.env.HOST,
  port: process.env.PORT,
}

const googleOAuth = {
  clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
  clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET
}

const jwt = {
  secret: process.env.JWT_SECRET,
  duration: process.env.JWT_DURATION,
}

// Configuration object
const config = {
  mongodb,
  express,
  googleOAuth,
  jwt
};

module.exports = config;

