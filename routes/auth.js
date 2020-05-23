const express = require("express");
const { check } = require("express-validator");

const authController = require("../controllers/auth");

const router = express.Router();

router.get("/login", authController.getLogin);

router.get("/signup", authController.getSignup);

router.get("/reset-password", authController.getResetPassword);

router.get("/new-password/:token", authController.getNewPassword);

router.post("/new-password", authController.postNewPassword);

router.post("/reset-password", authController.postResetPassword);

router.post("/login", authController.postLogin);

router.post(
  "/signup",
  check("email")
    .isEmail()
    .withMessage("Invalid e-mail, pls enter a valid e-mail"),
  authController.postSignup
);

router.post("/logout", authController.postLogout);

module.exports = router;
