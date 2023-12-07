const express = require("express");

const router = express.Router();

const AuthController = require("../controllers/authController");

router.get("/signup", AuthController.signupGet);

router.post("/signup", AuthController.signupPost);

module.exports = router;