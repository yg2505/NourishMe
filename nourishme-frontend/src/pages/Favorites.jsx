import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import {
    Heart, Loader2, ChefHat, Clock, Flame, ArrowRight, Trash2, X
} from "lucide-react";

export default function Favorites() {
    const navigate = useNavigate();
    const { token, logout } = useAuth();

    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    useEffect(() => {
        fetchFavorites();
    }, []);

    const fetchFavorites = async () => {
        setLoading(true);
        try {
            const API_URL = import.meta.env.VITE_API_URL || "https://nourishme.onrender.com/api";
            const response = await axios.get(`${API_URL}/recipes/favorites`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setFavorites(response.data);
        } catch (err) {
            console.error("Error fetching favorites:", err);
            setError("Failed to load favorite recipes.");
        } finally {
            setLoading(false);
        }
    };

    const removeFavorite = async (id) => {
        try {
            const API_URL = import.meta.env.VITE_API_URL || "https://nourishme.onrender.com/api";
            await axios.post(`${API_URL}/recipes/favorite/${id}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // Remove from local state
            setFavorites(prev => prev.filter(recipe => recipe.id !== id));
        } catch (err) {
            console.error("Error removing favorite:", err);
            alert("Failed to remove from favorites");
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-72 bg-gradient-to-b from-[#159957] to-[#155799] text-white p-6 flex flex-col justify-between">
                <div>

                    <nav className="space-y-5">
                        <button
                            onClick={() => navigate("/dashboard")}
                            className="w-full text-left py-3 px-4  rounded-xl hover:bg-white/10 transition font-medium">
                            Dashboard
                        </button>
                        <button onClick={() => navigate("/monthly-meal-plan")}
                            className="w-full text-left py-3 px-4 hover:bg-white/10 rounded-xl transition font-medium">
                            Monthly Meal Plans
                        </button>
                        <button
                            onClick={() => navigate("/recipes")}
                            className="w-full text-left py-3 px-4 hover:bg-white/10 rounded-xl transition font-medium">
                            Recipes
                        </button>
                        <button
                            onClick={() => navigate("/favorites")}
                            className="w-full text-left py-3 px-4 hover:bg-white/10 rounded-xl transition font-medium">
                            Favorites
                        </button>
                        <button
                            onClick={() => navigate("/profile")}
                            className="w-full text-left py-3 px-4 hover:bg-white/10 rounded-xl transition font-medium">
                            Profile
                        </button>
                    </nav>
                </div>


            </aside>
            {/* Main Content */}
            <main className="flex-1 p-10 ml-2">
                <div className="max-w-6xl mx-auto">
                    <header className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                            My Favorites
                        </h1>
                        <p className="text-gray-500 mt-2">
                            Your collection of saved recipes
                        </p>
                    </header>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <Loader2 className="w-10 h-10 text-[#159957] animate-spin" />
                        </div>
                    ) : error ? (
                        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl">
                            {error}
                        </div>
                    ) : favorites.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
                            <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900">No favorites yet</h3>
                            <p className="text-gray-500 mt-1">Start exploring recipes and save the ones you love!</p>
                            <button
                                onClick={() => navigate("/recipes")}
                                className="mt-4 px-6 py-2 bg-[#159957] text-white rounded-xl hover:bg-[#159957]/90 transition"
                            >
                                Browse Recipes
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {favorites.map((recipe) => (
                                <div key={recipe.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition group">
                                    <div className="h-48 bg-gray-100 relative overflow-hidden">
                                        {/* Placeholder for recipe image */}
                                        <div className="absolute inset-0 flex items-center justify-center bg-emerald-50 text-emerald-200">
                                            <ChefHat className="w-16 h-16" />
                                        </div>

                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removeFavorite(recipe.id);
                                            }}
                                            className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-red-50 transition group-hover:opacity-100"
                                            title="Remove from favorites"
                                        >
                                            <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                                        </button>
                                    </div>

                                    <div className="p-5">
                                        <h3 className="font-bold text-gray-800 text-lg mb-2 line-clamp-1">
                                            {recipe.title}
                                        </h3>

                                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                                            <div className="flex items-center gap-1">
                                                <Flame className="w-4 h-4 text-orange-500" />
                                                {recipe.calories} kcal
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => setSelectedRecipe(recipe)}
                                            className="w-full px-4 py-2 bg-[#159957] text-white rounded-xl hover:bg-[#159957]/90 transition font-medium"
                                        >
                                            View Recipe
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            {/* Recipe Detail Modal */}
            {selectedRecipe && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
                            <h3 className="text-2xl font-bold text-gray-800">{selectedRecipe.title}</h3>
                            <button
                                onClick={() => setSelectedRecipe(null)}
                                className="text-gray-400 hover:text-gray-600 transition"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="bg-orange-50 p-4 rounded-xl">
                                <h4 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">Nutritional Info</h4>
                                <div className="text-center">
                                    <div className="flex items-center justify-center">
                                        <Flame className="w-10 h-10 text-orange-500 " />
                                    </div>
                                    <div className="text-xl font-bold text-gray-700">{selectedRecipe.calories || 0}</div>
                                    
                                </div>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-[#155799] mb-2">Instructions</h4>
                                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                                    {selectedRecipe.instructions || "No instructions available."}
                                </p>
                            </div>
                        </div>
                      
                    </div>
                </div>
            )}
        </div>
    );
}
