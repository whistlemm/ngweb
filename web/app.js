var express = require('express'),
	path = require('path'),
	favicon = require('serve-favicon'),
	logger = require('morgan'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	session = require('express-session'),
	mongoose = require('mongoose'),
	mongoStore = require('connect-mongo')(session),

	config = require('./config')

var app = express();

// mongoose.Promise = global.Promise
console.log(config.dbUrl)
mongoose.connect(config.dbUrl)

var route = require('./route')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
	secret: 'mobile-angular',
    saveUninitialized: false, // don't create session until something stored 
    resave: false, //don't save session if unmodified 
	store: new mongoStore({
		url: config.dbUrl,
		connection: 'sessions'
	})
}))
app.use(express.static(path.resolve(__dirname, '../')));

app.get('/', function(req, res) {
	res.sendFile(path.resolve(__dirname, '../index.html'));
});

route(app)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		console.log(err)
		// res.render('error', {
		//   message: err.message,
		//   error: err
		// });
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	console.log(err)
	// res.render('error', {
	//   message: err.message,
	//   error: {}
	// });
});

process.on('uncaughtException', (err) => {
    console.error('Caught exception: ', err.stack)
})
process.on('unhandledRejection', (reason, p) => {
    console.error("Unhandled Rejection at: Promise ", p, '; reason is: ', reason)
})
console.log('123')

// var PORT = process.env.PORT || 3000;

// app.listen(PORT, function() {
// 	console.log('app start at ' + PORT);
// })

module.exports = app;
