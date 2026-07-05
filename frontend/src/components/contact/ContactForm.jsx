import { useState } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";
import { toast } from "react-toastify";

import { sendMessage } from "../../services/contactService";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setIsSubmitting(true);

      const response = await sendMessage(formData);

      toast.success(
        response.message || "Message sent successfully."
      );

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to send message."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="space-y-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-8 backdrop-blur-lg"
    >
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-5 py-4 text-white outline-none transition focus:border-cyan-500"
      />

      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-5 py-4 text-white outline-none transition focus:border-cyan-500"
      />

      <input
        type="text"
        name="subject"
        placeholder="Subject"
        value={formData.subject}
        onChange={handleChange}
        required
        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-5 py-4 text-white outline-none transition focus:border-cyan-500"
      />

      <textarea
        name="message"
        rows="6"
        placeholder="Write your message..."
        value={formData.message}
        onChange={handleChange}
        required
        className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-5 py-4 text-white outline-none transition focus:border-cyan-500"
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center gap-3 rounded-xl bg-cyan-500 px-6 py-4 font-semibold text-white transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-70"
      >
        <FaPaperPlane />

        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </motion.form>
  );
}

export default ContactForm;