import BillItem from "@components/BillItem";
import mongoose, { Schema, models, model } from "mongoose";

const BillSchema = new Schema(
  {
    billItems: [
      {
        name: String,
        quantity: Number,
        price: Number,
        itemId: {
          type: Schema.Types.ObjectId,
          ref: "Item",
        },
        reviewed: {
          type: Boolean,
          default: false,
        },
      },
    ],
    cashier: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    totalCost: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Bill = models.Bill || model("Bill", BillSchema);

export default Bill;
