import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import projectRoutes from "./routes/projectRoutes.js";
import milestoneRoutes from "./routes/milestoneRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import refreshTokenRoute from "./routes/refreshTokenRoute.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/milestones", milestoneRoutes);
app.use("/api/v1/tasks", taskRoutes);
app.use("/api/v1/auth", refreshTokenRoute);
app.use("/api/v1/admin", adminRoutes);

const PORT = process.env.PORT || 5000;

// connect to mongodb and start server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });
