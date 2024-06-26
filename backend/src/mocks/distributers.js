import Distributer from "../models/distributer.model.js";

const distributers = [
  {
    name: "Balkumari Center",
    location: {
      type: "Point",
      coordinates: [85.34182907876512, 27.67351370274369],
    },
  },
  {
    name: "Green Valley Market",
    location: {
      type: "Point",
      coordinates: [85.34182907876513, 27.6735137027437],
    },
  },
  {
    name: "City Fresh Mart",
    location: {
      type: "Point",
      coordinates: [85.34182907876511, 27.67351370274368],
    },
  },
  {
    name: "Central Veggie Store",
    location: {
      type: "Point",
      coordinates: [85.34182907876513, 27.67351370274368],
    },
  },
  {
    name: "Urban Greens",
    location: {
      type: "Point",
      coordinates: [85.34182907876511, 27.6735137027437],
    },
  },
  {
    name: "FreshMart Express",
    location: {
      type: "Point",
      coordinates: [85.34182907876512, 27.67351370274371],
    },
  },
  {
    name: "Golden Harvest Grocers",
    location: {
      type: "Point",
      coordinates: [85.34182907876514, 27.67351370274367],
    },
  },
  {
    name: "Nature's Bounty Market",
    location: {
      type: "Point",
      coordinates: [85.3418290787651, 27.67351370274372],
    },
  },
  {
    name: "Sunrise Fruits and Veggies",
    location: {
      type: "Point",
      coordinates: [85.34182907876514, 27.67351370274369],
    },
  },
  {
    name: "FreshHarvest Supermart",
    location: {
      type: "Point",
      coordinates: [85.34182907876511, 27.67351370274371],
    },
  },
];

export async function createDistributers() {
  try {
    await Distributer.insertMany(distributers);
    console.log("Successfully added distributers to the database");
  } catch (error) {
    console.error("Error while inserting distributers:", error.message);
  }
}
