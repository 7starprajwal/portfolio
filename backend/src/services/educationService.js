import Education from "../models/Education.js";

// CREATE
export const createEducation = async (data) => {
  return await Education.create(data);
};

// GET ALL
export const getEducations = async ({
  page = 1,
  limit = 100,
  search,
  featured,
  published,
  sort = "-startDate",
}) => {
  const query = {};

  if (search) {
    query.$or = [
      {
        degree: {
          $regex: search,
          $options: "i",
        },
      },
      {
        institution: {
          $regex: search,
          $options: "i",
        },
      },
      {
        specialization: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  if (featured !== undefined) {
    query.featured = featured;
  }

  if (published !== undefined) {
    query.isPublished = published;
  }

  const total = await Education.countDocuments(query);

  const educations = await Education.find(query)
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(limit);

  return {
    educations,
    total,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
  };
};

// GET ONE
export const getEducationById = async (id) => {
  return await Education.findById(id);
};

// UPDATE
export const updateEducation = async (
  id,
  data
) => {
  return await Education.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  );
};

// DELETE
export const deleteEducation = async (id) => {
  return await Education.findByIdAndDelete(id);
};