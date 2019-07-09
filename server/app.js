var createError = require("http-errors");
var express = require("express");
var mongoose = require("mongoose");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// var indexRouter = require("./routes/index");
// var pingRouter = require("./routes/ping");
var registerRouter = require("./routes/register");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Connect to MongoDB
const db = require("./config/keys").mongoURI;
mongoose.connect(db, { useNewUrlParser: true, retryWrites: true, w: "majority" })
  	.then(() => console.log("MongoDB successfully connected"))
  	.catch(err => console.log(err));


// app.use("/", indexRouter);
// app.use("/ping", pingRouter);
app.use("/", registerRouter);

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
