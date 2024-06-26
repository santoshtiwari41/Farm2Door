import mongoose from "mongoose";

const farmerSchema = new mongoose.Schema(
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
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

const Farmer = mongoose.model("Farmer", farmerSchema);

export default Farmer;
