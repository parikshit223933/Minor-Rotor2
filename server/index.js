const express = require('express');
const app = express();
const port = 8000;
const chalk = require('chalk');
const routes = require('./routes');
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use('/', routes);
app.use(cors()); // enable all req.
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.listen(port, (error) => {
	if (error) {
		console.log(
			chalk.redBright.bold('There was an error in starting the server!')
		);
		return;
	}
	console.log(
		chalk.greenBright.bold(`Server is running on the port ${port}`)
	);
});
