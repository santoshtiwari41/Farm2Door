import express from "express";
import {
  createCategory,
  deleteCategoryById,
  getCategories,
  getCategoryById,
  updateCategoryById,
} from "../controllers/category.controller.js";
// import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// router.use(authMiddleware);
router.route("/").post(createCategory).get(getCategories);
router
  .route("/:id")
  .get(getCategoryById)
  .put(updateCategoryById)
  .delete(deleteCategoryById);

export default router;