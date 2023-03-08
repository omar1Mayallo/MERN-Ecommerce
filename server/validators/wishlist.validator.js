import validatorMiddleware from "../middleware/validator.middleware.js";
import {check} from "express-validator";
import Product from "../model/productModel.js";
import {isExistInDB} from "./custom.validators.js";
export const addToWishlistValidator = [
  check("productId")
    .isMongoId()
    .withMessage("Invalid id format")
    .custom((val) => isExistInDB(val, Product)),
  validatorMiddleware,
];
export const removeFromWishlistValidator = [
  check("productId")
    .isMongoId()
    .withMessage("Invalid id format")
    .custom((val) => isExistInDB(val, Product)),
  validatorMiddleware,
];
