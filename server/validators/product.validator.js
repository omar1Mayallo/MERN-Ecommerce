import validatorMiddleware from "../middleware/validator.middleware.js";
import {check} from "express-validator";
import Subcategory from "../model/subcategoryModel.js";
import Category from "../model/categoryModel.js";
import {isExistInDB, isLower} from "./custom.validators.js";

export const getProductValidator = [
  check("id").isMongoId().withMessage("Invalid Id format"),
  validatorMiddleware,
];
export const deleteProductValidator = [
  check("id").isMongoId().withMessage("Invalid id format"),
  validatorMiddleware,
];
export const updateProductValidator = [
  // ID
  check("id").isMongoId().withMessage("Invalid Id format"),

  // NAME
  check("name")
    .optional()
    .trim()
    .isLength({min: 3})
    .withMessage("Product name minimum length 3 characters")
    .isLength({max: 30})
    .withMessage("Product name maximum length 30 characters"),

  // QTY
  check("quantityInStock")
    .optional()
    .isNumeric()
    .withMessage("Product quantity must be number"),

  // DESCRIPTION
  check("description")
    .optional()
    .trim()
    .isLength({min: 20})
    .withMessage("Product description minimum length 3 characters")
    .isLength({max: 1000})
    .withMessage("Product description maximum length 30 characters"),

  // PRICE
  check("price")
    .optional()
    .isFloat({max: 1000000})
    .withMessage("Product price is very high"),

  // DISCOUNT
  check("discount")
    .optional()
    .custom((val, {req}) => isLower(val, req)),

  // RATING AVERAGE
  check("ratingAverage")
    .optional()
    .isFloat({min: 0, max: 5})
    .withMessage("Rating average must be between 0 and 5"),

  //SLIDER IMAGES
  check("sliderImages")
    .optional()
    .isArray()
    .withMessage("Product slider images must be array"),

  // COLORS
  check("colors")
    .optional()
    .isArray()
    .withMessage("Product colors must be array"),

  // SIZES
  check("size").optional().isArray().withMessage("Product sizes must be array"),

  // CATEGORY
  check("category")
    .optional()
    .isMongoId()
    .withMessage("Invalid category Id format")
    .custom((val) => isExistInDB(val, Category)),

  // SUBCATEGORIES
  check("subcategories")
    .optional()
    .isArray()
    .withMessage("Product subcategories must be array")
    // CHECK if the subcategories ids is exist in DB
    /*
    $in
    Syntax: { field: { $in: [<value1>, <value2>, ... <valueN> ] } }
    Description: The $in operator selects the documents where the value of a field equals any value in the specified array.
    */
    /*
    $exists
    Syntax: { field: { $exists: <boolean> } }
    Description: When <boolean> is true, matches the documents that contain the field, including documents where the field value is null. If <boolean> is false, the query returns only the documents that do not contain the field.
    */
    .custom(async (subcategoriesIdsArray) => {
      const listOfSubcategoriesIds = await Subcategory.find({
        _id: {$exists: true, $in: subcategoriesIdsArray},
      });
      if (
        listOfSubcategoriesIds.length < 1 ||
        listOfSubcategoriesIds.length !== subcategoriesIdsArray.length
      ) {
        throw new Error(`Invalid subcategories ids`);
      }
    })
    //Check if subCategories belong to the category which entered
    .custom(async (subCategoriesIdsArray, {req}) => {
      // 1) Find All Subcategories to The Category that entered to product
      const subCategories = await Subcategory.find({
        category: req.body.category,
      }).select("_id");
      // 2) We need only ids of subcategories so, we push them to this array
      const subCategoriesIdsInDB = [];
      subCategories.forEach((subCategory) =>
        subCategoriesIdsInDB.push(subCategory._id.toString())
      );
      // 3) Check if every element of subCategoriesIdsArray which iam entered , in subCategoriesIdsInDB
      if (
        !subCategoriesIdsArray.every((val) =>
          subCategoriesIdsInDB.includes(val)
        )
      ) {
        throw new Error(
          `Subcategories do not Belong to the category which you entered`
        );
      }
    }),
  validatorMiddleware,
];
export const createProductValidator = [
  // NAME
  check("name")
    .notEmpty()
    .withMessage("Product name is required")
    .trim()
    .isLength({min: 3})
    .withMessage("Product name minimum length 3 characters")
    .isLength({max: 30})
    .withMessage("Product name maximum length 30 characters"),

  // QTY
  check("quantityInStock")
    .notEmpty()
    .withMessage("Product quantity is required")
    .isNumeric()
    .withMessage("Product quantity must be number"),

  // DESCRIPTION
  check("description")
    .notEmpty()
    .withMessage("Product description is required")
    .trim()
    .isLength({min: 20})
    .withMessage("Product description minimum length 3 characters")
    .isLength({max: 1000})
    .withMessage("Product description maximum length 30 characters"),

  // PRICE
  check("price")
    .notEmpty()
    .withMessage("Product price is required")
    .isNumeric()
    .withMessage("Product price must be a number")
    .isFloat({max: 1000000})
    .withMessage("Product price is very high"),

  // DISCOUNT
  check("discount")
    .optional()
    .custom((val, {req}) => isLower(val, req)),

  // RATING AVERAGE
  check("ratingAverage")
    .optional()
    .isFloat({min: 0, max: 5})
    .withMessage("Rating average must be between 0 and 5"),

  //SLIDER IMAGES
  check("sliderImages")
    .optional()
    .isArray()
    .withMessage("Product slider images must be array"),

  // COLORS
  check("colors")
    .optional()
    .isArray()
    .withMessage("Product colors must be array"),

  // SIZES
  check("size").optional().isArray().withMessage("Product sizes must be array"),

  // CATEGORY
  check("category")
    .notEmpty()
    .withMessage("Product must belong to a category")
    .isMongoId()
    .withMessage("Invalid category Id format")
    .custom((val) => isExistInDB(val, Category)),

  // SUBCATEGORIES
  check("subcategories")
    .optional()
    .isArray()
    .withMessage("Product subcategories must be array")
    // CHECK if the subcategories ids is exist in DB
    /*
    $in
    Syntax: { field: { $in: [<value1>, <value2>, ... <valueN> ] } }
    Description: The $in operator selects the documents where the value of a field equals any value in the specified array.
    */
    /*
    $exists
    Syntax: { field: { $exists: <boolean> } }
    Description: When <boolean> is true, matches the documents that contain the field, including documents where the field value is null. If <boolean> is false, the query returns only the documents that do not contain the field.
    */
    .custom(async (subcategoriesIdsArray) => {
      const listOfSubcategoriesIds = await Subcategory.find({
        _id: {$exists: true, $in: subcategoriesIdsArray},
      });
      if (
        listOfSubcategoriesIds.length < 1 ||
        listOfSubcategoriesIds.length !== subcategoriesIdsArray.length
      ) {
        throw new Error(`Invalid subcategories ids`);
      }
    })
    //Check if subCategories belong to the category which entered
    .custom(async (subCategoriesIdsArray, {req}) => {
      // 1) Find All Subcategories of The Category that entered to product
      const subCategories = await Subcategory.find({
        category: req.body.category,
      }).select("_id");

      // 2) We need only ids of subcategories so, we push them to this array
      const subCategoriesIdsInDB = [];
      subCategories.forEach((subCategory) =>
        subCategoriesIdsInDB.push(subCategory._id.toString())
      );
      // 3) Check if every element of subCategoriesIdsArray which iam entered , in subCategoriesIdsInDB
      if (
        !subCategoriesIdsArray.every((val) =>
          subCategoriesIdsInDB.includes(val)
        )
      ) {
        throw new Error(
          `Subcategories do not Belong to the category which you entered`
        );
      }
    }),
  validatorMiddleware,
];
