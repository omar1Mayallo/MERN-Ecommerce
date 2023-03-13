import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "Category name is required"],
      minlength: [3, "Category name minimum length 3 characters"],
      maxlength: [30, "Category name maximum length 30 characters"],
    },
    image: {
      type: String,
      required: [true, "Category must have image"],
    },
    description: {
      type: String,
      trim: true,
      minlength: [20, "Category description minimum length 20 characters"],
      maxlength: [500, "Category description maximum length 500 characters"],
    },
  },
  {timestamps: true}
);
//_SET_FULL_IMAGE_URL_//
const setFullImageUrl = (doc) => {
  //check if image is already has a url
  if (doc.image && doc.image.startsWith("http")) {
    return;
  } else {
    const fullImgUrl = `${process.env.BASE_URL}/categories/${doc.image}`;
    doc.image = fullImgUrl;
  }
};
//1)FOR_create_save
categorySchema.post("save", function (doc) {
  setFullImageUrl(doc);
});
//2)FOR_findOne_findAll-findByIdAndUpdate
categorySchema.post("init", function (doc) {
  setFullImageUrl(doc);
});
const Category = mongoose.model("Category", categorySchema);

export default Category;
