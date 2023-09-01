import { Timestamp } from "mongodb";
import mongoose, { Schema, models, model } from "mongoose";

const ItemSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      unique: true,
    },
    qty: {
      type: Number,
      required: [true, "Quentity is required"],
      minimum: 0,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    src: {
      type: String,
      required: [true, "Image is required"],
    },
    imageId: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    addedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    status: {
      type: String,
      enum: ["available", "not_available"],
      default: "available",
    },
    totalSold: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        description: String,
        ratings: {
          type: Number,
          enum: [1, 2, 3, 4, 5],
          required: true,
        },
        userId: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
  },
  { timestamps: true }
);

const Item = models.Item || model("Item", ItemSchema);

export default Item;
