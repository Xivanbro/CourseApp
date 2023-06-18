const { body } = require("express-validator/check");
const User = require("../models/user");

exports.registerValidators = [
  body("email", "Please enter a valid email")
    .isEmail()
    .custom(async (value, { req }) => {
      try {
        const user = await User.findOne({ email: value });
        if (user) {
          return Promise.reject("This email is already taken");
        }
      } catch (e) {
        console.log(e);
      }
    })
    .normalizeEmail(),
  body(
    "password",
    "Password must be at least 6 characters and less than 56 characters"
  )
    .isLength({ min: 6, max: 56 })
    .isAlphanumeric()
    .trim(),
  body("confirm")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords must match");
      }
      return true;
    })
    .trim(),
  body("name", "Name must be at least 3 characters")
    .isLength({ min: 3 })
    .trim(),
];

exports.loginValidators = [
  body("email", "Please write valid email")
    .isEmail()
    .custom(async (value, { req }) => {
      try {
        const candidate = await User.findOne({ email: value });
        if (!candidate) {
          return Promise.reject("User with this email doesn't exist");
        }
      } catch (err) {
        console.log(err);
      }
    })
    .normalizeEmail(),
  body(
    "password",
    "Password must be at least 6 characters and less than 56 characters"
  )
    .isLength({ min: 6, max: 56 })
    .isAlphanumeric()
    .trim()
];
exports.courseValidators = [
  body("title")
    .isLength({ min: 3 })
    .withMessage("The minimum name length is 3 characters")
    .trim(),
  body("price").isNumeric().withMessage("Enter valid price"),
  body("img", "Enter valid URL of image").isURL(),
];