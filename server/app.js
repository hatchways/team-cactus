var createError = require("http-errors");
var express = require("express");
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var passport = require("passport");
var cors = require("cors");
const routes = require("./routes/index.js");
var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Allow cross-origin requests on all resources
app.use(cors());
app.options('*', cors());

// Connect to MongoDB
const db_connect_uri = process.env.MONGO_URI;
mongoose.connect(db_connect_uri, { useNewUrlParser: true, retryWrites: true, w: "majority" })
  	.then(() => console.log("MongoDB successfully connected"))
  	.catch(err => console.log(err));

// Passport middleware and config
app.use(passport.initialize());
require("./config/passport")(passport);

// Connect all our API routes to our app
app.use("/", routes);

//Amazon S3 Upload
// var s3FileUpload = require('./routes/s3Upload');
// app.use('/api', s3FileUpload);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = app;
