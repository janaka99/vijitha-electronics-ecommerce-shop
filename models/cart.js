import mongoose, { Schema, models, model } from "mongoose";

const CartSchema = new Schema(
  {
    cart: [
      {
        itemId: {
          type: Schema.Types.ObjectId,
          ref: "Item",
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
      { timestamps: true },
    ],
    customer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Cart = models.Cart || model("Cart", CartSchema);

export default Cart;
