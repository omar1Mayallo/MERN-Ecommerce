import mongoose from "mongoose";
import {PAYMENT_METHODS} from "../constants/index.js";
const {CASH, CARD} = PAYMENT_METHODS;

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Order must be belong to user"],
    },
    cartItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        price: Number,
        quantity: Number,
        color: String,
        size: String,
      },
    ],
    paymentMethod: {
      type: String,
      enum: [CARD, CASH],
      default: CASH,
    },
    shippingAddress: {
      detailedAddress: {
        type: String,
        required: [true, "please enter your address in details"],
      },
      phone: {
        type: String,
        required: [true, "please enter your phone number"],
      },
      city: {
        type: String,
        required: [true, "please enter your city"],
      },
      postalCode: {
        type: String,
        required: [true, "please enter your postal code"],
      },
    },
    totalOrderPrice: {
      type: Number,
      required: [true, "Order must have a price"],
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
    paidAt: Date,
    deliveredAt: Date,
  },
  {timestamps: true}
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
