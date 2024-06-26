import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

import Farmer from "../models/farmer.model.js";

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

  const existingFarmer = await Farmer.findOne({ phone });
  if (existingFarmer) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Phone number is already registered" });
  }

  try {
    const { otp, otpExpiry } = generateOTP();
    await sendOTP(otp, phone);
    const farmer = await Farmer.create({ phone, otp, otpExpiry });

    return res
      .status(StatusCodes.OK)
      .json({ message: "Phone number registered successfully", farmer });
  } catch (error) {
    console.error("Error registering phone number:", error);

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error: " + error.message });
  }
};

export const verifyPhoneNumber = async (req, res) => {
  const { otp } = req.body;
  const farmerId = req.params.id;

  try {
    if (!farmerId) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ error: "Please provide a valid farmerId." });
    }

    if (!otp) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ error: "Please provide a valid OTP." });
    }

    const existingFarmer = await Farmer.findById(farmerId);
    if (!existingFarmer) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send({ error: "Farmer not found." });
    }

    const verificationResult = verifyOTP(
      parseInt(otp),
      existingFarmer.otp,
      existingFarmer.otpExpiry
    );

    if (!verificationResult.isValid) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ error: verificationResult.message });
    }

    await Farmer.findByIdAndUpdate(existingFarmer._id, {
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

export const signupFarmer = async (req, res) => {
  const farmerId = req.params.id;
  const { name, gender, address, password } = req.body;

  if (!name || !gender || !address || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ error: "Name, gender, and address are required fields." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const farmer = await Farmer.findByIdAndUpdate(
      farmerId,
      { $set: { name, gender, address, password: hashedPassword } },
      { new: true }
    );

    if (!farmer) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send({ error: "Farmer not found." });
    }

    return res
      .status(StatusCodes.OK)
      .send({ message: "Farmer registration successful.", farmer });
  } catch (error) {
    console.error("Farmer registration error:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: "Error while sign up farmer." });
  }
};

export const signinFarmer = async (req, res) => {
  console.log(req.body);
  const { phone, password } = req.body;

  if (!phone || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ error: "Number and password are required fields." });
  }

  try {
    const existingfarmer = await Farmer.findOne({ phone });
    if (!existingfarmer) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Phone number is not registered yet" });
    }
    if (!existingfarmer.isVerified) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ error: "Please verify your phone number first" });
    }

    const isPasswordMatch = bcrypt.compare(password, existingfarmer.password);

    if (!isPasswordMatch) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ error: "Invalid credentials." });
    }

    const accessToken = generateAccessToken({
      name: existingfarmer.name,
      _id: existingfarmer._id,
    });
    const refreshToken = generateRefreshToken({
      _id: existingfarmer._id,
    });

    await Farmer.findByIdAndUpdate(existingfarmer._id, {
      $set: { refreshToken },
    });

    return res.status(StatusCodes.OK).send({
      message: "farmer sign in successfull.",
      accessToken,
      farmer: existingfarmer,
    });
  } catch (error) {
    console.error("farmer registration error:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: "Error while sign in farmer." });
  }
};

export const requestOTP = async (req, res) => {
  const farmerId = req.params.id;

  try {
    if (!farmerId) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ error: "Please provide a valid farmerId." });
    }

    const existingFarmer = await Farmer.findById(farmerId);
    if (!existingFarmer) {
      return res.status(StatusCodes.NOT_FOUND).send({
        error: "Farmer with this phone number is not registered yet.",
      });
    }

    const { otp, otpExpiry } = generateOTP();
    await existingFarmer.updateOne({ $set: { otp, otpExpiry } });

    await sendOTP(otp, existingFarmer.phone);
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

export const farmerProfile = async (req, res) => {
  const farmerId = req.user._id;

  try {
    const farmer = await Farmer.findById(farmerId).populate("products");
    if (!farmer) {
      return res.status(StatusCodes.NOT_FOUND).send({
        error: "Farmer not found.",
      });
    }

    return res.status(StatusCodes.OK).send({
      message: "Farmer profile.",
      farmer,
    });
  } catch (error) {
    console.error("Farmer profile request error:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: "Something went wrong during farmer profile." });
  }
};
export const getFarmers = async (req, res) => {
  try {
    const farmers = await Farmer.find();
    if (!farmers) {
      return res.status(StatusCodes.NOT_FOUND).send({
        error: "Farmer not found.",
      });
    }

    return res.status(StatusCodes.OK).send({
      message: "Farmers",
      farmers,
    });
  } catch (error) {
    console.error("Farmers request error:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: "Something went wrong during farmers." });
  }
};

export const countFarmers = async (req, res) => {
  try {
    const count = await Farmer.countDocuments();
    return res.status(StatusCodes.OK).send({ message: "farmer count", count });
  } catch (error) {
    console.error("Farmer count request error:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: "Something went wrong during farmers." });
  }
};
