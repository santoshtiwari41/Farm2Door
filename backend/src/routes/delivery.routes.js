import express from 'express' ;
import { createDelivery } from '../controllers/delivery.controller.js';


const router = express.Router();

router.post("/delivery", createDelivery)

export default router;