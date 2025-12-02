import prisma from "../config/db.js"; 


export const getMyMealPlans = async (req, res) => {
  try {
    const userId = req.user.id;
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

export const getMealPlanById = async (req, res) => {
  try {
    const { id } = req.params;
    const plan = await prisma.mealPlan.findUnique({ where: { id: Number(id) } });
    if (!plan) return res.status(404).json({ message: "Meal plan not found" });
    
    if (!plan.isPublic && plan.userId !== req.user.id) return res.status(403).json({ message: "Forbidden" });
    res.json(plan);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch meal plan" });
  }
};

export const createMealPlan = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, description, meals, isPublic } = req.body;

    if (!title) return res.status(400).json({ message: "Title is required" });

    const plan = await prisma.mealPlan.create({
      data: {
        userId,
        title,
        description: description || null,
        meals: Array.isArray(meals) ? meals : [], 
        isPublic: !!isPublic,
      },
    });

    res.status(201).json(plan);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create meal plan" });
  }
};

export const updateMealPlan = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const existing = await prisma.mealPlan.findUnique({ where: { id: Number(id) } });
    if (!existing) return res.status(404).json({ message: "Meal plan not found" });
    if (existing.userId !== userId) return res.status(403).json({ message: "Forbidden" });

    const { title, description, meals, isPublic } = req.body;
    const updated = await prisma.mealPlan.update({
      where: { id: Number(id) },
      data: {
        title: title ?? existing.title,
        description: description ?? existing.description,
        meals: meals ?? existing.meals,
        isPublic: typeof isPublic === "boolean" ? isPublic : existing.isPublic,
      },
    });

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update meal plan" });
  }
};

export const deleteMealPlan = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const existing = await prisma.mealPlan.findUnique({ where: { id: Number(id) } });
    if (!existing) return res.status(404).json({ message: "Meal plan not found" });
    if (existing.userId !== userId) return res.status(403).json({ message: "Forbidden" });

    await prisma.mealPlan.delete({ where: { id: Number(id) } });
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete meal plan" });
  }
};
