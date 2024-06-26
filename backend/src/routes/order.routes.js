import express from "express";
import {
  countOrders,
  createOrder,
  deleteOrderById,
  getOrderById,
  getOrders,
  updateOrderById,
  updateStatus,
} from "../controllers/order.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getOrders);
router.get("/count", countOrders);
router.patch("/:id", updateStatus);

router.use(authMiddleware);
router.route("/").post(createOrder);
router
  .route("/:id")
  .get(getOrderById)
  .put(updateOrderById)

  .delete(deleteOrderById);

export default router;
