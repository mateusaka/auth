const express = require("express");

const router = express.Router();

const AuthController = require("../controllers/authController");

// SIGN UP
router.get("/signup", AuthController.signupGet);

router.post("/signup", AuthController.signupPost);

// LOG IN
router.get("/login", AuthController.loginGet);

router.post("/login", AuthController.loginPost);

// LOG OUT
router.get("/logout", AuthController.logoutGet);

module.exports = router;