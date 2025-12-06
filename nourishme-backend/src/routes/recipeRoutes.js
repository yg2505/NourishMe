import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import {
    createRecipe,
    getRecipes,
    deleteRecipe,
    toggleFavorite,
    getFavorites,
    saveMealAsRecipe
} from "../controllers/recipeController.js";

const router = express.Router();

router.post("/generate", authenticate, createRecipe);
router.get("/", authenticate, getRecipes);
router.delete("/:id", authenticate, deleteRecipe);
router.post("/favorite/:id", authenticate, toggleFavorite);
router.get("/favorites", authenticate, getFavorites);
router.post("/save-meal", authenticate, saveMealAsRecipe);

export default router;
