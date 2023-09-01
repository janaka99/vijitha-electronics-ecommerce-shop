import mongoose, { Schema, models, model } from "mongoose";

const ReviewChema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      unique: true,
    },
    addedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    item: {
      type: Schema.Types.ObjectId,
      ref: "Item",
    },
  },
  { timestamps: true }
);

const Review = models.Review || model("Review", ReviewChema);

export default Review;
