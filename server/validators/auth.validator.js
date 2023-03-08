import validatorMiddleware from "../middleware/validator.middleware.js";
import {check} from "express-validator";
import {isPasswordsMatches, isUnique} from "./custom.validators.js";
import User from "../model/userModel.js";

export const registerValidator = [
  check("username")
    .notEmpty()
    .withMessage("Username is required")
    .isString()
    .withMessage("Username must be a string")
    .isLength({min: 3})
    .withMessage("Username minimum length 3 characters")
    .isLength({max: 30})
    .withMessage("Username maximum length 30 characters"),
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .custom((val) => isUnique(val, User, "email")),
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isString()
    .withMessage("Password must be a string")
    .isLength({min: 6})
    .withMessage("Password minimum length 6 characters")
    .isLength({max: 25})
    .withMessage("Password maximum length 25 characters"),
  check("confirmPassword")
    .notEmpty()
    .withMessage("confirmPassword is required")
    .custom((val, {req}) => isPasswordsMatches(val, req)),
  check("image").optional(),
  validatorMiddleware,
];

export const loginValidator = [
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email address"),
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isString()
    .withMessage("Password must be a string")
    .isLength({min: 6})
    .withMessage("Password minimum length 6 characters")
    .isLength({max: 25})
    .withMessage("Password maximum length 25 characters"),
  validatorMiddleware,
];
