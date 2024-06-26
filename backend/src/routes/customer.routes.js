import express from "express";

import {
  countCustomers,
  customerProfile,
  getCustomers,
  getCustomersByParams,
  registerPhoneNumber,
  requestOTP,
  signinCustomer,
  signupCustomer,
  verifyPhoneNumber,
} from "../controllers/customer.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getCustomers);
router.get("/count", countCustomers);
router.get("/profile", authMiddleware, customerProfile);
router.get("/:id", getCustomersByParams);
router.post("/register", registerPhoneNumber);
router.post("/:id/verify", verifyPhoneNumber);
router.post("/:id/signup", signupCustomer);
router.post("/signin", signinCustomer);
router.post("/:id/request-otp", requestOTP);

export default router;
