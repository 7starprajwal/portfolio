import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import certificateRoutes from "./routes/certificateRoutes.js";
import skillRoutes from "./routes/skillRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import educationRoutes from "./routes/educationRoutes.js";
import experienceRoutes from "./routes/experienceRoutes.js";
import adminSettingRoutes from "./routes/adminSettingRoutes.js";

const app = express();

app.use(helmet());

// CORS
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Portfolio API is running successfully.",
  });
});

/* Authentication */
app.use("/api/auth", authRoutes);

/* Dashboard */
app.use("/api/dashboard", dashboardRoutes);

/* Portfolio */
app.use("/api/projects", projectRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/experiences", experienceRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/contact", contactRoutes);

/* Admin Settings */
app.use("/api/admin-settings", adminSettingRoutes);

export default app;