import { StatusCodes } from "http-status-codes";

import Customer from "../models/customer.model.js";
import Distributor from "../models/distributer.model.js";
import Order from "../models/order.model.js";

async function createOrder(req, res) {
  const customerId = req.user._id;

  try {
    const { distributer, products, totalAmount } = req.body;

    const newOrder = await Order.create({
      customer: customerId,
      distributer,
      products,
      totalAmount,
    });

    await Distributor.findByIdAndUpdate(distributer, {
      $push: { orders: newOrder._id },
    });

    await Customer.findByIdAndUpdate(customerId, {
      $push: { orders: newOrder._id },
    });

    res.status(StatusCodes.CREATED).json(newOrder);
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error", error: error.message });
  }
}

async function getOrders(req, res) {
  try {
    const orders = await Order.find()
      .populate("customer distributer products.product")
      .exec();

    res.status(StatusCodes.OK).json(orders);
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error", error: error.message });
  }
}

async function updateStatus(req, res) {
  const { status } = req.body;
  try {
    const orderId = req.params.id;
    const order = await Order.findByIdAndUpdate(
      orderId,
      { $set: { status } },
      { new: true }
    );

    if (!order) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Order not found" });
    }
    res.status(StatusCodes.OK).json(order);
  } catch (error) {
    console.error("Error while updating order status", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error", error: error.message });
  }
}
async function getOrderById(req, res) {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId)
      .populate("customer distributer products.product")
      .exec();

    if (!order) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Order not found" });
    }

    res.status(StatusCodes.OK).json(order);
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error", error: error.message });
  }
}

async function updateOrderById(req, res) {
  try {
    const orderId = req.params.id;
    const {
      customer,
      distributer,
      products,
      status,
      totalAmount,
      deliveryAddress,
      deliveryDate,
    } = req.body;

    if (!customer && !distributer && !products && !status && !totalAmount) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "No fields to update" });
    }

    const existingOrder = await Order.findById(orderId);
    if (!existingOrder) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Order not found" });
    }

    existingOrder.customer = customer || existingOrder.customer;
    existingOrder.distributer = distributer || existingOrder.distributer;
    existingOrder.products = products || existingOrder.products;
    existingOrder.status = status || existingOrder.status;
    existingOrder.totalAmount = totalAmount || existingOrder.totalAmount;
    existingOrder.deliveryAddress =
      deliveryAddress || existingOrder.deliveryAddress;
    existingOrder.deliveryDate = deliveryDate || existingOrder.deliveryDate;

    const updatedOrder = await existingOrder.save();

    res.status(StatusCodes.OK).json(updatedOrder);
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error", error: error.message });
  }
}

async function deleteOrderById(req, res) {
  try {
    const orderId = req.params.id;
    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Order not found" });
    }

    // Remove references in the Customer model
    await Customer.findByIdAndUpdate(deletedOrder.customer, {
      $pull: { orders: deletedOrder._id },
    });
    await Distributor.findByIdAndUpdate(deletedOrder.distributer._id, {
      $pull: { orders: deletedOrder._id },
    });

    res.status(StatusCodes.OK).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error", error: error.message });
  }
}

export const countOrders = async (req, res) => {
  try {
    const count = await Order.countDocuments();
    return res.status(StatusCodes.OK).send({ message: "Order count", count });
  } catch (error) {
    console.error("Order count request error:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: "Something went wrong during Order." });
  }
};

export {
  createOrder,
  deleteOrderById,
  getOrderById,
  getOrders,
  updateOrderById,
  updateStatus,
};
