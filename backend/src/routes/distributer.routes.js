import express from "express";
import {
  countDistributers,
  createDistributer,
  deleteDistributerById,
  findNearestDistributers,
  getAllDistributers,
  getDistributerById,
  updateDistributerById,
} from "../controllers/distributer.controller.js";

const router = express.Router();

router.get("/count", countDistributers);
router.get("/nearest", findNearestDistributers);
router.route("/").post(createDistributer).get(getAllDistributers);
router
  .route("/:id")
  .get(getDistributerById)
  .put(updateDistributerById)
  .delete(deleteDistributerById);

export default router;
