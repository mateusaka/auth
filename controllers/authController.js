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
                password: req.body.password
            });

            await user.save();

            res.redirect("/");
        } catch (error) {
            res.send("Error");
        }
    }
}

module.exports = AuthController;