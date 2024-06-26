import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    // delivery: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Delivery',
    // },
    // transaction: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Transaction',
    // },
    distributer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Distributer",
      required: true,
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    status: {
      type: String,
      enum: ["Pending", "Cancelled", "Delivered"],
      default: "Pending",
    },
    totalAmount: {
      type: Number,
      required: true,
    },
  },

  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
