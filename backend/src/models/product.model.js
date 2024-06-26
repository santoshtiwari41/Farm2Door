import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    qualityTest: {
      type: Boolean,
      default: false,
    },
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Farmer",
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    images: [{ type: String }],
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
