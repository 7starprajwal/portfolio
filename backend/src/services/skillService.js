import Skill from "../models/Skill.js";

// CREATE
export const createSkill = async (data) => {
  return await Skill.create(data);
};

// GET ALL
export const getSkills = async ({
  page = 1,
  limit = 100,
  search,
  category,
  featured,
  published,
  sort = "-createdAt",
}) => {
  const query = {};

  if (search) {
    query.name = {
      $regex: search,
      $options: "i",
    };
  }

  if (category && category !== "All") {
    query.category = category;
  }

  if (featured !== undefined) {
    query.featured = featured;
  }

  if (published !== undefined) {
    query.isPublished = published;
  }

  console.log("Mongo Query:", query);

  const total = await Skill.countDocuments(query);
  console.log("Total Documents:", total);

  const skills = await Skill.find(query)
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(limit);

  console.log("Skills Found:", skills);

  return {
    skills,
    total,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
  };
};

// GET ONE
export const getSkillById = async (id) => {
  return await Skill.findById(id);
};

// UPDATE
export const updateSkill = async (
  id,
  data
) => {
  return await Skill.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  );
};

// DELETE
export const deleteSkill = async (id) => {
  return await Skill.findByIdAndDelete(id);
};