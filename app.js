const express = require('express');
const app = express();

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User  = require('./user');

const jwt = require('jsonwebtoken');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
var port = process.env.PORT || 8080;

app.listen(port);
console.log('Magic happens at http://localhost:' + port);