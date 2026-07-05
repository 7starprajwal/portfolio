import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaGlobe,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaYoutube,
  FaFacebook,
  FaDiscord,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";

function SocialSettings({
  settings,
  setSettings,
}) {
  const social = settings?.social || {};

  const handleChange = (event) => {
    const { name, value } = event.target;

    setSettings((prev) => ({
      ...prev,
      social: {
        ...prev.social,
        [name]: value,
      },
    }));
  };

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-lg">
      <div className="mb-10">
        <h2 className="flex items-center gap-3 text-3xl font-bold text-white">
          <FaGlobe className="text-cyan-400" />
          Social & Contact Information
        </h2>

        <p className="mt-2 text-slate-400">
          Manage your social media profiles and contact
          information.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* GitHub */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300">
            <FaGithub />
            GitHub
          </label>

          <input
            type="url"
            name="github"
            value={social.github || ""}
            onChange={handleChange}
            placeholder="https://github.com/username"
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 text-white outline-none focus:border-cyan-500"
          />
        </div>

        {/* LinkedIn */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300">
            <FaLinkedin />
            LinkedIn
          </label>

          <input
            type="url"
            name="linkedin"
            value={social.linkedin || ""}
            onChange={handleChange}
            placeholder="https://linkedin.com/in/username"
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 text-white outline-none focus:border-cyan-500"
          />
        </div>

        {/* Instagram */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300">
            <FaInstagram />
            Instagram
          </label>

          <input
            type="url"
            name="instagram"
            value={social.instagram || ""}
            onChange={handleChange}
            placeholder="https://instagram.com/username"
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 text-white outline-none focus:border-cyan-500"
          />
        </div>

        {/* LeetCode */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300">
            <SiLeetcode />
            LeetCode
          </label>

          <input
            type="url"
            name="leetcode"
            value={social.leetcode || ""}
            onChange={handleChange}
            placeholder="https://leetcode.com/u/username/"
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 text-white outline-none focus:border-cyan-500"
          />
        </div>

        {/* Twitter / X */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300">
            <FaXTwitter />
            Twitter / X
          </label>

          <input
            type="url"
            name="twitter"
            value={social.twitter || ""}
            onChange={handleChange}
            placeholder="https://x.com/username"
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 text-white outline-none focus:border-cyan-500"
          />
        </div>

        {/* YouTube */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300">
            <FaYoutube />
            YouTube
          </label>

          <input
            type="url"
            name="youtube"
            value={social.youtube || ""}
            onChange={handleChange}
            placeholder="https://youtube.com/@username"
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 text-white outline-none focus:border-cyan-500"
          />
        </div>

        {/* Facebook */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300">
            <FaFacebook />
            Facebook
          </label>

          <input
            type="url"
            name="facebook"
            value={social.facebook || ""}
            onChange={handleChange}
            placeholder="https://facebook.com/username"
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 text-white outline-none focus:border-cyan-500"
          />
        </div>

        {/* Discord */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300">
            <FaDiscord />
            Discord
          </label>

          <input
            type="text"
            name="discord"
            value={social.discord || ""}
            onChange={handleChange}
            placeholder="username"
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 text-white outline-none focus:border-cyan-500"
          />
        </div>

        {/* Portfolio */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300">
            <FaGlobe />
            Portfolio Website
          </label>

          <input
            type="url"
            name="portfolio"
            value={social.portfolio || ""}
            onChange={handleChange}
            placeholder="https://yourportfolio.com"
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 text-white outline-none focus:border-cyan-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300">
            <FaEnvelope />
            Email
          </label>

          <input
            type="email"
            name="email"
            value={social.email || ""}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 text-white outline-none focus:border-cyan-500"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300">
            <FaPhone />
            Phone
          </label>

          <input
            type="text"
            name="phone"
            value={social.phone || ""}
            onChange={handleChange}
            placeholder="+91 9876543210"
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 text-white outline-none focus:border-cyan-500"
          />
        </div>

        {/* Location */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300">
            <FaMapMarkerAlt />
            Location
          </label>

          <input
            type="text"
            name="location"
            value={social.location || ""}
            onChange={handleChange}
            placeholder="Bengaluru, Karnataka, India"
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 text-white outline-none focus:border-cyan-500"
          />
        </div>
      </div>
    </section>
  );
}

export default SocialSettings;