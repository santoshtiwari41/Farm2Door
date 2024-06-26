import mongoose from "mongoose";

const distributerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
        required: true,
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

distributerSchema.index({ location: "2dsphere" });

const Distributer = mongoose.model("Distributer", distributerSchema);

export default Distributer;
