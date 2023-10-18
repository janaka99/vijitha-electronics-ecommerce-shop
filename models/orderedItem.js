import BillItem from "@components/BillItem";
import mongoose, { Schema, models, model } from "mongoose";
import Item from "./item";

const OrderItemSchema = new Schema(
  {
    itemId: {
      type: Schema.Types.ObjectId,
      ref: "Item",
    },
    product_img: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    boughtPrice_unit: {
      type: Number,
      required: true,
      default: 0,
    },
    boughtPrice_unit_eth: {
      type: Number,
      required: true,
      default: 0,
    },
    reviewed: {
      type: Boolean,
      default: false,
      required: true,
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    orderId: {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  },
  { timestamps: true }
);

const OrderItem = models.OrderItem || model("OrderItem", OrderItemSchema);

export default OrderItem;
