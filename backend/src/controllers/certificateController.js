import Certificate from "../models/Certificate.js";

import {
  uploadImage,
  uploadPdf,
  deleteImage,
  deletePdf,
} from "../services/cloudinaryService.js";

/* ===========================
   Create Certificate
=========================== */

export const createCertificate = async (req, res) => {
  try {
    let image = {
      public_id: "",
      url: "",
    };

    let certificatePdf = {
      public_id: "",
      url: "",
    };

    if (req.files?.image?.[0]) {
      image = await uploadImage(
        req.files.image[0].buffer,
        "portfolio/certificates/images"
      );
    }

    if (req.files?.certificatePdf?.[0]) {
      certificatePdf = await uploadPdf(
        req.files.certificatePdf[0].buffer,
        req.files.certificatePdf[0].originalname,
        "portfolio/certificates/pdfs"
      );
    }

    const certificate = await Certificate.create({
      ...req.body,
      image,
      certificatePdf,
    });

    return res.status(201).json({
      success: true,
      message: "Certificate created successfully.",
      certificate,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===========================
   Get All Certificates
=========================== */

export const getAllCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find({
      isPublished: true,
    }).sort({
      order: 1,
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      certificates,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===========================
   Get Certificate By ID
=========================== */

export const getCertificateById = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found.",
      });
    }

    return res.status(200).json({
      success: true,
      certificate,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===========================
   Update Certificate
=========================== */

export const updateCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found.",
      });
    }

    let image = certificate.image;
    let certificatePdf = certificate.certificatePdf;

    if (req.files?.image?.[0]) {
      if (certificate.image?.public_id) {
        await deleteImage(certificate.image.public_id);
      }

      image = await uploadImage(
        req.files.image[0].buffer,
        "portfolio/certificates/images"
      );
    }

    if (req.files?.certificatePdf?.[0]) {
      if (certificate.certificatePdf?.public_id) {
        await deletePdf(certificate.certificatePdf.public_id);
      }

      certificatePdf = await uploadPdf(
        req.files.certificatePdf[0].buffer,
        req.files.certificatePdf[0].originalname,
        "portfolio/certificates/pdfs"
      );
    }

    const updatedCertificate = await Certificate.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        image,
        certificatePdf,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Certificate updated successfully.",
      certificate: updatedCertificate,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===========================
   Delete Certificate
=========================== */

export const deleteCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found.",
      });
    }

    if (certificate.image?.public_id) {
      await deleteImage(certificate.image.public_id);
    }

    if (certificate.certificatePdf?.public_id) {
      await deletePdf(certificate.certificatePdf.public_id);
    }

    await certificate.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Certificate deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};