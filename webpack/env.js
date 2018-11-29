require('dotenv').config();

module.exports = {
	NODE_ENV: process.env.NODE_ENV,
	APP_NAME: process.env.APP_NAME,
	PORT: process.env.PORT,
};