import mongoose, { Schema, models, model } from "mongoose";

const CartSchema = new Schema(
  {
    itemId: {
      type: Schema.Types.ObjectId,
      ref: "Item",
    },
    quantity: {
      type: Number,
      default: 1,
      min: 1,
    },

    customer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Cart = models.Cart || model("Cart", CartSchema);

export default Cart;
