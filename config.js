// const DATABASE_URL = process.env.DATABASE_URL || global.DATABASE_URL;
// 'postgresql://dev:dev@localhost/hacker-news-api'
require('dotenv').config();
const {DATABASE_URL} = process.env;
exports.DATABASE = {
	client: 'pg',
	connection: DATABASE_URL,
	debug: false
};

exports.PORT = process.env.PORT || 8080; 

console.log(DATABASE_URL);