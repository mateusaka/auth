const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

const AuthController = {
    signupGet: async (req, res) => {
        try {
            res.render("signup-form");
        } catch (error) {
            res.send("Error");
        }
    },

    signupPost: async (req, res) => {
        try {
            const user = new User({
                username: req.body.username,
                password: bcrypt.hashSync(req.body.password)
            });

            await user.save();

            res.redirect("/auth/login");
        } catch (error) {
            res.send("Error");
        }
    },

    loginGet: async (req, res) => {
        try {
            res.render("login-form");
        } catch (error) {
            res.send("Error");
        }
    },

    loginPost: passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/"
    }),

    logoutGet: async (req, res) => {
        req.logout((error) => {
            if(error) {
                res.send("Error");
            }

            res.redirect("/");
        });
    },

    currentUser: (req, res, next) => {
        res.locals.currentUser = req.user;

        next();
    }
}

module.exports = AuthController;