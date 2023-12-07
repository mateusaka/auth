require('dotenv').config();

const express = require("express");
const session = require("express-session");

const passport = require("passport");
const path = require("path");
const db = require("./database/database");
const bcrypt = require("bcryptjs");

const LocalStrategy = require("passport-local").Strategy;

const User = require("./models/user");

const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");

const app = express();

const PORT = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await User.findOne({ username: username });

            const match = bcrypt.compareSync(password, user.password);

            if(!user || !match) {
                return done(null, false, { message: "Incorrect username or password" });
            }

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    })
);
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);

        done(null, user);
    } catch (error) {
        done(error);
    }
});

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