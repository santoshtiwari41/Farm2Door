import express from "express";

import {
  adminSignin, adminSignup, respondToFarmer
} from "../controllers/admin.controller.js";

const router = express.Router();

router.post("/signup", adminSignup)
router.post("/signin", adminSignin)
router.post("/:id/verify", respondToFarmer)
export default router;
