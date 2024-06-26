import { StatusCodes } from "http-status-codes";

import Category from "../models/category.model.js";
import Farmer from "../models/farmer.model.js";
import Product from "../models/product.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createProduct = async (req, res) => {
  console.log("here is the controller");
  try {
    const { name, description, quantity, price, category } = req.body;
    const farmerId = req.user._id;

    const existingCategory = await Category.findById(category);
    if (!existingCategory) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Category not found" });
    }

    const images = [];
    for (const file of req.files) {
      const cloudinaryResponse = await uploadOnCloudinary(file.path);
      images.push(cloudinaryResponse.url);
    }

    const savedProduct = await Product.create({
      name,
      description,
      quantity,
      price,
      category,
      farmer: farmerId,
      images,
    });

    await Category.findByIdAndUpdate(category, {
      $push: { products: savedProduct._id },
    });

    await Farmer.findByIdAndUpdate(
      farmerId,
      { $push: { products: savedProduct._id } },
      { new: true }
    );

    return res.status(StatusCodes.CREATED).json(savedProduct);
  } catch (error) {
    console.error(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error", error: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    res.status(StatusCodes.OK).json(products);
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error", error: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId).populate("category");

    if (!product) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Product not found" });
    }

    res.status(StatusCodes.OK).json(product);
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error", error: error.message });
  }
};

const updateProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, description, price, category } = req.body;

    if (!name && !description && !price && !category && !req.files) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "No fields to update" });
    }

    // Update category unconditionally
    const existingCategory = category
      ? await Category.findById(category)
      : null;

    if (category && !existingCategory) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Category not found" });
    }

    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Product not found" });
    }

    if (category && existingProduct.category !== category) {
      // Pull the product from the old category
      await Category.findByIdAndUpdate(existingProduct.category, {
        $pull: { products: existingProduct._id },
      });

      // Push the product to the new category
      await Category.findByIdAndUpdate(category, {
        $push: { products: existingProduct._id },
      });
    }

    const newImages = [];
    for (const file of req.files) {
      try {
        const cloudinaryResponse = await uploadOnCloudinary(file.path);
        newImages.push(cloudinaryResponse.url);
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: "Error uploading image to Cloudinary" });
      }
    }

    const updatedImages = existingProduct.images.concat(newImages);

    // Validate and sanitize input data as needed

    existingProduct.name = name || existingProduct.name;
    existingProduct.description = description || existingProduct.description;
    existingProduct.price = price || existingProduct.price;
    existingProduct.category = category || existingProduct.category;
    existingProduct.images = updatedImages;

    const updatedProduct = await existingProduct.save();

    res.status(StatusCodes.OK).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

const deleteProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const farmerId = req.user._id;

    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Product not found" });
    }

    await Category.findByIdAndUpdate(deletedProduct.category, {
      $pull: { products: deletedProduct._id },
    });

    await Farmer.findByIdAndUpdate(
      farmerId,
      { $pull: { products: deletedProduct._id } },
      { new: true }
    );

    res
      .status(StatusCodes.OK)
      .json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error", error: error.message });
  }
};

const countProducts = async (req, res) => {
  try {
    const count = await Product.countDocuments();
    return res.status(StatusCodes.OK).send({ message: "Product count", count });
  } catch (error) {
    console.error("Product count request error:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: "Something went wrong during Product." });
  }
};
export {
  countProducts,
  createProduct,
  deleteProductById,
  getAllProducts,
  getProductById,
  updateProductById,
};
