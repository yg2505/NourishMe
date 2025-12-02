import express from "express";
import {getMealPlanById, getMyMealPlans, createMealPlan, updateMealPlan, deleteMealPlan} from "../controllers/mealPlanController.js";
import {authMiddleware} from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware); // all routes require auth

router.get("/", getMyMealPlans);
router.get("/:id", getMealPlanById);
router.post("/", createMealPlan);
router.put("/:id", updateMealPlan);
router.delete("/:id", deleteMealPlan);

export default router;
