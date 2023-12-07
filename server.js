require('dotenv').config();

const express = require("express");
const session = require("express-session");

const passport = require("passport");
const path = require("path");
const db = require("./database/database");

const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");

const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");

const app = express();

const PORT = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/auth", authRouter);

app.listen(PORT, () => {
    console.log("Server is up!");

    db.then(() => {
        console.log("DB is up!");
    })
    .catch(error => {
        console.log("Error on DB: " + error);
    });    
});