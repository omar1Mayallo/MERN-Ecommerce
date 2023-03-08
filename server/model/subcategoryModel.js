import mongoose from "mongoose";

const SubcategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, "Subcategory name is required"],
      minlength: [2, "Subcategory name minimum length 2 characters"],
      maxlength: [30, "Subcategory name maximum length 30 characters"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Subcategory must belong to a Category"],
    },
  },
  {timestamps: true}
);

const Subcategory = mongoose.model("Subcategory", SubcategorySchema);

export default Subcategory;
