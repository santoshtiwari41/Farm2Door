// paymentModel.js
import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    successUrl: {
      type: String,
      required: true,
    },
    failureUrl: {
      type: String,
      required: true,
    },
    // Add other fields related to payments if needed
  },
  { timestamps: true }
);

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
