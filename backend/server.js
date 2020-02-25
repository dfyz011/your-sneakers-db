const express = require("express");

const config=require('dotenv').config();
process.env["SECRET"] ="asdfqwerty";
process.env["PORT"] ="7000";
process.env["DB"] ="mongodb://localhost:27017/sneakerShop";
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const usersRouter = require('./routes/users');
const sneakersRouter = require('./routes/sneakers');
const path = require("path");
const app = express();
const db = require("./database/db.js");

require("./passport")(passport);


const apiPort = process.env.PORT;

app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(cors());
app.use(bodyParser.json());

app.use(passport.initialize());

app.use('/api/sneakers', sneakersRouter);
app.use('/api/users', usersRouter);


app.use(express.static(path.join(__dirname, '../client/build')));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/build/', 'index.html'));
});
app.listen(apiPort);