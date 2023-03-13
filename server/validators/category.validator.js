import validatorMiddleware from "../middleware/validator.middleware.js";
import {check} from "express-validator";
import Category from "../model/categoryModel.js";
import {isUnique} from "./custom.validators.js";

export const getCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Id format"),
  validatorMiddleware,
];
export const createCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Category name is required")
    .isLength({min: 3})
    .withMessage("Category name minimum length 3 characters")
    .isLength({max: 30})
    .withMessage("Category name maximum length 30 characters")
    .custom((val) => isUnique(val, Category, "name")),
  check("image").notEmpty().withMessage("Category must have image"),
  check("description")
    .optional()
    .trim()
    .isLength({min: 20})
    .withMessage("Category description minimum length 20 characters")
    .isLength({max: 500})
    .withMessage("Category description maximum length 500 characters"),
  validatorMiddleware,
];
export const updateCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid id format"),
  check("name")
    .optional()
    .isLength({min: 3})
    .withMessage("Category name minimum length 3 characters")
    .isLength({max: 30})
    .withMessage("Category name maximum length 30 characters"),
  check("image").optional(),
  check("description")
    .optional()
    .trim()
    .isLength({min: 20})
    .withMessage("Category description minimum length 20 characters")
    .isLength({max: 500})
    .withMessage("Category description maximum length 500 characters"),
  validatorMiddleware,
];
export const deleteCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid id format"),
  validatorMiddleware,
];
