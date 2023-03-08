import mongoose from "mongoose";
import Product from "./productModel.js";

const reviewSchema = new mongoose.Schema(
  {
    reviewText: {
      type: String,
      trim: true,
      required: [true, "Review text is required"],
      minlength: [3, "Review text minimum length 3 characters"],
      maxlength: [300, "Review text maximum length 300 characters"],
    },
    reviewRating: {
      type: Number,
      min: [1, "Review minimum rating is 1"],
      max: [5, "Review maximum rating is 5"],
      required: [true, "Rating value is Required"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Review must belong to a User"],
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Review must belong to a Product"],
    },
  },
  {timestamps: true}
);

//_CALC_RATING_AVERAGE_&_NUMBER_OF_REVIEWS_[Static-method]_//
reviewSchema.statics.calcRatingAverageAndNumberOfReviews = async function (
  productId
) {
  const aggregatedStats = await this.aggregate([
    {$match: {product: productId}},
    {
      $group: {
        _id: "$product",
        numOfReviews: {$sum: 1},
        avrRating: {$avg: "$reviewRating"},
      },
    },
  ]);
  // console.log(aggregatedStats);
  if (aggregatedStats.length > 0) {
    await Product.findByIdAndUpdate(productId, {
      reviewsNumber: aggregatedStats[0].numOfReviews,
      ratingAverage: aggregatedStats[0].avrRating,
    });
  } else {
    await Product.findByIdAndUpdate(productId, {
      reviewsNumber: 0,
      ratingAverage: 0,
    });
  }
};

//_FOR_CREATE_&_UPDATE_[Document-Middleware]_//
reviewSchema.post("save", async function (doc, next) {
  // Q: why use this.constructor not only use this?
  // Ans: because to use the static method must used it on the model itself not instance of this model.
  // this => refer to the document or instance
  // constructor => refer to the model
  await this.constructor.calcRatingAverageAndNumberOfReviews(this.product);
  next();
});

//_FOR_DELETE_[Document-Middleware]_//
reviewSchema.post("remove", async function (doc, next) {
  await this.constructor.calcRatingAverageAndNumberOfReviews(this.product);
  next();
});

// _POPULATE_USER_INFO_[Query-Middleware]_//
reviewSchema.pre(/^find/, function (next) {
  this.populate({path: "user", select: "username image"});
  // We don't need to populate the product
  // this.populate({path: "product", select: "name"});
  next();
});

const Review = mongoose.model("Review", reviewSchema);

export default Review;
