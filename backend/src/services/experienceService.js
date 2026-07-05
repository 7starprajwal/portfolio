import Experience from "../models/Experience.js";
import cloudinary from "../config/cloudinary.js";
import { uploadImage } from "./cloudinaryService.js";

/*
|--------------------------------------------------------------------------
| Upload Company Logo
|--------------------------------------------------------------------------
*/

const uploadLogo = async (file) => {
  if (!file) {
    return {
      public_id: "",
      url: "",
    };
  }

  return await uploadImage(
    file.buffer,
    "portfolio/experience"
  );
};

/*
|--------------------------------------------------------------------------
| Create Experience
|--------------------------------------------------------------------------
*/

export const createExperience = async (data, file) => {
  const logo = await uploadLogo(file);

  return await Experience.create({
    ...data,
    companyLogo: logo,
  });
};

/*
|--------------------------------------------------------------------------
| Get Experiences
|--------------------------------------------------------------------------
*/

export const getExperiences = async ({
  search = "",
  featured,
  published,
}) => {
  const filter = {};

  if (search) {
    filter.$or = [
      {
        jobTitle: {
          $regex: search,
          $options: "i",
        },
      },
      {
        companyName: {
          $regex: search,
          $options: "i",
        },
      },
      {
        location: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  if (featured !== undefined) {
    filter.featured =
      featured === true || featured === "true";
  }

  if (published !== undefined) {
    filter.published =
      published === true || published === "true";
  }

  return Experience.find(filter).sort({
    order: 1,
    startDate: -1,
    createdAt: -1,
  });
};

/*
|--------------------------------------------------------------------------
| Get Published Experiences
|--------------------------------------------------------------------------
*/

export const getPublishedExperiences = async () => {
  return Experience.find({
    published: true,
  }).sort({
    order: 1,
    startDate: -1,
  });
};

/*
|--------------------------------------------------------------------------
| Get Experience By ID
|--------------------------------------------------------------------------
*/

export const getExperienceById = async (id) => {
  return Experience.findById(id);
};

/*
|--------------------------------------------------------------------------
| Update Experience
|--------------------------------------------------------------------------
*/

export const updateExperience = async (
  id,
  data,
  file
) => {
  const experience = await Experience.findById(id);

  if (!experience) {
    throw new Error("Experience not found.");
  }

  if (file) {
    if (experience.companyLogo?.public_id) {
      await cloudinary.uploader.destroy(
        experience.companyLogo.public_id
      );
    }

    experience.companyLogo = await uploadLogo(file);
  }

  Object.assign(experience, data);

  await experience.save();

  return experience;
};

/*
|--------------------------------------------------------------------------
| Delete Experience
|--------------------------------------------------------------------------
*/

export const deleteExperience = async (id) => {
  const experience = await Experience.findById(id);

  if (!experience) {
    throw new Error("Experience not found.");
  }

  if (experience.companyLogo?.public_id) {
    await cloudinary.uploader.destroy(
      experience.companyLogo.public_id
    );
  }

  await experience.deleteOne();

  return {
    message: "Experience deleted successfully.",
  };
};