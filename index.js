const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const hbs = require('hbs');
const expressHbs = require('express-handlebars');

const app = express();

const http = require('http').Server(app);

const config = require('./config/secret');

app.engine('.hbs', expressHbs({
    defaultLayout: 'layout',
    extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect(config.database, { useNewUrlParser: true }, function(err, db) {
    if (err) console.log(err);
    console.log(`Connected to Database`);
});

const mainRoutes = require('./routes/main');
app.use(mainRoutes);

http.listen(config.port, (err) => {
    if(err) console.log(err);
    console.log(`Running on port ${config.port}`);
});