import express from "express";
import {isAuth} from "../../middleware/auth.middleware.js";
import {
  getAllReviews,
  createReview,
  updateReview,
  deleteReview,
  getReview,
  filterObjectForProductNestedReviews,
  setUserIdAndProductIdToBody,
} from "../../controller/reviewController.js";

import {
  deleteReviewValidator,
  getReviewValidator,
  createReviewValidator,
  updateReviewValidator,
} from "../../validators/review.validator.js";

const router = express.Router({mergeParams: true});

router.route("/").get(filterObjectForProductNestedReviews, getAllReviews);

router.use(isAuth);
router
  .route("/")
  .post(setUserIdAndProductIdToBody, createReviewValidator, createReview);
router
  .route("/:id")
  .get(getReviewValidator, getReview)
  .patch(updateReviewValidator, updateReview)
  .delete(deleteReviewValidator, deleteReview);

export default router;
