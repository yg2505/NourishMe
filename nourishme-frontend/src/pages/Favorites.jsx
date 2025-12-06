import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import {
    Heart, Loader2, ChefHat, Clock, Flame, ArrowRight, Trash2
} from "lucide-react";

export default function Favorites() {
    const navigate = useNavigate();
    const { token, logout } = useAuth();

    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchFavorites();
    }, []);

    const fetchFavorites = async () => {
        setLoading(true);
        try {
            const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";
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
            const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";
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
                    <h1 className="text-3xl font-bold tracking-tight mb-10">NourishMe</h1>

                    <nav className="space-y-5">
                        <button
                            onClick={() => navigate("/dashboard")}
                            className="w-full text-left py-3 px-4 bg-white/10 rounded-xl hover:bg-white/20 transition font-medium">
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
                            <Heart className="w-8 h-8 text-red-500 fill-red-500" />
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

                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
