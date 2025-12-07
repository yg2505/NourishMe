import prisma from "../config/db.js";
import { generateRecipe } from "../services/openaiService.js";

// Generate and save a recipe
export const createRecipe = async (req, res) => {
    try {
        const userId = Number(req.user.id);
        const { ingredients } = req.body;

        if (!ingredients) {
            return res.status(400).json({ message: "Ingredients are required" });
        }

        // Fetch user profile for diet type
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { dietType: true },
        });

        const dietType = user?.dietType || "balanced";

        // Generate recipe using OpenAI
        const recipeData = await generateRecipe(ingredients, dietType);

        // Save to database
        const recipe = await prisma.recipe.create({
            data: {
                userId,
                title: recipeData.title,
                ingredients: recipeData.ingredients,
                instructions: recipeData.instructions,
                calories: recipeData.calories,
                macros: recipeData.macros,
                dietType,
            },
        });

        res.status(201).json(recipe);
    } catch (err) {
        console.error("Error creating recipe:", err);
        res.status(500).json({ message: "Failed to create recipe" });
    }
};

// Get all saved recipes for the user
export const getRecipes = async (req, res) => {
    try {
        const userId = Number(req.user.id);
        const recipes = await prisma.recipe.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
            include: {
                favoritedBy: {
                    where: { id: userId },
                    select: { id: true }
                }
            }
        });

        const recipesWithStatus = recipes
            .filter(recipe => {
                // Filter out recipes that are from meal plans (stored in macros.source)
                const macros = recipe.macros || {};
                return macros.source !== "MEAL_PLAN";
            })
            .map(recipe => ({
                ...recipe,
                isFavorited: recipe.favoritedBy.length > 0
            }));

        res.json(recipesWithStatus);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch recipes" });
    }
};

// Delete a recipe
export const deleteRecipe = async (req, res) => {
    try {
        const userId = Number(req.user.id);
        const { id } = req.params;

        const existing = await prisma.recipe.findUnique({
            where: { id: Number(id) },
        });

        if (!existing) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        if (existing.userId !== userId) {
            return res.status(403).json({ message: "Forbidden" });
        }

        await prisma.recipe.delete({ where: { id: Number(id) } });
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to delete recipe" });
    }
};
// Toggle favorite status of a recipe
export const toggleFavorite = async (req, res) => {
    try {
        const userId = Number(req.user.id);
        const { id } = req.params;
        const recipeId = Number(id);

        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: { favoriteRecipes: true },
        });

        const isFavorited = user.favoriteRecipes.some((r) => r.id === recipeId);

        if (isFavorited) {
            await prisma.user.update({
                where: { id: userId },
                data: {
                    favoriteRecipes: {
                        disconnect: { id: recipeId },
                    },
                },
            });
            res.json({ message: "Removed from favorites", isFavorited: false });
        } else {
            await prisma.user.update({
                where: { id: userId },
                data: {
                    favoriteRecipes: {
                        connect: { id: recipeId },
                    },
                },
            });
            res.json({ message: "Added to favorites", isFavorited: true });
        }
    } catch (err) {
        console.error("Error toggling favorite:", err);
        res.status(500).json({ message: "Failed to toggle favorite" });
    }
};

// Get user's favorite recipes
export const getFavorites = async (req, res) => {
    try {
        const userId = Number(req.user.id);
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                favoriteRecipes: {
                    orderBy: { createdAt: "desc" },
                },
            },
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user.favoriteRecipes);
    } catch (err) {
        console.error("Error fetching favorites:", err);
        res.status(500).json({ message: "Failed to fetch favorites" });
    }
};

// Save a meal from meal plan as a recipe and favorite it
export const saveMealAsRecipe = async (req, res) => {
    try {
        const userId = Number(req.user.id);
        const { title, ingredients, instructions, calories, macros, dietType } = req.body;

        console.log("Saving meal as recipe:", { title, userId });

        // Check if recipe already exists for this user to avoid duplicates
        let recipe = await prisma.recipe.findFirst({
            where: {
                userId,
                title,
            }
        });

        if (!recipe) {
            // Ensure ingredients and instructions are strings
            const ingredientsStr = Array.isArray(ingredients) ? ingredients.join(", ") : (ingredients || "");
            const instructionsStr = Array.isArray(instructions) ? instructions.join("\n") : (instructions || "");

            recipe = await prisma.recipe.create({
                data: {
                    userId,
                    title,
                    ingredients: ingredientsStr,
                    instructions: instructionsStr,
                    calories: Number(calories) || 0,
                    macros: { ...(macros || {}), source: "MEAL_PLAN" },
                    dietType: dietType || "balanced",
                },
            });
        }

        // Add to favorites
        await prisma.user.update({
            where: { id: userId },
            data: {
                favoriteRecipes: {
                    connect: { id: recipe.id },
                },
            },
        });

        res.status(201).json({ message: "Meal saved to favorites", recipe });
    } catch (err) {
        console.error("Error saving meal as recipe:", err);
        res.status(500).json({ message: "Failed to save meal", error: err.message });
    }
};