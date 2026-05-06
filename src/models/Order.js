import mongoose from "mongoose";
import {
  ORDER_STATUS_CONFIRMED,
  ORDER_STATUS_DELIVERED,
  ORDER_STATUS_PENDING,
  ORDER_STATUS_SHIPPED,
} from "../constants/orderStatuses.js";
const orderSchema = mongoose.Schema({
  orderNumber: {
    type: String,
    required: [true, "Order tracking is Required."],
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "User id is required ."],
  },
  orderItems: [
    {
      product: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: [true, "Product id is required ."],
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  status: {
    type: String,
    default: "",
    enum: [
      ORDER_STATUS_PENDING,
      ORDER_STATUS_CONFIRMED,
      ORDER_STATUS_DELIVERED,
      ORDER_STATUS_SHIPPED,
    ],
  },
  totalPrice: {
    type: Number,
    required: [true, "Total price is required."],
  },
  shippingAddress: {
    city: {
      type: String,
      required: [true, "Shipping address city is required"],
    },
    country: {
      type: String,
      default: "Nepal",
    },
    province: {
      type: String,
      required: [true, "Shipping address Province  is required"],
    },
    strict: {
      type: String,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    immutable: true,
  },
  payment: {
    type: mongoose.Types.ObjectId,
    ref: "Payment ",
  },
});

const model = mongoose.model("Order", orderSchema);
export default model;
