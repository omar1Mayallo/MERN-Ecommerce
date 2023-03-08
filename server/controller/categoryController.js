import Category from "../model/categoryModel.js";
import {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} from "../utils/refactorControllers.utils.js";
import asyncHandler from "../utils/asyncHandler.utils.js";
import {uploadSingleImage} from "../middleware/imgUpload.middleware.js";
import sharp from "sharp";

//__________IMAGES_HANDLER__________//
// 1) UPLOADING(Multer)
export const uploadCategoryImage = uploadSingleImage("image");

// 2) PROCESSING(Sharp)
export const resizeCategoryImage = asyncHandler(async (req, res, next) => {
  if (!req.file) return next();
  // console.log(req.file);

  const filename = `category-${req.user._id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(1250, 1600)
    .toFormat("jpeg")
    .jpeg({quality: 90})
    .toFile(`${process.env.FILES_UPLOADS_PATH}/categories/${filename}`);
  // put it in req.body to access it when we access createCategory, updateSingleCategory to save the filename into database
  req.body.image = filename;
  next();
});

// @desc    CREATE A Category
// @route   POST /api/categories
// @access  Private("ADMIN")
export const createCategory = createOne(Category);
// @desc    GET All Categories
// @route   GET /api/categories
// @access  Public
export const getAllCategories = getAll(Category);
// @desc    GET Single category
// @route   GET /api/categories/:id
// @access  Public
export const getSingleCategory = getOne(Category);
// @desc    UPDATE Single Category
// @route   PATCH /api/categories/:id
// @access  Private("ADMIN")
export const updateSingleCategory = updateOne(Category);
// @desc    DELETE Single Category
// @route   DELETE /api/categories/:id
// @access  Private("ADMIN")
export const deleteSingleCategory = deleteOne(Category);
