//my stock market app
const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require("ejs");

const PORT = process.env.PORT || 5000;

// data base info


// use body parser middleware
//app.use(bodyParser.urlencoded({useNewUrlParser: true} to MongoClient.connect.));

mongoose.connect("mongodb:/localhost:27017/userDB", {useNewUrlParser: true});

// API key pk_14ed8241ef3a4c45b50938dc759d1375
// create call_api function
function call_api(finishedAPI, ticker) {
	request('https://cloud.iexapis.com/stable/stock/' + ticker + '/quote?token=pk_14ed8241ef3a4c45b50938dc759d1375', { json: true }, (err, res, body) => {
	if (err) {return console.log(err);}
	if (res.statusCode === 200){
		//console.log(body);
		finishedAPI(body);
		};
	});
};


// Set Handlebars Middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars', 'ejs');

const otherstuff = "hello there, this is other stuff!";

// Set handlebar index GET route
app.get('/', function (req, res) {
	call_api(function(doneAPI) {
			res.render('home', {
	    	stock: doneAPI,
    	});
	}, "fb");
		
});

// Set handlebar index POST route
app.post('/', function (req, res) {
	call_api(function(doneAPI) {
			//console.log(doneAPI);
			//posted_stuff = req.body.stock_ticker;
			res.render('home', {
	    	stock: doneAPI,
    	});
	}, req.body.stock_ticker);
		
});


// create about page route
app.get('/about.html', function (req, res) {
    res.render('about');
});

// create signup page route
app.get('/signup.html', function (req, res) {
    res.render('signup');
});
app.get('/start.ejs', function (req, res) {
    res.render('start');
});

app.get('/login.ejs', function (req, res) {
    res.render('login');
});

app.get('/register.ejs', function (req, res) {
    res.render('register');
});


// Set static folder
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => console.log('Server Listening on port ' + PORT));