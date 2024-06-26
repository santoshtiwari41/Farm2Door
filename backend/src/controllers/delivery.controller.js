import { StatusCodes } from "http-status-codes";
import Delivery from "../models/delivery.model.js";
import Payment from "../models/payment.model.js";

const createDelivery = async (req, res) => {
  try {
    const { transactionId, deliveryAddress } = req.body;

    if (!transactionId || !deliveryAddress) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "transactionId and deliveryAddress are required" });
    }

    const existingTransaction = await Transaction.findById(transactionId);
    if (!existingTransaction) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Transaction not found" });
    }

    const existingDelivery = await Delivery.findOne({
      transaction: transactionId,
    });
    if (existingDelivery) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Delivery already existed for this transaction" });
    }

    const newDelivery = new Delivery({
      transaction: transactionId,
      deliveryAddress,
    });

    const savedDelivery = await newDelivery.save();

    await Transaction.findByIdAndUpdate(transactionId, {
      $set: { deliveryStatus: "Pending" },
    });

    res
      .status(StatusCodes.OK)
      .json({
        success: true,
        message: "Delivery created successfully",
        delivery: savedDelivery,
      });
  } catch (error) {
    console.error("Error creating delivery:", error);
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: "Error creating delivery" });
  }
};

export { createDelivery };
