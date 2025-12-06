import express from "express";
import {
    createMonthlyMealPlan,
    getMyMealPlans,
    getMealPlanById,
    deleteMealPlan,
} from "../controllers/mealPlanController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

// Generate a new 30-day meal plan
router.post("/generate-monthly", authenticate, createMonthlyMealPlan);

// Get all user's meal plans
router.get("/", authenticate, getMyMealPlans);

// Get specific meal plan by ID
router.get("/:id", authenticate, getMealPlanById);

// Delete a meal plan
router.delete("/:id", authenticate, deleteMealPlan);

export default router;
