const express = require('express');
const app = express();

app.use('/register', express.static('./public/register.html'));
app.use('/login', express.static('./public/login.html'));

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/test');
const jwt = require('jsonwebtoken');
const config = require('./config');
app.set('superSecret', config.secret);
const session = require('express-session');
app.use(session({
    secret: config.secret,
    cookie: {maxAge: 100000},//30 days
    url: config.url
}));

const User = require('./user');

app.post('/register', function (req, res, next) {
    new User(req.body).save(function (err) {
        if (err) return next(err);
        console.log('User saved successfully');
        res.json({success: true});
    });
});

mongoose.connect(config.url);

/*
 app.post('/login', function (req, res, next) {
 User.findOne({name: req.body.name}, function (err, user) {
 if (err) return next(err);
 if (!user) {
 res.json({success: false, message: 'Authentication failed. User not found.'});
 }
 else if (user) {
 if (user.password != req.body.password) {
 res.json({success: false, message: 'Authentication failed. Wrong password.'});
 } else {
 var token = jwt.sign(user, app.get('superSecret'), {});
 res.json({
 success: true,
 message: 'Enjoy your token!',
 token: token
 });
 }
 }
 });
 });

 app.get('/getName',function (req, res, next) {
 const token = req.body.token || req.query.token || req.headers['x-access-token'];
 if (token) {
 jwt.verify(token, app.get('superSecret'), function (err, decoded) {
 if (err) {
 return res.json({success: false, message: 'Failed to authenticate token.'});
 }
 else {
 // if everything is good, save to request for use in other routes
 req.decoded = decoded;
 res.send(decoded._doc);
 }
 });
 }
 else {// if there is no token
 return res.status(403).send({
 success: false,
 message: 'No token provided.'
 });
 }
 });
 */

const port = process.env.PORT || config.port;
app.listen(port,()=>{
    console.log('Listening on  http://localhost:' + port);
});
