import { StatusCodes } from "http-status-codes";
import Category from "../models/category.model.js";

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Category name is required" });
    }

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Category already exists" });
    }

    const newCategory = await Category.create({ name });
    res.status(StatusCodes.CREATED).json(newCategory);
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error", error: error.message });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate("products");
    res.status(StatusCodes.OK).json(categories);
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error", error: error.message });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId).populate("products");

    if (!category) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Category not found" });
    }

    res.status(StatusCodes.OK).json(category);
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error", error: error.message });
  }
};

const updateCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const { name } = req.body;

    if (!name) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "No fields to update" });
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { name },
      { new: true }
    );

    if (!updatedCategory) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Category not found" });
    }

    res.status(StatusCodes.OK).json(updatedCategory);
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error", error: error.message });
  }
};

const deleteCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const deletedCategory = await Category.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Category not found" });
    }

    res
      .status(StatusCodes.OK)
      .json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error", error: error.message });
  }
};

export {
  createCategory,
  deleteCategoryById,
  getCategories,
  getCategoryById,
  updateCategoryById,
};
