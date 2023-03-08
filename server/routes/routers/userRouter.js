import express from "express";
import {
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
  getMyProfile,
  updateMyProfile,
  updateMyPassword,
  deleteMyProfile,
  uploadUserImage,
  resizeUserImage,
} from "../../controller/userController.js";
import {allowedTo, isAuth} from "../../middleware/auth.middleware.js";
import {USER_ROLES} from "../../constants/index.js";
import {
  getSingleUserValidator,
  updateMyProfileValidator,
  updateMyPasswordValidator,
  deleteSingleUserValidator,
  updateSingleUserValidator,
} from "../../validators/user.validator.js";

const router = express.Router();

// LOGGED_USER_ROUTES
router.use(isAuth);
router
  .route("/my-profile")
  .get(getMyProfile, getSingleUserValidator, getSingleUser)
  .patch(
    updateMyProfileValidator,
    uploadUserImage,
    resizeUserImage,
    updateMyProfile
  )
  .delete(deleteMyProfile);
router.route("/my-password").patch(updateMyPasswordValidator, updateMyPassword);

// ADMIN_ROUTES
router.use(allowedTo(USER_ROLES.ADMIN));
router.route("/").get(getAllUsers);
router
  .route("/:id")
  .get(getSingleUserValidator, getSingleUser)
  .patch(
    updateSingleUserValidator,
    uploadUserImage,
    resizeUserImage,
    updateSingleUser
  )
  .delete(deleteSingleUserValidator, deleteSingleUser);

export default router;
