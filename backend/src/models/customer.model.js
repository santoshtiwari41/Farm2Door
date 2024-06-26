import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    name: String,
    password: String,
    address: String,
    image: String,
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    refreshToken: {
      type: String,
    },
    otp: {
      type: Number,
    },
    otpExpiry: {
      type: Date,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
  },
  { timestamps: true }
);

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;
