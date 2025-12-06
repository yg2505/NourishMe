import prisma from "../config/db.js";
import { generateMonthlyMealPlan } from "../services/openaiService.js";

// Generate a 30-day AI meal plan
// Generate a 30-day AI meal plan
export const createMonthlyMealPlan = async (req, res) => {
  try {
    const userId = Number(req.user.id);

    // Fetch user profile to get goal and dietType
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        goal: true,
        dietType: true,
        name: true,
      },
    });

    if (!user || !user.goal || !user.dietType) {
      return res.status(400).json({
        message: "Please complete your profile first (goal and diet type required)",
      });
    }

    // Check for existing recent plan with same goal and diet
    const existingPlan = await prisma.mealPlan.findFirst({
      where: {
        userId,
      },
      orderBy: { createdAt: "desc" },
    });

    if (existingPlan) {
      const mealsData = existingPlan.meals;
      // Check if the stored plan matches current user goals AND has instructions (version check)
      // We check if the first day's breakfast has instructions to verify it's a new format plan
      const hasInstructions = mealsData.days && mealsData.days[0]?.meals?.breakfast?.instructions;

      if (
        mealsData.userGoal === user.goal &&
        mealsData.dietType === user.dietType &&
        hasInstructions
      ) {
        return res.status(200).json({
          plan: existingPlan,
        });
      }
    }

    // Generate meal plan using OpenAI
    const { mealPlanData } = await generateMonthlyMealPlan(
      user.goal,
      user.dietType
    );

    // Store metadata in the meals JSON field along with the days
    const planData = {
      days: mealPlanData,
      planType: "MONTHLY",
      duration: 30,
      userGoal: user.goal,
      dietType: user.dietType,
    };

    // Save to database using existing schema
    const plan = await prisma.mealPlan.create({
      data: {
        userId,
        title: `30-Day ${user.goal} Plan`,
        description: `AI-generated monthly meal plan for ${user.dietType} diet. Created on ${new Date().toLocaleDateString()}`,
        meals: planData, // Store everything in the meals JSON field
        isPublic: false,
      },
    });

    res.status(201).json({
      plan,
    });
  } catch (err) {
    console.error("Error generating monthly meal plan:", err);
    res.status(500).json({
      message: "Failed to generate meal plan",
      error: err.message,
    });
  }
};

// Get all meal plans for the authenticated user
export const getMyMealPlans = async (req, res) => {
  try {
    const userId = Number(req.user.id);
    const plans = await prisma.mealPlan.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    res.json(plans);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch meal plans" });
  }
};

// Get a specific meal plan by ID
export const getMealPlanById = async (req, res) => {
  try {
    const { id } = req.params;
    const plan = await prisma.mealPlan.findUnique({
      where: { id: Number(id) },
    });

    if (!plan) {
      return res.status(404).json({ message: "Meal plan not found" });
    }

    if (!plan.isPublic && plan.userId !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    res.json(plan);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch meal plan" });
  }
};

// Delete a meal plan
export const deleteMealPlan = async (req, res) => {
  try {
    const userId = Number(req.user.id);
    const { id } = req.params;

    const existing = await prisma.mealPlan.findUnique({
      where: { id: Number(id) },
    });

    if (!existing) {
      return res.status(404).json({ message: "Meal plan not found" });
    }

    if (existing.userId !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await prisma.mealPlan.delete({ where: { id: Number(id) } });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete meal plan" });
  }
};
