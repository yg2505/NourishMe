import React, { useState, useEffect } from "react";
import axios from "axios";
import { ChevronLeft, ChevronRight, Calendar, X, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { setAuthToken, getMealPlans } from "../services/mealPlanService";
import MonthlyMealPlanGenerator from "../components/MonthlyMealPlanGenerator";
import WeeklyCalendarView from "../components/WeeklyCalendarView";

export default function MonthlyMealPlanPage() {
    const navigate = useNavigate();
    const { token } = useAuth();
    const [monthlyPlans, setMonthlyPlans] = useState([]);
    const [currentPlan, setCurrentPlan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentWeekIndex, setCurrentWeekIndex] = useState(0);
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false)

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite)
    };

    useEffect(() => {
        if (token) {
            setAuthToken(token);
            fetchMonthlyPlans();
        }
    }, [token]);

    const fetchMonthlyPlans = async () => {
        setLoading(true);
        try {
            const plans = await getMealPlans();
            // Filter for monthly plans
            const monthly = plans.filter(p => {
                if (typeof p.meals === 'object' && p.meals !== null) {
                    return p.meals.planType === "MONTHLY" || (Array.isArray(p.meals.days) && p.meals.days.length === 30);
                }
                return false;
            });
            setMonthlyPlans(monthly);

            // Auto-select the most recent plan
            if (monthly.length > 0) {
                const plan = monthly[0];
                setCurrentPlan(plan);
            }
        } catch (err) {
            console.error("Error fetching meal plans:", err);
        } finally {
            setLoading(false);
        }
    };

    const handlePlanGenerated = (response) => {
        const { plan } = response;
        setCurrentPlan(plan);
        setMonthlyPlans([plan, ...monthlyPlans]);
        setCurrentWeekIndex(0);
    };

    const handleSelectPlan = (plan) => {
        setCurrentPlan(plan);
        setCurrentWeekIndex(0);
    };

    // Helper to get current week's days
    const getCurrentWeekDays = () => {
        if (!currentPlan || !currentPlan.meals || !currentPlan.meals.days) return [];
        const days = currentPlan.meals.days;
        const start = currentWeekIndex * 7;
        const end = start + 7;
        return days.slice(start, end);
    };

    const handleNextWeek = () => {
        setCurrentWeekIndex(prev => Math.min(prev + 1, 4)); // Assuming 30 days ~ 5 weeks (4 full + 2 days)
    };

    const handlePrevWeek = () => {
        setCurrentWeekIndex(prev => Math.max(prev - 1, 0));
    };

    const handleMealClick = (meal) => {
        if (meal) {
            console.log("Selected Meal Data (Debug):", meal);
            setSelectedMeal(meal);
        }
    };

    const saveMealAsFavorite = async (meal) => {
        try {
            const API_URL = import.meta.env.VITE_API_URL || "https://nourishme.onrender.com/api";
            await axios.post(`${API_URL}/recipes/save-meal`, {
                title: meal.name,
                ingredients: meal.ingredients || "Ingredients not specified",
                instructions: meal.instructions || "Instructions not specified",
                calories: meal.calories,
                macros: meal.macros || {},
                dietType: "balanced" // Default or fetch from user profile if available
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

        } catch (err) {
            console.error("Error saving meal:", err);
            const errorMessage = err.response?.data?.message || err.message || "Failed to save meal to favorites.";
            alert(errorMessage);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-72 bg-gradient-to-b from-[#159957] to-[#155799] text-white p-6 flex flex-col justify-between">
                <div>

                    <nav className="space-y-5">
                        <button onClick={() => navigate("/dashboard")}
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

            {/* Main Section */}
            <main className="flex-1 p-10 ml-2">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">
                        🗓️ Monthly Meal Plans
                    </h1>
                    <p className="text-gray-500">
                        AI-generated 30-day meal plans tailored to your goals
                    </p>
                </div>

                {/* Month Filter */}
                {monthlyPlans.length > 0 && (
                    <div className="mb-6">
                        <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-[#159957]" />
                            Filter by Month:
                        </label>
                        <select
                            onChange={(e) => {
                                const selectedMonth = e.target.value;
                                // Find the latest plan for the selected month
                                const plan = monthlyPlans.find(p => {
                                    const date = new Date(p.createdAt);
                                    const monthStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
                                    return monthStr === selectedMonth;
                                });
                                if (plan) handleSelectPlan(plan);
                            }}
                            className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#159957] min-w-[200px]"
                        >
                            {[...new Set(monthlyPlans.map(plan => {
                                const date = new Date(plan.createdAt);
                                return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
                            }))].sort().reverse().map(monthStr => {
                                const [year, month] = monthStr.split('-');
                                const date = new Date(year, month - 1);
                                return (
                                    <option key={monthStr} value={monthStr}>
                                        {date.toLocaleDateString('default', { month: 'long', year: 'numeric' })}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                )}

                {/* Generator */}
                {!currentPlan && !loading && (
                    <MonthlyMealPlanGenerator onPlanGenerated={handlePlanGenerated} />
                )}

                {/* Loading State */}
                {loading && (
                    <div className="text-center py-12">
                        <div className="text-gray-500 text-xl">Loading your meal plans...</div>
                    </div>
                )}

                {/* Weekly Calendar View */}
                {currentPlan && (
                    <div className="mt-8">
                        <WeeklyCalendarView
                            weekDays={getCurrentWeekDays()}
                            currentWeekIndex={currentWeekIndex}
                            totalWeeks={Math.ceil((currentPlan.meals?.days?.length || 0) / 7)}
                            onNext={handleNextWeek}
                            onPrev={handlePrevWeek}
                            onMealClick={handleMealClick}
                        />

                        {/* Generate New Plan Button */}
                        <div className="mt-8 text-center">
                            <button
                                onClick={() => setCurrentPlan(null)}
                                className="px-6 py-3 rounded-xl bg-[#159957] hover:bg-[#159957]/90 text-white font-semibold transition-all shadow-md"
                            >
                                + Generate New Plan
                            </button>
                        </div>
                    </div>
                )}

                {/* Meal Detail Modal */}
                {selectedMeal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
                                <h3 className="text-2xl font-bold text-gray-800">{selectedMeal.name}</h3>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => {
                                            saveMealAsFavorite(selectedMeal)
                                            toggleFavorite()
                                        }}
                                        className={`p-3 bg-gray-100 rounded-full
                                            ${isFavorite ? "bg-red-100 text-red-500" : "bg-gray-100 hover:bg-gray-200"}`
                                        }
                                        title="Save to Favorites"
                                    >
                                        <Heart className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                            <div className="p-6 space-y-6">
                                <div>
                                    <h4 className="text-lg font-semibold text-[#159957] mb-2">Ingredients</h4>
                                    <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                                        {selectedMeal.ingredients || "No ingredients listed."}
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-[#155799] mb-2">Instructions</h4>
                                    <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                                        {selectedMeal.instructions || "No instructions available."}
                                    </p>
                                </div>

                                <div className="bg-gray-100 p-4 rounded-xl">
                                    <h4 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">Nutritional Info</h4>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-gray-800">{selectedMeal.calories}</div>
                                        <div className="text-sm text-gray-500">Calories</div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 border-t border-gray-100 flex justify-end">
                                <button
                                    onClick={() => setSelectedMeal(null)}
                                    className="px-6 py-2 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
