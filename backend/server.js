const express = require("express");
require('dotenv').config();
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const db = require("./database/db.js");
const usersRouter = require('./routes/users');
const sneakersRouter = require('./routes/sneakers');
const path = require("path");
const app = express();
const apiPort = process.env.PORT;
require("./passport")(passport);

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