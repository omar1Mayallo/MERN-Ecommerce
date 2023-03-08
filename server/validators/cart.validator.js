import validatorMiddleware from "../middleware/validator.middleware.js";
import {check} from "express-validator";
import Product from "../model/productModel.js";
import {isExistInDB} from "./custom.validators.js";

export const addToCartValidator = [
  check("productId")
    .isMongoId()
    .withMessage("Invalid id format")
    .custom((val) => isExistInDB(val, Product)),
  validatorMiddleware,
];

export const removeFromCartValidator = [
  check("productId").isMongoId().withMessage("Invalid id format"),
  validatorMiddleware,
];

export const updateCartItemQuantityValidator = [
  check("productId").isMongoId().withMessage("Invalid id format"),
  check("quantity").notEmpty().withMessage("Please enter a quantity"),
  validatorMiddleware,
];

export const applyCouponValidator = [
  check("couponCode").notEmpty().withMessage("Please enter a coupon code"),
  check("productId")
    .notEmpty()
    .withMessage("Please enter product id")
    .isMongoId()
    .withMessage("Invalid id format")
    .custom((val) => isExistInDB(val, Product)),
  validatorMiddleware,
];
