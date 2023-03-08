import express from "express";
import {isAuth} from "../../middleware/auth.middleware.js";
import {
  getMyCart,
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
  applyCoupon,
} from "../../controller/cartController.js";
import {
  addToCartValidator,
  removeFromCartValidator,
  updateCartItemQuantityValidator,
  applyCouponValidator,
} from "../../validators/cart.validator.js";

const router = express.Router();

router.use(isAuth);

router
  .route("/")
  .get(getMyCart)
  .post(addToCartValidator, addToCart)
  .delete(clearCart);

router.route("/apply-coupon").patch(applyCouponValidator, applyCoupon);

router
  .route("/:productId")
  .patch(updateCartItemQuantityValidator, updateCartItemQuantity)
  .delete(removeFromCartValidator, removeFromCart);

export default router;
