import express from "express";

import {
  countFarmers,
  farmerProfile,
  getFarmers,
  registerPhoneNumber,
  requestOTP,
  signinFarmer,
  signupFarmer,
  verifyPhoneNumber,
} from "../controllers/farmer.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerPhoneNumber);
router.get("/count", countFarmers);
router.get("/profile", authMiddleware, farmerProfile);
router.get("/", authMiddleware, getFarmers);
router.post("/:id/verify", verifyPhoneNumber);
router.post("/:id/signup", signupFarmer);
router.post("/signin", signinFarmer);
router.post("/:id/request-otp", requestOTP);

export default router;
