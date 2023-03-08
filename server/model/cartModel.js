import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: [true, "Cart must belong to user"],
    },
    cartItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {type: Number, default: 1},
        price: Number,
        size: String,
        color: String,
      },
    ],
    totalPrice: Number,
    totalPriceAfterCouponDiscount: Number,
  },
  {timestamps: true}
);
const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
