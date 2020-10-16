var express = require("express"),
    bodyParser = require("body-parser"),
    flash = require('connect-flash'),
    session = require('express-session');
    

var app = express();
require('dotenv').config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", 'ejs');
app.use(express.static(__dirname + "/public"));

var db = require('./db');
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false
}));
app.use(flash());


app.get('/', (req, res) => {
    res.render('index.ejs', {message: req.flash("failure")});
});

app.post('/addUser',db.addUser);
app.get('/admin/:pin',db.admin);

app.listen(process.env.port || 3000, () => console.log("Server is Started!"));
