import mongoose, { Schema, models, model, trusted } from "mongoose";

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
    src: {
      type: String,
    },
    imageId: {
      type: String,
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
      required: false,
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
      code: {
        type: String,
        default: null,
      },
      expireDate: {
        type: Date,
      },
    },
    role: {
      type: String,
      enum: ["manager", "admin", "employee", "customer"],
      default: "customer",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    accountStatus: {
      type: String,
      enum: ["working", "closed"],
      default: "working",
    },
    shippingAddress: [
      {
        name: { type: String, required: true },
        address1: {
          type: String,
          required: [true, "Adress 1 is required"],
        },
        address2: {
          type: String,
          required: [true, "Adress 2 is required"],
        },
        city: {
          type: String,
          required: true,
        },
        state: {
          type: String,
          required: true,
        },
        country: {
          value: {
            type: String,
          },
          label: {
            type: String,
          },
        },
        postalCode: {
          type: String,
          required: true,
        },
        contact: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);

export default User;
