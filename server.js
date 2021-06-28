const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const app = express();
const serverRouter = require("./routes/serverroutes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: "One secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.listen(8080);

app.use("/server", serverRouter);

mongoose.connect("mongodb://localhost:27017/xitachat", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
