import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

import Customer from "../models/customer.model.js";

import { generateOTP, sendOTP, verifyOTP } from "../services/otp.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../services/tokens.js";

export const registerPhoneNumber = async (req, res) => {
  const { phone } = req.body;

  if (!phone || phone.length !== 10 || !/^\d+$/.test(phone)) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Invalid phone number" });
  }

  const existingCustomer = await Customer.findOne({ phone });
  if (existingCustomer) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Phone number is already registered" });
  }

  try {
    const { otp, otpExpiry } = generateOTP();
    const customer = await Customer.create({ phone, otp, otpExpiry });
    await sendOTP(otp, phone);

    return res
      .status(StatusCodes.OK)
      .json({ message: "Phone number registered successfully", customer });
  } catch (error) {
    console.error("Error registering phone number:", error);

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error: " + error.message });
  }
};

export const verifyPhoneNumber = async (req, res) => {
  const { otp } = req.body;
  const customerId = req.params.id;

  try {
    if (!customerId) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ error: "Please provide a valid customerId." });
    }

    if (!otp) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ error: "Please provide a valid OTP." });
    }

    const existingCustomer = await Customer.findById(customerId);
    if (!existingCustomer) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send({ error: "Customer not found." });
    }

    const verificationResult = verifyOTP(
      parseInt(otp),
      existingCustomer.otp,
      existingCustomer.otpExpiry
    );

    if (!verificationResult.isValid) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ error: verificationResult.message });
    }

    await Customer.findByIdAndUpdate(existingCustomer._id, {
      $set: { isVerified: true, otp: null, otpExpiry: null },
    });

    return res
      .status(StatusCodes.OK)
      .send({ message: "OTP verification successful." });
  } catch (error) {
    console.error("OTP verification error:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: "Something went wrong during OTP verification." });
  }
};

export const signupCustomer = async (req, res) => {
  const customerId = req.params.id;
  const { name, gender, address, password } = req.body;

  // Validation
  if (!name || !gender || !address || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ error: "Name, gender, and address are required fields." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const customer = await Customer.findByIdAndUpdate(
      customerId,
      { $set: { name, gender, address, password: hashedPassword } },
      { new: true }
    );

    if (!customer) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send({ error: "Customer not found." });
    }

    return res
      .status(StatusCodes.OK)
      .send({ message: "Customer registration successful.", customer });
  } catch (error) {
    console.error("Customer registration error:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: "Error while sign up customer." });
  }
};

export const signinCustomer = async (req, res) => {
  const { phone, password } = req.body;

  if (!phone || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ error: "Number and password are required fields." });
  }

  try {
    const existingCustomer = await Customer.findOne({ phone });
    if (!existingCustomer) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Phone number is not registered yet" });
    }
    if (!existingCustomer.isVerified) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ error: "Please verify your phone number first" });
    }

    const isPasswordMatch = bcrypt.compare(password, existingCustomer.password);

    if (!isPasswordMatch) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ error: "Invalid credentials." });
    }

    const accessToken = generateAccessToken({
      name: existingCustomer.name,
      _id: existingCustomer._id,
    });
    const refreshToken = generateRefreshToken({
      _id: existingCustomer._id,
    });

    await Customer.findByIdAndUpdate(existingCustomer._id, {
      $set: { refreshToken },
    });

    return res.status(StatusCodes.OK).send({
      message: "Customer sign in successfull.",
      accessToken,
      customer: existingCustomer,
    });
  } catch (error) {
    console.error("Customer registration error:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: "Error while sign in customer." });
  }
};

export const requestOTP = async (req, res) => {
  const customerId = req.params.id;

  try {
    if (!customerId) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ error: "Please provide a valid customerId." });
    }

    const existingCustomer = await Customer.findById(customerId);
    if (!existingCustomer) {
      return res.status(StatusCodes.NOT_FOUND).send({
        error: "Customer with this phone number is not registered yet.",
      });
    }

    const { otp, otpExpiry } = generateOTP();
    await existingCustomer.updateOne({ $set: { otp, otpExpiry } });

    await sendOTP(otp, existingCustomer.phone);
    return res.status(StatusCodes.OK).send({
      message: "OTP has been sent. Check your message for the OTP.",
    });
  } catch (error) {
    console.error("OTP request error:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: "Something went wrong during OTP request." });
  }
};

export const customerProfile = async (req, res) => {
  const customerId = req.user._id;

  try {
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(StatusCodes.NOT_FOUND).send({
        error: "Customer not found.",
      });
    }

    return res.status(StatusCodes.OK).send({
      message: "Customer profile.",
      customer,
    });
  } catch (error) {
    console.error("Customer profile request error:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: "Something went wrong during customer profile." });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().populate("orders");
    if (!customers) {
      return res.status(StatusCodes.NOT_FOUND).send({
        error: "Customers not found.",
      });
    }

    return res.status(StatusCodes.OK).send({
      message: "Customers",
      customers,
    });
  } catch (error) {
    console.error("Customer profile request error:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: "Something went wrong during customers." });
  }
};
export const getCustomersByParams = async (req, res) => {
  const customerId = req.params.id;
  try {
    const customer = await Customer.findById(customerId).populate("orders");
    if (!customer) {
      return res.status(StatusCodes.NOT_FOUND).send({
        error: "Customer not found.",
      });
    }

    return res.status(StatusCodes.OK).send({
      message: "Customer",
      customer,
    });
  } catch (error) {
    console.error("Customer profile request error:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: "Something went wrong during customers." });
  }
};

export const countCustomers = async (req, res) => {
  try {
    const count = await Customer.countDocuments();
    return res
      .status(StatusCodes.OK)
      .send({ message: "customer count", count });
  } catch (error) {
    console.error("Customer count request error:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: "Something went wrong during customers." });
  }
};
