import validatorMiddleware from "../middleware/validator.middleware.js";
import {check} from "express-validator";
import {isExistInDB} from "./custom.validators.js";
import Order from "../model/orderModel.js";
import Cart from "../model/cartModel.js";

export const getOrderValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid id format")
    .custom((val) => isExistInDB(val, Order)),
  validatorMiddleware,
];
export const deleteOrderValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid id format")
    .custom((val) => isExistInDB(val, Order)),
  validatorMiddleware,
];
export const updateOrderStatusValidator = [
  check("orderId")
    .isMongoId()
    .withMessage("Invalid id format")
    .custom((val) => isExistInDB(val, Order)),
  validatorMiddleware,
];

export const createCashOrderValidator = [
  check("cartId")
    .isMongoId()
    .withMessage("Invalid id format")
    .custom((val) => isExistInDB(val, Cart)),
  validatorMiddleware,
];
