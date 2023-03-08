import Banner from "../model/bannerModel.js";
import {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} from "../utils/refactorControllers.utils.js";
import asyncHandler from "../utils/asyncHandler.utils.js";
import {uploadSingleImage} from "../middleware/imgUpload.middleware.js";
import sharp from "sharp";

//__________IMAGES_HANDLER__________//
// 1) UPLOADING(Multer)
export const uploadBannerImage = uploadSingleImage("image");

// 2) PROCESSING(Sharp)
export const resizeBannerImage = asyncHandler(async (req, res, next) => {
  if (!req.file) return next();
  // console.log(req.file);

  const filename = `banner-${req.user._id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(1920, 784)
    .toFormat("jpeg")
    .jpeg({quality: 100})
    .toFile(`${process.env.FILES_UPLOADS_PATH}/banners/${filename}`);
  // put it in req.body to access it when we access createBanner ,updateSingleBanner to save the filename into database
  req.body.image = filename;
  next();
});

// @desc    CREATE A Banner
// @route   POST /api/banners
// @access  Private("ADMIN")
export const createBanner = createOne(Banner);
// @desc    GET All Banners
// @route   GET /api/banners
// @access  Public
export const getAllBanners = getAll(Banner);
// @desc    GET Single Banner
// @route   GET /api/banners/:id
// @access  Private("ADMIN")
export const getSingleBanner = getOne(Banner);
// @desc    UPDATE Single Banner
// @route   PATCH /api/banners/:id
// @access  Private("ADMIN")
export const updateSingleBanner = updateOne(Banner);
// @desc    DELETE Single Banner
// @route   DELETE /api/banners/:id
// @access  Private("ADMIN")
export const deleteSingleBanner = deleteOne(Banner);
