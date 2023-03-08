import validatorMiddleware from "../middleware/validator.middleware.js";
import {check} from "express-validator";
import Subcategory from "../model/subcategoryModel.js";
import Category from "../model/categoryModel.js";
import {isExistInDB, isUnique} from "./custom.validators.js";

export const getSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid id format"),
  validatorMiddleware,
];
export const createSubcategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Subcategory name is required")
    .isLength({min: 2})
    .withMessage("Subcategory name minimum length 2 characters")
    .isLength({max: 30})
    .withMessage("Subcategory name maximum length 30 characters")
    .custom((val) => isUnique(val, Subcategory, "name")),
  check("category")
    .notEmpty()
    .withMessage("Subcategory must belong to category")
    .isMongoId()
    .withMessage("Invalid id format")
    .custom((val) => isExistInDB(val, Category)),
  validatorMiddleware,
];
export const updateSubcategoryValidator = [
  check("id").isMongoId().withMessage("Invalid id format"),
  check("name")
    .optional()
    .custom((val) => isUnique(val, Subcategory, "name")),
  check("category")
    .optional()
    .isMongoId()
    .withMessage("Invalid id format")
    .custom((val) => isExistInDB(val, Category)),
  validatorMiddleware,
];
export const deleteSubcategoryValidator = [
  check("id").isMongoId().withMessage("Invalid id format"),
  validatorMiddleware,
];
