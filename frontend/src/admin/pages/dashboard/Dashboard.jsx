import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaProjectDiagram,
  FaCertificate,
  FaTools,
  FaEnvelope,
  FaBriefcase,
  FaGraduationCap,
  FaFileAlt,
  FaArrowRight,
  FaCalendarAlt,
} from "react-icons/fa";

import { getDashboardStats } from "../../services/dashboardService";

function Dashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    certificates: 0,
    skills: 0,
    experiences: 0,
    education: 0,
    messages: 0,
    resumes: 0,
  });

  const [recentMessages, setRecentMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);
async function fetchDashboard() {
  try {
    setLoading(true);

    const response = await getDashboardStats();

    const dashboardStats = response.stats;

   setStats({
  projects: dashboardStats.projects,
  certificates: dashboardStats.certificates,
  skills: dashboardStats.skills,
  experiences: dashboardStats.experiences,
  education: dashboardStats.education,
  messages: dashboardStats.messages,
  resumes: dashboardStats.resumes,
  resumeUploaded: dashboardStats.resumeUploaded,
  openToWork: dashboardStats.openToWork,
});

    setRecentMessages(response.recentMessages || []);
  } catch (error) {
    console.error("Dashboard Error:", error);
  } finally {
    setLoading(false);
  }
}
  const dashboardCards = [
    {
      title: "Projects",
      value: stats.projects,
      icon: <FaProjectDiagram className="text-3xl text-cyan-400" />,
    },
    {
      title: "Certificates",
      value: stats.certificates,
      icon: <FaCertificate className="text-3xl text-green-400" />,
    },
    {
      title: "Skills",
      value: stats.skills,
      icon: <FaTools className="text-3xl text-yellow-400" />,
    },
    {
      title: "Messages",
      value: stats.messages,
      icon: <FaEnvelope className="text-3xl text-pink-400" />,
    },
    {
      title: "Experience",
      value: stats.experiences,
      icon: <FaBriefcase className="text-3xl text-orange-400" />,
    },
    {
      title: "Education",
      value: stats.education,
      icon: <FaGraduationCap className="text-3xl text-blue-400" />,
    },
    {
      title: "Resume",
      value: stats.resumes,
      icon: <FaFileAlt className="text-3xl text-purple-400" />,
    },
  ];

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <section className="rounded-xl bg-slate-900 p-6 shadow-lg">
        <h1 className="text-3xl font-bold text-white">
          Welcome, Admin 👋
        </h1>

        <p className="mt-2 text-slate-400">
          Manage projects, skills, certificates, resume, education,
          experience, and unread contact messages from one place.
        </p>
      </section>

      {/* Statistics */}
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardCards.map((item) => (
          <div
            key={item.title}
            className="rounded-xl bg-slate-900 p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border hover:border-cyan-500"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400">
                  {item.title}
                </p>

                <h2 className="mt-2 text-4xl font-bold text-white">
                  {item.value}
                </h2>
              </div>

              {item.icon}
            </div>
          </div>
        ))}
      </section>

      {/* Quick Actions */}
      <section className="rounded-xl bg-slate-900 p-6 shadow-lg">
        <h2 className="mb-6 text-2xl font-semibold text-white">
          Quick Actions
        </h2>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <Link
            to="/admin/projects"
            className="rounded-xl bg-cyan-500 p-5 text-center font-semibold text-white transition hover:bg-cyan-400"
          >
            + Add Project
          </Link>

          <Link
            to="/admin/skills"
            className="rounded-xl bg-green-500 p-5 text-center font-semibold text-white transition hover:bg-green-400"
          >
            + Add Skill
          </Link>

          <Link
            to="/admin/resume"
            className="rounded-xl bg-purple-500 p-5 text-center font-semibold text-white transition hover:bg-purple-400"
          >
            Upload Resume
          </Link>

          <Link
            to="/admin/messages"
            className="rounded-xl bg-pink-500 p-5 text-center font-semibold text-white transition hover:bg-pink-400"
          >
            View Messages
          </Link>
        </div>
      </section>

      {/* Latest Unread Messages */}
      <section className="rounded-xl bg-slate-900 p-6 shadow-lg">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">
            Latest Unread Messages
          </h2>

          <Link
            to="/admin/messages"
            className="flex items-center gap-2 text-cyan-400 transition hover:text-cyan-300"
          >
            View All
            <FaArrowRight />
          </Link>
        </div>

        {recentMessages.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-700 py-12 text-center">
            <p className="text-slate-400">
              🎉 No unread messages.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {recentMessages.map((message) => (
              <div
                key={message._id}
                className="rounded-xl border border-slate-700 bg-slate-800 p-5 transition hover:border-cyan-500"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {message.name}
                    </h3>

                    <p className="text-sm text-slate-400">
                      {message.email}
                    </p>

                    <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                      <FaCalendarAlt />

                      {new Date(
                        message.createdAt
                      ).toLocaleString()}
                    </div>
                  </div>

                  <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white">
                    Unread
                  </span>
                </div>

                <h4 className="mt-5 font-semibold text-cyan-400">
                  {message.subject}
                </h4>

                <p className="mt-2 line-clamp-2 text-slate-300">
                  {message.message}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Dashboard;