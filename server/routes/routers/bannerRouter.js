import express from "express";
import {allowedTo, isAuth} from "../../middleware/auth.middleware.js";
import {USER_ROLES} from "../../constants/index.js";
import {
  getAllBanners,
  deleteSingleBanner,
  createBanner,
  updateSingleBanner,
  getSingleBanner,
  uploadBannerImage,
  resizeBannerImage,
} from "../../controller/bannerController.js";

const router = express.Router();

router.route("/").get(getAllBanners);
router.use(isAuth, allowedTo(USER_ROLES.ADMIN));
router.route("/").post(uploadBannerImage, resizeBannerImage, createBanner);
router
  .route("/:id")
  .get(getSingleBanner)
  .patch(uploadBannerImage, resizeBannerImage, updateSingleBanner)
  .delete(deleteSingleBanner);

export default router;
