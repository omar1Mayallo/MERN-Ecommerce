import express from "express";
import {allowedTo, isAuth} from "../../middleware/auth.middleware.js";
import {USER_ROLES} from "../../constants/index.js";

const router = express.Router();
export default router;
