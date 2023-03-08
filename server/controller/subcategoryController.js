import Category from "../model/categoryModel.js";
import Subcategory from "../model/subcategoryModel.js";
import APIError from "../utils/apiError.utils.js";
import asyncHandler from "../utils/asyncHandler.utils.js";
import {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} from "../utils/refactorControllers.utils.js";

//FOR_NESTED_ROUTES
// (1)
// @desc    CREATE A Subcategory Based On CategoryId
// @route   POST /api/categories/:categoryId/subcategories
// @access  Private("ADMIN")
export const setCategoryToBody = (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};
// (2)
// @desc    GET ALL Subcategories Which Belongs To A Specific Category
// @route   GET /api/categories/:categoryId/subcategories
// @access  Public
export const filterObjectForNestedSubcategories = asyncHandler(
  async (req, res, next) => {
    let filter = {};
    if (req.params.categoryId) {
      const categoryExist = await Category.findById(req.params.categoryId);
      if (!categoryExist) {
        return next(
          new APIError(
            `There is no category match this id : ${req.params.categoryId}`,
            404
          )
        );
      }
      filter = {category: req.params.categoryId};
    }
    req.filterObj = filter;
    next();
  }
);

//________________________________________________________________//

// @desc    CREATE A Subcategory
// @route   POST /api/subcategories
// @access  Private("ADMIN")
export const createSubcategory = createOne(Subcategory);
// @desc    GET All Subcategories
// @route   GET /api/subcategories
// @access  Public
export const getAllSubcategories = getAll(Subcategory);
// @desc    GET Single Subcategory
// @route   GET /api/subcategories/:id
// @access  Public
export const getSingleSubcategory = getOne(Subcategory);
// @desc    UPDATE Single Subcategory
// @route   PATCH /api/subcategories/:id
// @access  Private("ADMIN")
export const updateSingleSubcategory = updateOne(Subcategory);
// @desc    DELETE Single Subcategory
// @route   DELETE /api/subcategories/:id
// @access  Private("ADMIN")
export const deleteSingleSubcategory = deleteOne(Subcategory);
