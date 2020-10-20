const mongoose = require('mongoose');
const chalk = require('chalk');

mongoose.connect('mongodb://localhost/automate', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db=mongoose.connection;

db.on('error', console.log.bind(console, 'Error in connecting to the database!'));

db.once('open', ()=>console.log(chalk.greenBright.bold('Connected to the database!')));

module.exports = db;