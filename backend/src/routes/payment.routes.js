// paymentRoutes.js
import express from 'express';
import { initiateKhaltiPayment } from '../controllers/payment.controller.js';

const router = express.Router();

// Route to initiate Khalti payment
router.post('/khalti-payment', initiateKhaltiPayment);

export default router;
