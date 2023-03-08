import express from "express";
import {allowedTo, isAuth} from "../../middleware/auth.middleware.js";
import {USER_ROLES} from "../../constants/index.js";
import {
  createCoupon,
  updateSingleCoupon,
  deleteSingleCoupon,
  getAllCoupons,
  getSingleCoupon,
} from "../../controller/couponController.js";
import {
  getCouponValidator,
  createCouponValidator,
  updateCouponValidator,
  deleteCouponValidator,
} from "../../validators/coupon.validator.js";
const router = express.Router();

router.use(isAuth, allowedTo(USER_ROLES.ADMIN));

router.route("/").get(getAllCoupons).post(createCouponValidator, createCoupon);
router
  .route("/:id")
  .get(getCouponValidator, getSingleCoupon)
  .patch(updateCouponValidator, updateSingleCoupon)
  .delete(deleteCouponValidator, deleteSingleCoupon);

export default router;
