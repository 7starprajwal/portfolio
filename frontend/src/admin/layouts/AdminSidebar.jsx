import { NavLink, useNavigate } from "react-router-dom";
 
import {
  FaHome,
  FaProjectDiagram,
  FaCertificate,
  FaTools,
  FaGraduationCap,
  FaBriefcase,
  FaFileAlt,
  FaEnvelope,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

import { logoutAdmin } from "../services/authService";

const menuItems = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <FaHome />,
  },
  {
    name: "Projects",
    path: "/admin/projects",
    icon: <FaProjectDiagram />,
  },
  {
    name: "Certificates",
    path: "/admin/certificates",
    icon: <FaCertificate />,
  },
   
  {
    name: "Education",
    path: "/admin/education",
    icon: <FaGraduationCap />,
  },
  {
    name: "Experience",
    path: "/admin/experience",
    icon: <FaBriefcase />,
  },
  {
    name: "Resume",
    path: "/admin/resume",
    icon: <FaFileAlt />,
  },
 {
  name: "Messages",
  path: "/admin/messages",
  icon: <FaEnvelope />,
},
  {
    name: "Settings",
    path: "/admin/settings",
    icon: <FaCog />,
  },
  {
  name: "Skills",
  path: "/admin/skills",
  icon: <FaTools />,
},
];

function AdminSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutAdmin();
    navigate("/admin/login");
  };

  return (
    <aside className="flex min-h-screen w-64 flex-col bg-slate-900 text-white shadow-lg">
      {/* Logo */}
      <div className="border-b border-slate-700 p-6">
        <h1 className="text-2xl font-bold text-cyan-400">
          Portfolio Admin
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Dashboard Panel
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-200 ${
                    isActive
                      ? "bg-cyan-500 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-cyan-400"
                  }`
                }
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-700 p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-slate-300 transition hover:bg-red-500 hover:text-white"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </aside>
  );
}



export default AdminSidebar;