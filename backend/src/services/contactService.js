import Contact from "../models/Contact.js";

export const createContact = async (contactData) => {
  return await Contact.create(contactData);
};

export const getAllContacts = async (queryParams) => {
  const {
    page = 1,
    limit = 10,
    search = "",
    status = "all",
    sort = "newest",
    from,
    to,
  } = queryParams;

  const filter = {};

  // Search
  if (search.trim()) {
    filter.$or = [
      {
        name: {
          $regex: search,
          $options: "i",
        },
      },
      {
        email: {
          $regex: search,
          $options: "i",
        },
      },
      {
        subject: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  // Status
  if (status === "read") {
    filter.isRead = true;
  }

  if (status === "unread") {
    filter.isRead = false;
  }

  // Date Range
  if (from || to) {
    filter.createdAt = {};

    if (from) {
      filter.createdAt.$gte = new Date(from);
    }

    if (to) {
      const endDate = new Date(to);
      endDate.setHours(23, 59, 59, 999);

      filter.createdAt.$lte = endDate;
    }
  }

  // Sorting
  let sortOption = {};

  switch (sort) {
    case "oldest":
      sortOption = {
        createdAt: 1,
      };
      break;

    case "name_asc":
      sortOption = {
        name: 1,
      };
      break;

    case "name_desc":
      sortOption = {
        name: -1,
      };
      break;

    default:
      sortOption = {
        createdAt: -1,
      };
  }

  const skip = (Number(page) - 1) * Number(limit);

  const [contacts, total, read, unread] =
    await Promise.all([
      Contact.find(filter)
        .sort(sortOption)
        .skip(skip)
        .limit(Number(limit)),

      Contact.countDocuments(filter),

      Contact.countDocuments({
        ...filter,
        isRead: true,
      }),

      Contact.countDocuments({
        ...filter,
        isRead: false,
      }),
    ]);

  return {
    contacts,

    pagination: {
      currentPage: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      totalContacts: total,
      limit: Number(limit),
    },

    stats: {
      total,
      read,
      unread,
    },
  };
};

export const markContactAsRead = async (id) => {
  return await Contact.findByIdAndUpdate(
    id,
    {
      isRead: true,
    },
    {
      new: true,
    }
  );
};

export const deleteContact = async (id) => {
  return await Contact.findByIdAndDelete(id);
};