import Coupon from "../model/couponModel.js";
import {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} from "../utils/refactorControllers.utils.js";

// @desc    CREATE A Coupon
// @route   POST /api/coupons
// @access  Private("ADMIN")
export const createCoupon = createOne(Coupon);
// @desc    GET All Coupons
// @route   GET /api/coupons
// @access  Private("ADMIN")
export const getAllCoupons = getAll(Coupon);
// @desc    GET Single Coupon
// @route   GET /api/coupons/:id
// @access  Private("ADMIN")
export const getSingleCoupon = getOne(Coupon);
// @desc    UPDATE Single Coupon
// @route   PATCH /api/coupons/:id
// @access  Private("ADMIN")
export const updateSingleCoupon = updateOne(Coupon);
// @desc    DELETE Single Coupon
// @route   DELETE /api/coupons/:id
// @access  Private("ADMIN")
export const deleteSingleCoupon = deleteOne(Coupon);
