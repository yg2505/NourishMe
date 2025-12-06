import React, { useState } from "react";

export default function DayDetailView({ dayData, onClose, onNavigate }) {
    const [expandedMeal, setExpandedMeal] = useState(null);

    if (!dayData) return null;

    const toggleMeal = (mealType) => {
        setExpandedMeal(expandedMeal === mealType ? null : mealType);
    };

    const getMealIcon = (mealType) => {
        const icons = {
            breakfast: "🌅",
            lunch: "☀️",
            dinner: "🌙",
            snack1: "🍎",
            snack2: "🥜",
        };
        return icons[mealType] || "🍽️";
    };

    const getMealLabel = (mealType) => {
        const labels = {
            breakfast: "Breakfast",
            lunch: "Lunch",
            dinner: "Dinner",
            snack1: "Snack 1",
            snack2: "Snack 2",
        };
        return labels[mealType] || mealType;
    };

    // Calculate macro percentages
    const totalMacroGrams = (dayData.macros?.protein || 0) + (dayData.macros?.fats || 0) + (dayData.macros?.carbs || 0);
    const proteinPercent = totalMacroGrams > 0 ? ((dayData.macros?.protein || 0) / totalMacroGrams * 100).toFixed(0) : 0;
    const fatsPercent = totalMacroGrams > 0 ? ((dayData.macros?.fats || 0) / totalMacroGrams * 100).toFixed(0) : 0;
    const carbsPercent = totalMacroGrams > 0 ? ((dayData.macros?.carbs || 0) / totalMacroGrams * 100).toFixed(0) : 0;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-gradient-to-br from-[#159957]/90 to-[#155799]/90 backdrop-blur-md rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/20">
                {/* Header */}
                <div className="sticky top-0 bg-gradient-to-r from-[#159957] to-[#155799] p-6 border-b border-white/20 flex justify-between items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-white">Day {dayData.day}</h2>
                        <p className="text-white/80 text-lg">{dayData.totalCalories} calories total</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-white/80 hover:text-white text-3xl font-bold transition-colors"
                    >
                        ×
                    </button>
                </div>

                {/* Navigation */}
                {onNavigate && (
                    <div className="flex justify-between items-center px-6 py-3 bg-white/5">
                        <button
                            onClick={() => onNavigate("prev")}
                            disabled={dayData.day === 1}
                            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                            ← Previous Day
                        </button>
                        <span className="text-white/60 text-sm">Navigate Days</span>
                        <button
                            onClick={() => onNavigate("next")}
                            disabled={dayData.day === 30}
                            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                            Next Day →
                        </button>
                    </div>
                )}

                {/* Macro Summary */}
                <div className="p-6 bg-white/5">
                    <h3 className="text-xl font-semibold text-white mb-3">Daily Macros</h3>

                    {/* Macro Bar */}
                    <div className="w-full h-8 rounded-full overflow-hidden flex mb-3">
                        <div
                            className="bg-blue-500 flex items-center justify-center text-white text-xs font-bold"
                            style={{ width: `${proteinPercent}%` }}
                        >
                            {proteinPercent > 10 && `${proteinPercent}%`}
                        </div>
                        <div
                            className="bg-orange-500 flex items-center justify-center text-white text-xs font-bold"
                            style={{ width: `${fatsPercent}%` }}
                        >
                            {fatsPercent > 10 && `${fatsPercent}%`}
                        </div>
                        <div
                            className="bg-green-500 flex items-center justify-center text-white text-xs font-bold"
                            style={{ width: `${carbsPercent}%` }}
                        >
                            {carbsPercent > 10 && `${carbsPercent}%`}
                        </div>
                    </div>

                    {/* Macro Details */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                            <div className="text-blue-300 text-sm font-medium">Protein</div>
                            <div className="text-white text-xl font-bold">{dayData.macros?.protein || 0}g</div>
                        </div>
                        <div className="text-center">
                            <div className="text-orange-300 text-sm font-medium">Fats</div>
                            <div className="text-white text-xl font-bold">{dayData.macros?.fats || 0}g</div>
                        </div>
                        <div className="text-center">
                            <div className="text-green-300 text-sm font-medium">Carbs</div>
                            <div className="text-white text-xl font-bold">{dayData.macros?.carbs || 0}g</div>
                        </div>
                    </div>
                </div>

                {/* Meals */}
                <div className="p-6 space-y-3">
                    <h3 className="text-xl font-semibold text-white mb-4">Meals</h3>

                    {Object.entries(dayData.meals || {}).map(([mealType, mealData]) => (
                        <div
                            key={mealType}
                            className="bg-white/10 rounded-xl overflow-hidden border border-white/20 transition-all duration-300"
                        >
                            <button
                                onClick={() => toggleMeal(mealType)}
                                className="w-full p-4 flex justify-between items-center hover:bg-white/5 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">{getMealIcon(mealType)}</span>
                                    <div className="text-left">
                                        <div className="text-white font-semibold">{getMealLabel(mealType)}</div>
                                        <div className="text-white/70 text-sm">{mealData.name}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-white/80 font-semibold">{mealData.calories} cal</span>
                                    <span className="text-white/60 text-xl">
                                        {expandedMeal === mealType ? "−" : "+"}
                                    </span>
                                </div>
                            </button>

                            {expandedMeal === mealType && mealData.ingredients && (
                                <div className="px-4 pb-4 pt-2 bg-white/5 border-t border-white/10">
                                    <div className="text-white/80 text-sm">
                                        <span className="font-semibold text-white">Ingredients:</span>
                                        <p className="mt-1">{mealData.ingredients}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Close Button */}
                <div className="p-6 border-t border-white/20">
                    <button
                        onClick={onClose}
                        className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-all"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
