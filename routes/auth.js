const express = require("express");
const { check, body } = require("express-validator");

const authController = require("../controllers/auth");
const User = require("../models/user");

const router = express.Router();

router.get("/login", authController.getLogin);

router.get("/signup", authController.getSignup);

router.get("/reset-password", authController.getResetPassword);

router.get("/new-password/:token", authController.getNewPassword);

router.post("/new-password", authController.postNewPassword);

router.post("/reset-password", authController.postResetPassword);

router.post(
  "/login",
  [
    check("email").isEmail().withMessage("Invalid e-mail address!"),
    check("password", "Pls, enter a valid password")
      .isLength({ min: 5 })
      .isAlphanumeric(),
  ],
  authController.postLogin
);

router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("Invalid e-mail, pls enter a valid e-mail")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((resp) => {
          if (resp) {
            return Promise.reject("E-mail already existis!");
          }
        });
      }),
    body(
      "password",
      "Pls, enter a password with only numbers and text and at least 5 characteres"
    )
      .isLength({ min: 5 })
      .isAlphanumeric(),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords have to match!");
      }
      return true;
    }),
  ],
  authController.postSignup
);

router.post("/logout", authController.postLogout);

module.exports = router;
