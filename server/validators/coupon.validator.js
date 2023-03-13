import validatorMiddleware from "../middleware/validator.middleware.js";
import {check} from "express-validator";
import {isExistInDB, isUnique} from "./custom.validators.js";
import Coupon from "../model/couponModel.js";
import Product from "../model/productModel.js";

export const getCouponValidator = [
  check("id").isMongoId().withMessage("Invalid Id format"),
  validatorMiddleware,
];
export const deleteCouponValidator = [
  check("id").isMongoId().withMessage("Invalid id format"),
  validatorMiddleware,
];
export const createCouponValidator = [
  check("name")
    .notEmpty()
    .withMessage("Coupon name is required")
    .trim()
    .custom((val) => isUnique(val, Coupon, "name")),
  check("product")
    .notEmpty()
    .withMessage("Coupon must belong to product is")
    .isMongoId()
    .withMessage("Invalid id format")
    .custom((val) => isExistInDB(val, Product)),
  check("expire")
    .notEmpty()
    .withMessage("Coupon expiration date is required")
    .isDate()
    .withMessage("Coupon expiration value must be a valid date"),
  check("discount")
    .notEmpty()
    .withMessage("Coupon discount is required")
    .isFloat({min: 5, max: 75})
    .withMessage("Coupon discount value must be between 5 and 75"),
  validatorMiddleware,
];
export const updateCouponValidator = [
  check("id").isMongoId().withMessage("Invalid id format"),
  check("name").optional().trim(),
  check("product")
    .optional()
    .isMongoId()
    .withMessage("Invalid id format")
    .custom((val) => isExistInDB(val, Product)),
  check("expire")
    .optional()
    .isDate()
    .withMessage("Coupon expiration value must be a valid date"),
  check("discount")
    .optional()
    .isFloat({min: 5, max: 75})
    .withMessage("Coupon discount value must be between 5 and 75"),
  validatorMiddleware,
];
