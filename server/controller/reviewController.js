import Review from "../model/reviewModel.js";
import {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} from "../utils/refactorControllers.utils.js";

//FOR_NESTED_ROUTES
// (1)
// @desc    CREATE A Review Based On productId
// @route   POST /api/products/:productId/reviews
// @access  Protected
export const setUserIdAndProductIdToBody = (req, res, next) => {
  if (!req.body.user) req.body.user = req.user._id;
  if (!req.body.product) req.body.product = req.params.productId;
  next();
};
// (2)
// @desc    GET ALL Reviews Which Belongs To A Specific Product
// @route   GET /api/products/:productId/reviews
// @access  Public
export const filterObjectForProductNestedReviews = (req, res, next) => {
  let filteredObject = {};
  if (req.params.productId) filteredObject = {product: req.params.productId};
  req.filterObj = filteredObject;
  next();
};

// @desc    CREATE a new Review
// @route   POST /api/reviews
// @access  Protected
export const createReview = createOne(Review);

// @desc    UPDATE a Review
// @route   PATCH /api/reviews/:id
// @access  Protected
export const updateReview = updateOne(Review);

// @desc    DELETE a Review
// @route   DELETE /api/reviews/:id
// @access  Protected
export const deleteReview = deleteOne(Review);

// @desc    GET All Reviews
// @route   GET /api/reviews
// @access  Protected
export const getAllReviews = getAll(Review);

// @desc    GET a Review
// @route   GET /api/reviews/:id
// @access  Protected
export const getReview = getOne(Review);
