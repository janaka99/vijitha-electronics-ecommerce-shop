import mongoose, { Schema, models, model } from "mongoose";

const ReviewChema = new Schema(
  {
    message: {
      type: String,
      required: [true, "Name is required"],
      unique: true,
    },
    rating: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
    },
    addedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    item: {
      type: Schema.Types.ObjectId,
      ref: "Item",
    },
    orderItem: {
      type: Schema.Types.ObjectId,
      ref: "OrderItem",
    },
  },
  { timestamps: true }
);

const Review = models.Review || model("Review", ReviewChema);

export default Review;
