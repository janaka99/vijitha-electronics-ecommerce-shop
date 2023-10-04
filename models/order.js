import mongoose, { Schema, models, model } from "mongoose";

const OrderSchema = new Schema(
  {
    orderItems: [
      {
        type: Schema.Types.ObjectId,
        ref: "OrderItem",
      },
    ],
    status: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Processing",
        "Dispatched",
        "Delivered",
        "Canceled",
      ],
      default: "Pending",
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    confirmedBy: {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: null,
      },
      datetime: {
        type: Date,
      },
      isConfirmed: {
        type: Boolean,
        default: false,
      },
    },
    processingBy: {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: null,
      },
      datetime: {
        type: Date,
      },
      isProcessing: {
        type: Boolean,
        default: false,
      },
    },
    dispatchedBy: {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: null,
      },
      datetime: {
        type: Date,
      },
      isDispatched: {
        type: Boolean,
        default: false,
      },
    },
    canceledBy: {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      datetime: {
        type: Date,
      },
      isCanceled: {
        type: Boolean,
        default: false,
      },
    },
    shippingDetails: {
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
        type: Number,
        required: true,
      },
      contact: {
        type: Number,
        required: true,
      },
    },
  },
  { timestamps: true }
);

const Order = models.Order || model("Order", OrderSchema);

export default Order;
