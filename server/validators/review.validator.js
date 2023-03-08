import validatorMiddleware from "../middleware/validator.middleware.js";
import {check} from "express-validator";
import {
  isReviewedBefore,
  didYouOwner,
  didYouOwnerOrAdmin,
} from "./custom.validators.js";
import Review from "../model/reviewModel.js";

export const getReviewValidator = [
  check("id").isMongoId().withMessage("Invalid id format"),
  validatorMiddleware,
];
export const createReviewValidator = [
  check("reviewText")
    .notEmpty()
    .withMessage("Review text is required")
    .trim()
    .isString()
    .withMessage("Review text must be a string")
    .isLength({min: 3})
    .withMessage("Review text minimum length 3 characters")
    .isLength({max: 300})
    .withMessage("Review text maximum length 300 characters"),
  check("reviewRating")
    .notEmpty()
    .withMessage("Review rating is required")
    .isFloat({min: 1, max: 5})
    .withMessage("Review rating must be between 1 and 5"),
  check("user")
    .notEmpty()
    .withMessage("Review must belong to a user")
    .isMongoId()
    .withMessage("Invalid id format"),
  check("product")
    .notEmpty()
    .withMessage("Review must belong to a product")
    .isMongoId()
    .withMessage("Invalid id format")
    .custom((val, {req}) => isReviewedBefore(val, Review, req)),
  validatorMiddleware,
];
export const updateReviewValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid id format")
    .custom((val, {req}) => didYouOwner(val, Review, req)),
  check("reviewText")
    .optional()
    .trim()
    .isString()
    .withMessage("Review text must be a string")
    .isLength({min: 3})
    .withMessage("Review text minimum length 3 characters")
    .isLength({max: 300})
    .withMessage("Review text maximum length 300 characters"),
  check("reviewRating")
    .optional()
    .isFloat({min: 1, max: 5})
    .withMessage("Review rating must be between 1 and 5"),
  validatorMiddleware,
];
export const deleteReviewValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid id format")
    .custom((val, {req}) => didYouOwnerOrAdmin(val, Review, req)),
  validatorMiddleware,
];
