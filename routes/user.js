const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const{isLoggedIn} =require("../middleware.js");

const userController = require("../controllers/user.js")

// sign up route

router.get("/signup",userController.renderSignForm);

router.post("/signup",wrapAsync(userController.signup));

//login route

router.get("/login",userController.renderLoginForm);

router.post("/login",passport.authenticate("local",{failureRedirect: "/login",failureFlash:true}),
userController.login
);

// Logged route

router.get("/logout",userController.loggedout);

module.exports= router;