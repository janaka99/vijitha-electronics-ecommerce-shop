import { connectToDB } from "@utils/database";
import { Timestamp } from "mongodb";
import mongoose, { Schema, models, model } from "mongoose";
import Item from "./item";

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      unique: [true, "Category already exists"],
    },
  },
  { timestamps: true }
);

CategorySchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    console.log("triggered findOneAndDelete ");
    try {
      connectToDB();
      const rs = await Item.find();
      for (let i = 0; i < rs.length; i++) {
        Item.updateOne({ _id: rs[i]._id }, { $pull: { category: rs[i]._id } });
      }
    } catch (err) {
      next(err);
    }
  }
);

const Category = models.Category || model("Category", CategorySchema);

export default Category;
