import fs from "fs";
import cloudinary from "../config/cloudinary.js";
import Resume from "../models/Resume.js";

/* ===========================
   Upload Resume
=========================== */

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a PDF file.",
      });
    }

    // Delete previous resume
    const existingResume = await Resume.findOne();

    if (existingResume) {
      await cloudinary.uploader.destroy(existingResume.publicId, {
        resource_type: "raw",
      });

      await existingResume.deleteOne();
    }

    // Upload PDF
    const uploadedFile = await cloudinary.uploader.upload(
      req.file.path,
      {
        folder: "portfolio/resume",
        resource_type: "auto",
      }
    );

    console.log("Uploaded File:", uploadedFile);

    // Delete local temp file
    fs.unlinkSync(req.file.path);

    // Save metadata
    const resume = await Resume.create({
      title: "Resume",
      fileName: req.file.originalname,
      fileUrl: uploadedFile.secure_url,
      publicId: uploadedFile.public_id,
      fileSize: req.file.size,
    });

    res.status(201).json({
      success: true,
      message: "Resume uploaded successfully.",
      resume,
    });
  } catch (error) {
    console.error(error);

    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===========================
   Get Resume
=========================== */

export const getResume = async (req, res) => {
  try {
    const resume = await Resume.findOne();

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found.",
      });
    }

    // Generate Preview Image (First Page)
    const previewUrl = resume.fileUrl.replace(
      "/upload/",
      "/upload/pg_1,f_jpg,q_auto/"
    );

    // Generate Download URL
    const downloadUrl = resume.fileUrl.replace(
      "/upload/",
      "/upload/fl_attachment/"
    );

    res.status(200).json({
      success: true,
      resume: {
        ...resume.toObject(),
        previewUrl,
        downloadUrl,
      },
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
   Delete Resume
=========================== */

export const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found.",
      });
    }

    await cloudinary.uploader.destroy(resume.publicId, {
      resource_type: "raw",
    });

    await resume.deleteOne();

    res.status(200).json({
      success: true,
      message: "Resume deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};