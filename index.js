const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');

const PORT = process.env.PORT || 5000;

//Set handlebar middleware here
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// set routes for handlebars
app.get('/', function (req, res) {
    res.render('home');
});

// create a static folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log('Server Listening on port' + PORT));