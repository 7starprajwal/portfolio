import {
  createContact,
  getAllContacts,
  markContactAsRead,
  deleteContact,
} from "../services/contactService.js";

// POST /api/contact
export const sendContactMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const contact = await createContact({
      name,
      email,
      subject,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully.",
      contact,
    });
  } catch (error) {
    console.error("Send Contact Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to send message.",
    });
  }
};

// GET /api/admin/contact
// GET /api/contact/admin
export const getContacts = async (req, res) => {
  try {
    const result = await getAllContacts(req.query);

    res.status(200).json({
      success: true,
      contacts: result.contacts,
      pagination: result.pagination,
      stats: result.stats,
    });
  } catch (error) {
    console.error("Get Contacts Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch contacts.",
    });
  }
};
// PATCH /api/admin/contact/:id/read
export const readContact = async (req, res) => {
  try {
    const contact = await markContactAsRead(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Message not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Message marked as read.",
      contact,
    });
  } catch (error) {
    console.error("Read Contact Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update message.",
    });
  }
};

// DELETE /api/admin/contact/:id
export const removeContact = async (req, res) => {
  try {
    const contact = await deleteContact(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Message not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Message deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Contact Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete message.",
    });
  }
};