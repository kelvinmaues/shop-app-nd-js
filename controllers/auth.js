const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const nodemailter = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const User = require("../models/user");

const transporter = nodemailter.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        "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",
    },
  })
);

exports.getLogin = (req, res, next) => {
  const errMsg = req.flash("error");
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    errorMessage: errMsg.length > 0 ? errMsg : null,
  });
};

exports.getSignup = (req, res, next) => {
  const errMsg = req.flash("error");
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    errorMessage: errMsg.length > 0 ? errMsg : null,
  });
};

exports.postLogin = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        req.flash("error", "Invalid email or password.");
        return res.redirect("/login");
      }
      bcrypt
        .compare(password, user.password)
        .then((isMatched) => {
          if (isMatched) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save((err) => {
              res.redirect("/");
            });
          }
          req.flash("error", "Invalid email or password.");
          res.redirect("/login");
        })
        .catch((err) => {
          res.redirect("/login");
        });
    })
    .catch((err) => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;

  User.findOne({ email: email })
    .then((resp) => {
      if (resp) {
        req.flash("error", "E-mail exists already.");
        return res.redirect("/signup");
      }
      return bcrypt
        .hash(password, 12)
        .then((hashResponse) => {
          const user = new User({
            name,
            email,
            password: hashResponse,
            cart: { items: [] },
          });
          return user.save();
        })
        .then(() => {
          res.redirect("/login");
          return transporter
            .sendMail({
              to: email,
              from: "kgmdeveloper@gmail.com",
              subject: "Welcome to Shop",
              html: "<h1>You successfully signed up!</h1>",
            })
            .catch((err) => console.log(err));
        });
    })
    .catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};

exports.getResetPassword = (req, res, next) => {
  const errMsg = req.flash("error");
  res.render("auth/reset", {
    path: "/reset-password",
    pageTitle: "Reset Password",
    errorMessage: errMsg.length > 0 ? errMsg : null,
  });
};

exports.postResetPassword = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      return res.redirect("/reset-password");
    }
    const token = buffer.toString("hex");
    const { email } = req.body;

    User.findOne({ email: email })
      .then((user) => {
        if (!user) {
          req.flash("error", "No account with this email");
          return res.redirect("/reset-password");
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        return user.save();
      })
      .then((resp) => {
        res.redirect("/");
        return transporter
          .sendMail({
            to: email,
            from: "kgmdeveloper@gmail.com",
            subject: "Let's reset your password",
            html: `
                <div>
                  <p>
                    You requested a password reset
                  </p>
                  <p>
                    Click this <a href="http://localhost:3003/new-password/${token}">link</a> to set a new password.                  
                  </p>
                </div>
              `,
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  });
};

exports.getNewPassword = (req, res, next) => {
  const errMsg = req.flash("error");
  const { token } = req.params;

  User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
    .then((user) => {
      res.render("auth/new-password", {
        path: "/new-password",
        pageTitle: "New Password",
        errorMessage: errMsg.length > 0 ? errMsg : null,
        userId: user._id.toString(),
        passwordToken: token,
      });
    })
    .catch((err) => console.log(err));
};

exports.postNewPassword = (req, res, next) => {
  const { password, userId, passwordToken } = req.body;
  let resetUser;

  User.findOne({
    resetToken: passwordToken,
    resetTokenExpiration: { $gt: Date.now() },
    _id: userId,
  })
    .then((user) => {
      resetUser = user;
      return bcrypt.hash(password, 12);
    })
    .then((hashedPassword) => {
      resetUser.password = hashedPassword;
      resetUser.resetToken = undefined;
      resetUser.resetTokenExpiration = undefined;
      return resetUser.save();
    })
    .then(() => res.redirect("/login"))
    .catch((err) => console.log(err));
};
