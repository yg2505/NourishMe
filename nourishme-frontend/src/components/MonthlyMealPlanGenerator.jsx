import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { setAuthToken, generateMonthlyMealPlan } from "../services/mealPlanService";

export default function MonthlyMealPlanGenerator({ onPlanGenerated }) {
    const { token } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleGenerate = async () => {
        setLoading(true);
        setError(null);

        try {
            console.log("API URL:", import.meta.env.VITE_API_URL || "https://nourishme.onrender.com/api");
            setAuthToken(token);
            const response = await generateMonthlyMealPlan();

            if (onPlanGenerated) {
                onPlanGenerated(response);
            }
        } catch (err) {
            console.error("Error generating meal plan:", err);
            console.error("Error response:", err.response);
            console.error("Error data:", err.response?.data);
            setError(err.response?.data?.message || err.response?.data?.error || "Failed to generate meal plan. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    🍽️ Generate Your 30-Day Meal Plan
                </h2>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                    Get a personalized, AI-generated monthly meal plan tailored to your goals and dietary preferences.
                    Each day includes breakfast, lunch, dinner, and 2 snacks with complete nutritional information.
                </p>

                {error && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                        {error}
                    </div>
                )}

                <button
                    onClick={handleGenerate}
                    disabled={loading}
                    className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${loading
                        ? "bg-gray-400 cursor-not-allowed text-white"
                        : "bg-gradient-to-r from-[#159957] to-[#155799] hover:shadow-lg hover:scale-105 text-white"
                        }`}
                >
                    {loading ? (
                        <span className="flex items-center gap-2">
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Generating Your Plan...
                        </span>
                    ) : (
                        "✨ Generate Monthly Plan"
                    )}
                </button>

                {loading && (
                    <p className="text-gray-500 text-sm mt-4 animate-pulse">
                        This may take 30-60 seconds as we create your personalized plan...
                    </p>
                )}
            </div>
        </div>
    );
}
