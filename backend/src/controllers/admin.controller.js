import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import Admin from "../models/admin.model.js";
import Product from "../models/product.model.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../services/tokens.js";
export const adminSignup = async (req, res) => {
  const { phone, password } = req.body;
  if (!phone || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ error: "Number and password are required fields." });
  }
  try {
    const existingAdmin = await Admin.findOne({ phone });
    if (existingAdmin) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Phone number is registered already" });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({ phone, password: hashPassword });

    return res.status(StatusCodes.OK).send({
      message: "admin sign in successfull.",
      admin,
    });
  } catch (error) {
    console.error("admin registration error:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: "Error while sign in admin." });
  }
};

export const adminSignin = async (req, res) => {
  const { phone, password } = req.body;

  if (!phone || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ error: "Number and password are required fields." });
  }

  try {
    const existingAdmin = await Admin.findOne({ phone });
    if (!existingAdmin) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Phone number is not registered yet" });
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      existingAdmin.password
    );

    if (!isPasswordMatch) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ error: "Invalid credentials." });
    }

    const accessToken = generateAccessToken({
      name: existingAdmin.name,
      _id: existingAdmin._id,
    });
    const refreshToken = generateRefreshToken({
      _id: existingAdmin._id,
    });

    await Admin.findByIdAndUpdate(existingAdmin._id, {
      $set: { refreshToken },
    });

    return res.status(StatusCodes.OK).send({
      message: "admin sign in successfull.",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error("admin registration error:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: "Error while sign in admin." });
  }
};

const respondToFarmer = async (req, res) => {
  console.log("request: ", req.body
  )
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Product not found" });
    }

    if (product.qualityTest) {
      
      return res
        .status(StatusCodes.OK)
        .json({ message: "Crops accepted by admin" });
    } else {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "crops rejected by admin" });
    }
  } catch (error) {
    console.error("Error responding to farmer:", error);
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Error responding to" });
  }
};

export { respondToFarmer };
