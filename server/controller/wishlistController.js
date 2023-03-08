import User from "../model/userModel.js";
import APIError from "../utils/apiError.utils.js";
import asyncHandler from "../utils/asyncHandler.utils.js";

// @desc    User Register
// @route   GET /api/wishlist
// @access  Protected
export const getMyWishlist = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id).populate({
    path: "wishlist",
    select: "name price image discount ratingAverage reviewsNumber",
  });
  if (!user) {
    return next(new APIError("User notfound ", 404));
  }
  res.status(200).json({
    status: "success",
    results: user.wishlist.length,
    data: user.wishlist,
  });
});
// @desc    User Register
// @route   POST /api/wishlist
// @access  Protected
export const addToWishlist = asyncHandler(async (req, res, next) => {
  const {productId} = req.body;
  // $addToSet
  // @desc The $addToSet operator adds a value to an array unless the value is already    present, in which case $addToSet does nothing to that array. To specify a <field> in an embedded document or in an array, use dot notation.
  // @syntax { $addToSet: { <field1>: <value1>, ... } }
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: {wishlist: productId},
    },
    {new: true}
  );
  res.status(200).json({
    status: "success",
    message: "Product added successfully to your wishlist",
    data: user.wishlist,
  });
});
// @desc    User Register
// @route   GET /api/wishlist/:productId
// @access  Protected
export const removeFromWishlist = asyncHandler(async (req, res, next) => {
  const {productId} = req.params;
  // $pull
  // @desc The $pull operator removes from an existing array all instances of a value or values that match a specified condition. To specify a <field> in an embedded document or in an array, use dot notation.
  // @syntax { $pull: { <field1>: <value|condition>, <field2>: <value|condition>, ... } }
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $pull: {wishlist: productId},
    },
    {new: true}
  );
  res.status(200).json({
    status: "success",
    message: "Product removed successfully from your wishlist",
    data: user.wishlist,
  });
});

// @desc    Clear All Wishlist
// @route   DELETE /api/wishlist
// @access  Protected
export const clearWishlist = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  user.wishlist = [];
  await user.save();
  res.status(204).json({status: "success"});
});
