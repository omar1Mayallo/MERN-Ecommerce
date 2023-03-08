import express from "express";
import {allowedTo, isAuth} from "../../middleware/auth.middleware.js";
import {USER_ROLES} from "../../constants/index.js";

import {
  createSubcategory,
  getAllSubcategories,
  getSingleSubcategory,
  updateSingleSubcategory,
  deleteSingleSubcategory,
  filterObjectForNestedSubcategories,
  setCategoryToBody,
} from "../../controller/subcategoryController.js";
import {
  getSubCategoryValidator,
  createSubcategoryValidator,
  updateSubcategoryValidator,
  deleteSubcategoryValidator,
} from "../../validators/subcategory.validator.js";

// mergeParams: allow access req.params from other routes
const router = express.Router({mergeParams: true});

router
  .route("/")
  .get(filterObjectForNestedSubcategories, getAllSubcategories)
  .post(
    isAuth,
    allowedTo(USER_ROLES.ADMIN),
    setCategoryToBody,
    createSubcategoryValidator,
    createSubcategory
  );
router
  .route("/:id")
  .get(getSubCategoryValidator, getSingleSubcategory)
  .patch(
    isAuth,
    allowedTo(USER_ROLES.ADMIN),
    updateSubcategoryValidator,
    updateSingleSubcategory
  )
  .delete(
    isAuth,
    allowedTo(USER_ROLES.ADMIN),
    deleteSubcategoryValidator,
    deleteSingleSubcategory
  );

export default router;
