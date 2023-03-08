import express from "express";
import {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateSingleProduct,
  deleteSingleProduct,
  getTopAliases,
  uploadProductImages,
  resizeProductImages,
} from "../../controller/productController.js";
import {allowedTo, isAuth} from "../../middleware/auth.middleware.js";
import {USER_ROLES} from "../../constants/index.js";
import {
  getProductValidator,
  createProductValidator,
  updateProductValidator,
  deleteProductValidator,
} from "../../validators/product.validator.js";
import reviewRouter from "./reviewRouter.js";

const router = express.Router();

// NESTED_ROUTES_[GET reviews which belongs to specific product, CREATE a review on a specific product]
router.use("/:productId/reviews", reviewRouter);

router.route("/top-rated").get(getTopAliases("-ratingAverage"), getAllProducts);
router.route("/top-sold").get(getTopAliases("-sold"), getAllProducts);
router.route("/top-sales").get(getTopAliases("-discount"), getAllProducts);
router.route("/new-arrivals").get(getTopAliases("-createdAt"), getAllProducts);

router
  .route("/")
  .get(getAllProducts)
  .post(
    isAuth,
    allowedTo(USER_ROLES.ADMIN),
    uploadProductImages,
    resizeProductImages,
    createProductValidator,
    createProduct
  );
router
  .route("/:id")
  .get(getProductValidator, getSingleProduct)
  .patch(
    isAuth,
    allowedTo(USER_ROLES.ADMIN),
    uploadProductImages,
    resizeProductImages,
    updateProductValidator,
    updateSingleProduct
  )
  .delete(
    isAuth,
    allowedTo(USER_ROLES.ADMIN),
    deleteProductValidator,
    deleteSingleProduct
  );

export default router;
