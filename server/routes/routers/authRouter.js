import express from "express";

import {login, register, logout} from "../../controller/authController.js";
import {isAuth} from "../../middleware/auth.middleware.js";
import {
  loginValidator,
  registerValidator,
} from "../../validators/auth.validator.js";

const router = express.Router();

router.route("/register").post(registerValidator, register);
router.route("/login").post(loginValidator, login);
router.route("/logout").post(isAuth, logout);
export default router;
