import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";

/* Public Pages */
import Home from "../pages/Home";
import About from "../pages/About";
import SkillsPage from "../pages/Skills";
import Experience from "../pages/Experience";
import Education from "../pages/Education";
import Resume from "../pages/Resume";
import Contact from "../pages/Contact";
import NotFound from "../pages/NotFound";

import AllProjectsPage from "../pages/Projects/AllProjectsPage";
import ProjectDetailsPage from "../pages/Projects/ProjectDetailsPage";
import CertificatesPage from "../pages/Certificates/CertificatesPage";

/* Admin */
import AdminRoutes from "../admin/routes/AdminRoutes";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin */}
        <Route path="/admin/*" element={<AdminRoutes />} />

        {/* Public */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />

          <Route path="/about" element={<About />} />

          <Route path="/skills" element={<SkillsPage />} />

          <Route path="/experience" element={<Experience />} />

          <Route path="/education" element={<Education />} />

          <Route path="/projects" element={<AllProjectsPage />} />

          <Route
            path="/projects/:slug"
            element={<ProjectDetailsPage />}
          />

          <Route path="/resume" element={<Resume />} />

          <Route
            path="/certificates"
            element={<CertificatesPage />}
          />

          <Route path="/contact" element={<Contact />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;