import express from "express";
import {allowedTo, isAuth} from "../../middleware/auth.middleware.js";
import {USER_ROLES} from "../../constants/index.js";
import {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateSingleCategory,
  deleteSingleCategory,
  uploadCategoryImage,
  resizeCategoryImage,
} from "../../controller/categoryController.js";
import {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} from "../../validators/category.validator.js";
import subcategoryRouter from "./subcategoryRouter.js";
const router = express.Router();

// NESTED_ROUTES_[GET subcategories which belongs to specific category, CREATE a subcategory based on a specific category]
router.use("/:categoryId/subcategories", subcategoryRouter);

router
  .route("/")
  .get(getAllCategories)
  .post(
    isAuth,
    allowedTo(USER_ROLES.ADMIN),
    uploadCategoryImage,
    resizeCategoryImage,
    createCategoryValidator,
    createCategory
  );
router
  .route("/:id")
  .get(getCategoryValidator, getSingleCategory)
  .patch(
    isAuth,
    allowedTo(USER_ROLES.ADMIN),
    uploadCategoryImage,
    resizeCategoryImage,
    updateCategoryValidator,
    updateSingleCategory
  )
  .delete(
    isAuth,
    allowedTo(USER_ROLES.ADMIN),
    deleteCategoryValidator,
    deleteSingleCategory
  );

export default router;
