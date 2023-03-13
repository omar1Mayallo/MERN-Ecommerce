import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "Product name is required"],
      minlength: [3, "Product name minimum length 3 characters"],
      maxlength: [30, "Product name maximum length 30 characters"],
    },
    quantityInStock: {
      type: Number,
      required: [true, "Product quantity in Stock is required"],
    },
    description: {
      type: String,
      trim: true,
      required: [true, "Product description is required"],
      minlength: [20, "Product description minimum length 20 characters"],
      maxlength: [1000, "Product description maximum length 1000 characters"],
    },
    price: {
      type: Number,
      required: [true, "Product must have a price"],
      max: [1000000, "Product price is very high"],
    },
    discount: {
      type: Number,
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },
    ratingAverage: {
      type: Number,
      default: 0,
      min: [0, "Rating must be above or equal 0"],
      max: [5, "Rating must be below or equal 5"],
      //2.667 ==> 26,67 ==> 27 ==> 2.7
      set: (val) => Math.round(val * 10) / 10,
    },
    reviewsNumber: {
      type: Number,
      default: 0,
    },
    colors: [String],
    size: [String],
    image: {
      type: String,
      required: [true, "Product must have main image"],
    },
    sliderImages: [String],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Product must belong to a Category"],
    },
    subcategories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subcategory",
      },
    ],
  },
  {
    timestamps: true,
    // To Virtuals Properties
    toJSON: {virtuals: true},
    toObject: {virtuals: true},
  }
);

//_PRODUCT_INDEXES_//
productSchema.index({price: 1, ratingAverage: 1});

//_VIRTUAL_REVIEWS_FIELD_//
productSchema.virtual("reviews", {
  ref: "Review", // Name Of the foreign Model
  foreignField: "product", // Name Of field in the foreign Model(Review model)
  localField: "_id", // Name Of field in the local Model(Product model)
});

//_POPULATE_CATEGORY_SUBCATEGORIES_[Query-Middleware]_//
productSchema.pre(/^find/, function (next) {
  this.populate({path: "category subcategories", select: "name image _id"});
  next();
});

//_SET_FULL_IMAGE_URL_//
const setFullImageUrl = (doc) => {
  // check if image is already has a url
  if (doc.image && doc.image.startsWith("http")) {
    return;
  } else {
    const imageUrl = `${process.env.BASE_URL}/products/${doc.image}`;
    doc.image = imageUrl;
  }

  // check if sliderImages is empty return
  if (doc.sliderImages && doc.sliderImages.length === 0) {
    return;
  } else {
    const imgsList = [];
    doc.sliderImages &&
      doc.sliderImages.forEach((img) => {
        if (img.startsWith("http")) {
          imgsList.push(img);
        }
        const imageUrl = `${process.env.BASE_URL}/products/${img}`;
        imgsList.push(imageUrl);
      });
    doc.sliderImages = imgsList;
  }
};

//1)FOR_create_save
productSchema.post("save", function (doc) {
  setFullImageUrl(doc);
});
//2)FOR_findOne_findAll-findByIdAndUpdate
productSchema.post("init", function (doc) {
  setFullImageUrl(doc);
});

const Product = mongoose.model("Product", productSchema);

export default Product;
