import dotenv from "dotenv";
import mongoose from "mongoose";

import connectDatabase from "../config/database.js";
import Admin from "../models/Admin.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    await connectDatabase();

    const existingAdmin = await Admin.findOne({
      email: "7starprajwal1718@gmail.com",
    });

    if (existingAdmin) {
      console.log("✅ Admin already exists.");

      process.exit(0);
    }

    const admin = new Admin({
      name: "Prajwal S",
      email: "7starprajwal1718@gmail.com",
      password: "Prajwal@2026",
    });

    await admin.save();

    console.log("✅ Admin account created successfully.");

    process.exit(0);
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
};

seedAdmin();