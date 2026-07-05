import fs from "fs";

import cloudinary from "../config/cloudinary.js";
import AdminSetting from "../models/AdminSetting.js";

/* ===========================
   Get Admin Settings
=========================== */

export const getAdminSettings = async (req, res) => {
  try {
    let settings = await AdminSetting.findOne();

    if (!settings) {
      settings = await AdminSetting.create({});
    }

    res.status(200).json({
      success: true,
      settings,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===========================
   Update Admin Settings
=========================== */

export const updateAdminSettings = async (
  req,
  res
) => {
  try {
    let settings = await AdminSetting.findOne();

    if (!settings) {
      settings = await AdminSetting.create({});
    }

    settings.profile = req.body.profile;
    settings.portfolio = req.body.portfolio;
    settings.about = req.body.about;
    settings.social = req.body.social;
    settings.availability =
      req.body.availability;

    await settings.save();

    res.status(200).json({
      success: true,
      message:
        "Settings updated successfully.",
      settings,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===========================
   Upload Profile Image
=========================== */

export const uploadProfileImage = async (
  req,
  res
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please select an image.",
      });
    }

    let settings = await AdminSetting.findOne();

    if (!settings) {
      settings = await AdminSetting.create({});
    }

    /* Delete old image from Cloudinary */

    if (
      settings.profile.image &&
      settings.profile.image.publicId
    ) {
      await cloudinary.uploader.destroy(
        settings.profile.image.publicId
      );
    }

    /* Upload new image */

    const uploadedImage =
      await cloudinary.uploader.upload(
        req.file.path,
        {
          folder: "portfolio/profile",
        }
      );

    /* Remove local file */

    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    /* Save image */

    settings.profile.image = {
      url: uploadedImage.secure_url,
      publicId: uploadedImage.public_id,
    };

    await settings.save();

    res.status(200).json({
      success: true,
      message:
        "Profile image uploaded successfully.",
      image: settings.profile.image,
    });
  } catch (error) {
    console.error(error);

    if (
      req.file &&
      fs.existsSync(req.file.path)
    ) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===========================
   Delete Profile Image
=========================== */

export const deleteProfileImage = async (
  req,
  res
) => {
  try {
    const settings =
      await AdminSetting.findOne();

    if (
      !settings ||
      !settings.profile.image ||
      !settings.profile.image.publicId
    ) {
      return res.status(404).json({
        success: false,
        message: "Profile image not found.",
      });
    }

    await cloudinary.uploader.destroy(
      settings.profile.image.publicId
    );

    settings.profile.image = {
      url: "",
      publicId: "",
    };

    await settings.save();

    res.status(200).json({
      success: true,
      message:
        "Profile image deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};