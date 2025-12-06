import React, { useState } from 'react';

export default function MealPlanCard({ dayData }) {
    const [isExpanded, setIsExpanded] = useState(false);

    // Calculate total calories and macros if not provided
    const totalCalories = dayData.totalCalories || 0;
    const macros = dayData.macros || { protein: 0, fats: 0, carbs: 0 };

    // Helper to determine calorie color
    const getCalorieColor = (calories) => {
        if (calories < 1600) return 'text-green-400';
        if (calories < 2200) return 'text-yellow-400';
        return 'text-red-400';
    };

    return (
        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden hover:border-white/30 transition-all duration-300 h-full flex flex-col">
            {/* Header */}
            <div
                className="p-4 cursor-pointer flex justify-between items-center bg-white/5"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                        {dayData.day}
                    </div>
                    <div>
                        <h3 className="text-white font-semibold text-lg">Day {dayData.day}</h3>
                        <div className="flex gap-3 text-sm">
                            <span className={`${getCalorieColor(totalCalories)} font-medium`}>
                                {totalCalories} kcal
                            </span>
                            <span className="text-white/60">
                                P: {macros.protein}g • F: {macros.fats}g • C: {macros.carbs}g
                            </span>
                        </div>
                    </div>
                </div>
                <div className={`text-white/50 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                    ▼
                </div>
            </div>

            {/* Expanded Content */}
            <div className={`transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="p-4 space-y-4 border-t border-white/10">
                    {/* Meals */}
                    {['breakfast', 'lunch', 'dinner'].map((mealType) => (
                        <div key={mealType} className="bg-black/20 rounded-lg p-3">
                            <div className="flex justify-between items-start mb-1">
                                <span className="text-xs font-bold uppercase text-white/50 tracking-wider">
                                    {mealType}
                                </span>
                                <span className="text-xs text-white/70">
                                    {dayData.meals[mealType]?.calories} kcal
                                </span>
                            </div>
                            <h4 className="text-white font-medium mb-1">
                                {dayData.meals[mealType]?.name}
                            </h4>
                            <p className="text-white/60 text-sm">
                                {dayData.meals[mealType]?.ingredients}
                            </p>
                        </div>
                    ))}

                    {/* Snacks */}
                    <div className="grid grid-cols-2 gap-3">
                        {['snack1', 'snack2'].map((snackType, index) => (
                            <div key={snackType} className="bg-black/20 rounded-lg p-3">
                                <div className="flex justify-between items-start mb-1">
                                    <span className="text-xs font-bold uppercase text-white/50 tracking-wider">
                                        Snack {index + 1}
                                    </span>
                                    <span className="text-xs text-white/70">
                                        {dayData.meals[snackType]?.calories} kcal
                                    </span>
                                </div>
                                <h4 className="text-white font-medium text-sm">
                                    {dayData.meals[snackType]?.name}
                                </h4>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
