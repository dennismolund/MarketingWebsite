const path = require('path')
const express = require('express')
const expressHandlebars = require('express-handlebars')
const session = require('express-session')

const variousRouter = require('./routers/various-router')
const accountRouter = require('./routers/account-router')
const bookingRouter = require('./routers/booking-router')

const redis = require('redis')
const redisClient = redis.createClient({host: 'redis-database'})
const redisStore = require('connect-redis')(session)
const app = express() 




app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: false,
	store: new redisStore({ client: redisClient})
  }))

// Setup express-handlebars.
app.set('views', path.join(__dirname, 'views'))

app.engine('hbs', expressHandlebars({
	extname: 'hbs',
	defaultLayout: 'main',
	layoutsDir: path.join(__dirname, 'layouts')
}))

// Handle static files in the public folder.
app.use(express.static(path.join(__dirname, 'public')))


//body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Get client side js files. 
app.get('/public/booking.js', function (req, res) {
	res.sendFile(path.join(__dirname, 'public', 'booking.js'));
  });

app.get('/public/javatest.js', function (req, res) {
res.sendFile(path.join(__dirname, 'public', 'javatest.js'));
});

// Attach all routers.
app.use('/', variousRouter)
app.use('/accounts', accountRouter)
app.use('/booking', bookingRouter)


// Start listening for incoming HTTP requests!
app.listen(8080, function(){
	console.log('Running on 8080!')
})