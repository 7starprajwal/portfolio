import {
  createProject as createProjectService,
  getProjects,
  getProjectById,
  getProjectBySlug as getProjectBySlugService,
  updateProject as updateProjectService,
  deleteProject as deleteProjectService,
} from "../services/projectService.js";

import {
  uploadImage,
  deleteImage,
} from "../services/cloudinaryService.js";

/*
|--------------------------------------------------------------------------
| Helper
|--------------------------------------------------------------------------
*/

const parseTechnologies = (body) => {
  const data = { ...body };

  if (data.technologies) {
    try {
      data.technologies = JSON.parse(data.technologies);
    } catch {
      data.technologies = data.technologies
        .split(",")
        .map((tech) => tech.trim())
        .filter(Boolean);
    }
  }

  if (typeof data.featured === "string") {
    data.featured = data.featured === "true";
  }

  if (typeof data.isPublished === "string") {
    data.isPublished =
      data.isPublished === "true";
  }

  return data;
};

/*
|--------------------------------------------------------------------------
| Create Project
|--------------------------------------------------------------------------
*/

export const createProject = async (
  req,
  res
) => {
  try {
    let image = {
      public_id: "",
      url: "",
    };

    if (req.file) {
      image = await uploadImage(
        req.file.buffer,
        "portfolio/projects"
      );
    }

    const data = parseTechnologies(
      req.body
    );

    const project =
      await createProjectService({
        ...data,
        image,
      });

    return res.status(201).json({
      success: true,
      message:
        "Project created successfully.",
      project,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| Get All Projects
|--------------------------------------------------------------------------
*/

export const getAllProjects = async (
  req,
  res
) => {
  try {
    const {
      search,
      category,
      featured,
      published,
      page = 1,
      limit = 6,
      sort = "newest",
    } = req.query;

    const result = await getProjects({
      page: Number(page),
      limit: Number(limit),
      search,
      category,

      featured:
        featured === undefined
          ? undefined
          : featured === "true",

      published:
        published === undefined
          ? undefined
          : published === "true",

      sort:
        sort === "oldest"
          ? "createdAt"
          : sort === "title"
          ? "title"
          : "-createdAt",
    });

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| Get Project By Slug
|--------------------------------------------------------------------------
*/

export const getProjectBySlug = async (
  req,
  res
) => {
  try {
    const project =
      await getProjectBySlugService(
        req.params.slug
      );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    return res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| Get Project By ID
|--------------------------------------------------------------------------
*/

export const getProjectByIdController =
  async (req, res) => {
    try {
      const project =
        await getProjectById(
          req.params.id
        );

      if (!project) {
        return res.status(404).json({
          success: false,
          message:
            "Project not found.",
        });
      }

      return res.status(200).json({
        success: true,
        project,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

/*
|--------------------------------------------------------------------------
| Update Project
|--------------------------------------------------------------------------
*/

export const updateProject = async (
  req,
  res
) => {
  try {
    const project =
      await getProjectById(
        req.params.id
      );

    if (!project) {
      return res.status(404).json({
        success: false,
        message:
          "Project not found.",
      });
    }

    let image = project.image;

    if (req.file) {
      if (project.image?.public_id) {
        await deleteImage(
          project.image.public_id
        );
      }

      image = await uploadImage(
        req.file.buffer,
        "portfolio/projects"
      );
    }

    const data = parseTechnologies(
      req.body
    );

    const updatedProject =
      await updateProjectService(
        req.params.id,
        {
          ...data,
          image,
        }
      );

    return res.status(200).json({
      success: true,
      message:
        "Project updated successfully.",
      project: updatedProject,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| Delete Project
|--------------------------------------------------------------------------
*/

export const deleteProject = async (
  req,
  res
) => {
  try {
    const project =
      await getProjectById(
        req.params.id
      );

    if (!project) {
      return res.status(404).json({
        success: false,
        message:
          "Project not found.",
      });
    }

    if (project.image?.public_id) {
      await deleteImage(
        project.image.public_id
      );
    }

    await deleteProjectService(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message:
        "Project deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| Featured Projects
|--------------------------------------------------------------------------
*/

export const getFeaturedProjects = async (req, res) => {
  try {
    const result = await getProjects({
      featured: true,
      published: true,
      page: 1,
      limit: 100,
    });

    console.log("Total Featured:", result.projects.length);

    result.projects.forEach((project) => {
      console.log(
        project.title,
        "| Featured:",
        project.featured,
        "| Published:",
        project.isPublished
      );
    });

    return res.status(200).json({
      success: true,
      projects: result.projects,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};