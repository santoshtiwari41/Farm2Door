import express from "express";
import {
  countProducts,
  createProduct,
  deleteProductById,
  getAllProducts,
  getProductById,
  updateProductById,
} from "../controllers/product.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import uploadMiddleware from "../middlewares/upload.middleware.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/count", countProducts);
router.use(authMiddleware);
router.route("/").post(uploadMiddleware.array("images"), createProduct);
router
  .route("/:id")
  .get(getProductById)
  .put(uploadMiddleware.array("images"), updateProductById)
  .delete(deleteProductById);

export default router;
