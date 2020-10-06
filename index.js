const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');
const request = require('request')

const PORT = process.env.PORT || 5000;

//Set handlebar middleware here
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// API key pk_14ed8241ef3a4c45b50938dc759d1375
request('https://cloud.iexapis.com/stable/stock/fb/quote?token=pk_14ed8241ef3a4c45b50938dc759d1375', { json: true }, (err, res, body) => {
    if (err) {return console.log(err);}
    console.log(body);
    if (res.statusCode === 200) {
        console.log(body);
    };
});

// set routes for handlebars
app.get('/', function (req, res) {
    res.render('home');
});

// creating routes for about handlebars
app.get('/about.html', function (req, res) {
    res.render('about');
});

// create a static folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log('Server Listening on port' + PORT));