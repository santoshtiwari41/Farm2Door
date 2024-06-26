import { StatusCodes } from "http-status-codes";

import Distributer from "../models/distributer.model.js";

export const createDistributer = async (req, res) => {
  const { name, location } = req.body;

  try {
    const distributer = await Distributer.create({
      name,
      location: {
        type: "Point",
        coordinates: [location.longitude, location.latitude],
      },
    });
    res.status(StatusCodes.CREATED).json(distributer);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

export const getAllDistributers = async (req, res) => {
  try {
    const distributers = await Distributer.find().populate("orders products");
    res.status(StatusCodes.OK).json(distributers);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

export const getDistributerById = async (req, res) => {
  try {
    const distributer = await Distributer.findById(req.params.id);
    if (!distributer) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Distributer not found" });
    }
    res.status(StatusCodes.OK).json(distributer);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

export const updateDistributerById = async (req, res) => {
  try {
    const { location, ...updateData } = req.body;
    const distributer = await Distributer.findByIdAndUpdate(
      req.params.id,
      {
        ...updateData,
        location: {
          type: "Point",
          coordinates: [location.longitude, location.latitude],
        },
      },
      { new: true }
    );

    if (!distributer) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Distributer not found" });
    }

    res.status(StatusCodes.OK).json(distributer);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

export const deleteDistributerById = async (req, res) => {
  try {
    const distributer = await Distributer.findByIdAndDelete(req.params.id);
    if (!distributer) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Distributer not found" });
    }
    res.status(204).json();
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

// nearest?latitude=20.0&longitude=40.0
export const findNearestDistributers = async (req, res) => {
  try {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
      return res
        .status(400)
        .json({ error: "Latitude and longitude are required parameters." });
    }

    const userLocation = {
      type: "Point",
      coordinates: [parseFloat(longitude), parseFloat(latitude)],
    };

    const nearestDistributors = await Distributer.find({
      location: {
        $near: {
          $geometry: userLocation,
          $maxDistance: 10000000, // maximum distance in meters
        },
      },
    }).limit(5);

    return res
      .status(StatusCodes.OK)
      .json({ message: "", nearestDistributors });
  } catch (error) {
    console.error("Error finding nearest distributors:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const countDistributers = async (req, res) => {
  try {
    const count = await Distributer.countDocuments();
    return res
      .status(StatusCodes.OK)
      .send({ message: "Distributor count", count });
  } catch (error) {
    console.error("Distributor count request error:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: "Something went wrong during Distributor." });
  }
};
