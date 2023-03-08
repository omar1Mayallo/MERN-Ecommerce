import express from "express";

import userRouter from "./userRouter.js";
import authRouter from "./authRouter.js";
import productRouter from "./productRouter.js";
import categoryRouter from "./categoryRouter.js";
import subcategoryRouter from "./subcategoryRouter.js";
import reviewRouter from "./reviewRouter.js";
import addressRouter from "./addressRouter.js";
import wishlistRouter from "./wishlistRouter.js";
import couponRouter from "./couponRouter.js";
import cartRouter from "./cartRouter.js";
import orderRouter from "./orderRouter.js";
import bannerRouter from "./bannerRouter.js";

const router = express.Router();

router.use(`/users`, userRouter);
router.use(`/auth`, authRouter);
router.use(`/products`, productRouter);
router.use(`/categories`, categoryRouter);
router.use(`/subcategories`, subcategoryRouter);
router.use(`/reviews`, reviewRouter);
router.use(`/addresses`, addressRouter);
router.use(`/wishlist`, wishlistRouter);
router.use(`/coupons`, couponRouter);
router.use(`/cart`, cartRouter);
router.use(`/orders`, orderRouter);
router.use(`/banners`, bannerRouter);

export default router;
