import validatorMiddleware from "../middleware/validator.middleware.js";
import {check} from "express-validator";
import {isUnique} from "./custom.validators.js";
import User from "../model/userModel.js";

export const getSingleUserValidator = [
  check("id").isMongoId().withMessage("Invalid Id format"),
  validatorMiddleware,
];

export const deleteSingleUserValidator = [
  check("id").isMongoId().withMessage("Invalid id format"),
  validatorMiddleware,
];

export const updateSingleUserValidator = [
  check("id").isMongoId().withMessage("Invalid id format"),
  check("username")
    .optional()
    .isLength({min: 3})
    .withMessage("Username length 3 characters")
    .isLength({max: 30})
    .withMessage("Username maximum length 30 characters"),
  check("email")
    .optional()
    .isEmail()
    .withMessage("Please enter a valid email address")
    .custom((val) => isUnique(val, User, "email")),
  check("role").optional(),
  validatorMiddleware,
];

export const updateMyProfileValidator = [
  check("username")
    .optional()
    .isLength({min: 3})
    .withMessage("Username length 3 characters")
    .isLength({max: 30})
    .withMessage("Username maximum length 30 characters"),
  check("email")
    .optional()
    .isEmail()
    .withMessage("Please enter a valid email address")
    .custom((val) => isUnique(val, User, "email")),
  validatorMiddleware,
];

export const updateMyPasswordValidator = [
  check("currentPassword")
    .notEmpty()
    .withMessage("Please enter your current password")
    .isLength({min: 3})
    .withMessage("Current password minimum length 6 characters")
    .isLength({max: 30})
    .withMessage("Current password maximum length 25 characters"),
  check("newPassword")
    .notEmpty()
    .withMessage("Please enter your new password")
    .isLength({min: 6})
    .withMessage("New password minimum length 6 characters")
    .isLength({max: 25})
    .withMessage("New password maximum length 25 characters"),
  check("confirmNewPassword")
    .notEmpty()
    .withMessage("Please confirm your new password")
    .custom((val, {req}) => {
      if (val !== req.body.newPassword) {
        throw new Error(
          `New password confirmation does not match new password`
        );
      }
      // Indicates the success of this synchronous custom validator
      return true;
    }),
  validatorMiddleware,
];
