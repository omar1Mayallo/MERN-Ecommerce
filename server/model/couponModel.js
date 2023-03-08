import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Coupon name is required"],
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Coupon must belong to product cart item"],
    },
    expire: {
      type: Date,
      required: [true, "Coupon expire time is required"],
    },
    discount: {
      type: Number,
      required: [true, "Coupon discount value is required"],
      max: [75, "Coupon discount maximum value is 75"],
      min: [5, "Coupon discount minimum value is 5"],
    },
  },
  {timestamps: true}
);

const Coupon = mongoose.model("Coupon", couponSchema);

export default Coupon;
