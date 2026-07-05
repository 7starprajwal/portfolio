import Project from "../models/Project.js";

/*
|--------------------------------------------------------------------------
| Create Project
|--------------------------------------------------------------------------
*/

export const createProject = async (projectData) => {
  return await Project.create(projectData);
};

/*
|--------------------------------------------------------------------------
| Get Projects
|--------------------------------------------------------------------------
*/

export const getProjects = async ({
  page = 1,
  limit = 10,
  search = "",
  category = "",
  featured,
  published,
  sort = "-createdAt",
}) => {
  const query = {};

  if (search) {
    query.title = {
      $regex: search,
      $options: "i",
    };
  }

  if (category) {
    query.category = category;
  }

  if (featured !== undefined) {
    query.featured = featured;
  }

  // IMPORTANT
  if (published !== undefined) {
    query.isPublished = published;
  }

  const skip = (page - 1) * limit;

  const projects = await Project.find(query)
    .sort(sort)
    .skip(skip)
    .limit(limit);

  const total = await Project.countDocuments(query);

  return {
    projects,
    total,
    currentPage: Number(page),
    totalPages: Math.ceil(total / limit),
  };
};

/*
|--------------------------------------------------------------------------
| Get Project By ID
|--------------------------------------------------------------------------
*/

export const getProjectById = async (id) => {
  return await Project.findById(id);
};

/*
|--------------------------------------------------------------------------
| Get Project By Slug
|--------------------------------------------------------------------------
*/

export const getProjectBySlug = async (slug) => {
  return await Project.findOne({
    slug,
    isPublished: true,
  });
};

/*
|--------------------------------------------------------------------------
| Update Project
|--------------------------------------------------------------------------
*/

export const updateProject = async (
  id,
  updatedData
) => {
  return await Project.findByIdAndUpdate(
    id,
    updatedData,
    {
      new: true,
      runValidators: true,
    }
  );
};

/*
|--------------------------------------------------------------------------
| Delete Project
|--------------------------------------------------------------------------
*/

export const deleteProject = async (id) => {
  return await Project.findByIdAndDelete(id);
};

/*
|--------------------------------------------------------------------------
| Increment Views
|--------------------------------------------------------------------------
*/

export const incrementViews = async (id) => {
  return await Project.findByIdAndUpdate(
    id,
    {
      $inc: {
        views: 1,
      },
    }
  );
};

/*
|--------------------------------------------------------------------------
| Dashboard Statistics
|--------------------------------------------------------------------------
*/

export const getProjectStats = async () => {
  const totalProjects =
    await Project.countDocuments();

  const featuredProjects =
    await Project.countDocuments({
      featured: true,
    });

  const publishedProjects =
    await Project.countDocuments({
      isPublished: true,
    });

  return {
    totalProjects,
    featuredProjects,
    publishedProjects,
  };
};