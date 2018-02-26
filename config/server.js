const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const aplication = express();

aplication.set('view engine', 'ejs');
aplication.set('views', './app/views');
aplication.use(express.static('./app/public'));
aplication.use(bodyParser.urlencoded({extended: true}));
aplication.use(expressValidator());
consign()
    .include('app/routes')
    .then('app/models')
    .then('app/controllers')
    .into(aplication);

/* exportar o objeto app */
module.exports = aplication;