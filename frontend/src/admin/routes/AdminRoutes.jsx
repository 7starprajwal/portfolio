import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";
import ProtectedRoute from "./ProtectedRoute";
import AdminLayout from "../layouts/AdminLayout";

import Dashboard from "../pages/dashboard/Dashboard";
import Projects from "../pages/projects/Projects";
import Certificates from "../pages/certificates/Certificates";
import Skills from "../pages/skills/Skills";
import Education from "../pages/education/Education";
import Experience from "../pages/experience/Experience";
import Resume from "../pages/resume/Resume";
import Messages from "../pages/messages/Messages";
import Settings from "../pages/settings/Settings";

function AdminRoutes() {
  return (
    <Routes>
      {/* Login */}
      <Route
        path="login"
        element={<Login />}
      />

      {/* Protected */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route
            index
            element={<Navigate to="dashboard" replace />}
          />

          <Route
            path="dashboard"
            element={<Dashboard />}
          />

          <Route
            path="projects"
            element={<Projects />}
          />

          <Route
            path="certificates"
            element={<Certificates />}
          />

          <Route
            path="skills"
            element={<Skills />}
          />

          <Route
            path="education"
            element={<Education />}
          />

          <Route
            path="experience"
            element={<Experience />}
          />

          <Route
            path="resume"
            element={<Resume />}
          />

          <Route
            path="messages"
            element={<Messages />}
          />

          <Route
            path="settings"
            element={<Settings />}
          />
        </Route>
      </Route>

      {/* Unknown */}
      <Route
        path="*"
        element={<Navigate to="/admin/login" replace />}
      />
    </Routes>
  );
}

export default AdminRoutes;