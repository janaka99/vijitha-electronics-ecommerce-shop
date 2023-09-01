import mongoose, { Schema, models, model } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Quentity is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone Number is required"],
      unique: true,
    },
    NIC: {
      type: String,
      required: [true, "NIC is required"],
      unique: true,
    },
    address1: {
      type: String,
      required: [true, "Adress 1 is required"],
    },
    address2: {
      type: String,
      required: [true, "Adress 2 is required"],
    },
    address3: {
      type: String,
    },
    emailVerification: {
      type: String,
      required: true,
      unique: true,
    },
    passResetCode: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: ["manager", "admin", "employee"],
      default: "manager",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    accountStatus: {
      type: String,
      enum: ["working", "resigned"],
      default: "working",
    },
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
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);

export default User;
