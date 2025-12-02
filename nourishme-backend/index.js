import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./src/routes/AuthRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import corsOptions from "./src/config/cors.js";
import mealPlansRouter from "./src/routes/mealPlanRoutes.js"

dotenv.config();

const app = express();

// Middleware
app.use(cors(corsOptions));
app.use(express.json());



// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/meal-plans", mealPlansRouter);

// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
