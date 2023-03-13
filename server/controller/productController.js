import Product from "../model/productModel.js";
import {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} from "../utils/refactorControllers.utils.js";
import asyncHandler from "../utils/asyncHandler.utils.js";
import {uploadMixOfImages} from "../middleware/imgUpload.middleware.js";
import sharp from "sharp";

//__________IMAGES_HANDLER__________//
// 1) UPLOADING(Multer)
export const uploadProductImages = uploadMixOfImages([
  {name: "image", maxCount: 1},
  {name: "sliderImages", maxCount: 4},
]);

// 2) PROCESSING(Sharp)
export const resizeProductImages = asyncHandler(async (req, res, next) => {
  if (!req.files) return next();
  // a) image field
  if (req.files.image) {
    const mainImageFilename = `product-${req.user._id}-${Date.now()}-main.jpeg`;
    // console.log(req.files);
    await sharp(req.files.image[0].buffer)
      .resize(800, 800)
      .toFormat("jpeg")
      .jpeg({quality: 90})
      .toFile(
        `${process.env.FILES_UPLOADS_PATH}/products/${mainImageFilename}`
      );
    // put it in req.body to access it when we access createProduct, updateSingleProduct to save the filename into database
    req.body.image = mainImageFilename;
  }

  // b) sliderImages field
  if (req.files.sliderImages) {
    req.body.sliderImages = [];
    await Promise.all(
      req.files.sliderImages.map(async (img, idx) => {
        const sliderImageName = `product-${req.user._id}-${Date.now()}-slide-${
          idx + 1
        }.jpeg`;

        await sharp(img.buffer)
          .resize(800, 800)
          .toFormat("jpeg")
          .jpeg({quality: 90})
          .toFile(
            `${process.env.FILES_UPLOADS_PATH}/products/${sliderImageName}`
          );

        // put it in req.body to access it when we access createProduct, updateSingleProduct to save the filename into database
        req.body.sliderImages.push(sliderImageName);
      })
    );
  }

  next();
});

// @desc    CREATE A Product
// @route   POST /api/products
// @access  Private("ADMIN")
export const createProduct = createOne(Product);

// @desc    GET All Products
// @route   GET /api/products
// @access  Public
export const getAllProducts = getAll(Product);

// @desc    GET Single Product
// @route   GET /api/products/:id
// @access  Public
export const getSingleProduct = getOne(Product, "reviews");

// @desc    UPDATE Single Product
// @route   PATCH /api/products/:id
// @access  Private("ADMIN")
export const updateSingleProduct = updateOne(Product);

// @desc    DELETE Single Product
// @route   DELETE /api/products/:id
// @access  Private("ADMIN")
export const deleteSingleProduct = deleteOne(Product);

// @desc    GET Top Aliases(Rated-Sold-Sales) Product
// @route   ex: GET /api/products?sort=-ratingAverage&limit=7 GET /api/products/top-rated
// @access  Public
export const getTopAliases = (sortOption) => {
  return (req, res, next) => {
    req.query.limit = "7";
    req.query.sort = `${sortOption}`;
    req.query.fields =
      "name price image discount ratingAverage reviewsNumber quantityInStock";
    next();
  };
};
