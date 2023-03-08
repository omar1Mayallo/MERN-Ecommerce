import express from "express";
import {
  getMyWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
} from "../../controller/wishlistController.js";
import {isAuth} from "../../middleware/auth.middleware.js";
import {
  removeFromWishlistValidator,
  addToWishlistValidator,
} from "../../validators/wishlist.validator.js";

const router = express.Router();

router.use(isAuth);

router
  .route("/")
  .get(getMyWishlist)
  .post(addToWishlistValidator, addToWishlist)
  .delete(clearWishlist);

router.delete("/:productId", removeFromWishlistValidator, removeFromWishlist);

export default router;
