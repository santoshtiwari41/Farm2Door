import Category from "../models/category.model.js";

const agriculturalCategories = [
  {
    name: "Crops",
  },
  {
    name: "Vegetables",
  },
  {
    name: "Fruits",
  },
  {
    name: "Herbs",
  },
  {
    name: "Nuts and Seeds",
  },
  {
    name: "Legumes",
  },
  {
    name: "Livestock",
  },
];
export const createCategories = async () => {
  try {
    await Category.insertMany(agriculturalCategories);
    console.log(
      "Successfully added static agricultural categories to the database"
    );
  } catch (error) {
    console.error(
      "Error while inserting static agricultural categories:",
      error.message
    );
  }
};
