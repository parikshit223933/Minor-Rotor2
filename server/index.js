const express = require('express');
const app = express();
const port = 8000;
const chalk = require('chalk');
const routes = require('./routes');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');
const sessionName = 'something'; // to be changed at production
const sessionSecret = 'something'; // to be changed at production

app.use(
	sassMiddleware({
		src: './assets/SCSS',
		dest: './assets/CSS',
		debug: true,
		outputStyle: 'extended',
		prefix: '/CSS',
	})
);

app.use(cors()); // enable all
app.use(express.static('./assets'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(
	session({
		name: sessionName,
		secret: sessionSecret,
		saveUninitialized: false, // don't create session until something stored
		resave: false, //don't save session if unmodified
		cookie: {
			maxAge: 1000 * 60 * 60 * 24, // one day
		},
		store: new MongoStore(
			{
				mongooseConnection: db,
			},
			(error) =>
				console.log(
					chalk.greenBright.bold(
						error || 'Connect-Mongo setup is working fine!'
					)
				)
		),
	})
);
app.use('/', routes);

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
