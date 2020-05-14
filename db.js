
var environment = process.env.NODE_ENV || 'development';
var config = require('./knexfile.js')[environment];

// console.log(config);
console.log('Load DB');
module.exports = require('knex')(config);

