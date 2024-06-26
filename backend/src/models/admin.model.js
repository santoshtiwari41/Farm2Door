import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    
    password: String,
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
