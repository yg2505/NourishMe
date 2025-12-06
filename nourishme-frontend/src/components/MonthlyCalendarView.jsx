import React from "react";

export default function MonthlyCalendarView({ days, onDayClick, selectedDay }) {
    // Helper function to determine calorie level color
    const getCalorieColor = (calories) => {
        if (calories < 1600) return "bg-green-500/20 border-green-500/50 text-green-200";
        if (calories <= 2000) return "bg-yellow-500/20 border-yellow-500/50 text-yellow-200";
        return "bg-red-500/20 border-red-500/50 text-red-200";
    };

    const getCalorieBadgeColor = (calories) => {
        if (calories < 1600) return "bg-green-500";
        if (calories <= 2000) return "bg-yellow-500";
        return "bg-red-500";
    };

    if (!days || days.length === 0) {
        return (
            <div className="text-white/60 text-center py-12">
                No meal plan data available
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">📅 Your 30-Day Meal Plan</h2>
                <p className="text-white/70 text-sm">Click on any day to view detailed meal information</p>
            </div>

            {/* Color Legend */}
            <div className="flex gap-4 mb-6 flex-wrap">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-green-500"></div>
                    <span className="text-white/80 text-sm">Low Cal (&lt;1600)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                    <span className="text-white/80 text-sm">Medium (1600-2000)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-red-500"></div>
                    <span className="text-white/80 text-sm">High (&gt;2000)</span>
                </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                {days.map((dayData) => (
                    <button
                        key={dayData.day}
                        onClick={() => onDayClick(dayData)}
                        className={`
              p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl
              ${getCalorieColor(dayData.totalCalories)}
              ${selectedDay?.day === dayData.day ? "ring-4 ring-white/50 scale-105" : ""}
            `}
                    >
                        <div className="text-center">
                            <div className="text-lg font-bold mb-2">Day {dayData.day}</div>
                            <div className={`inline-block px-3 py-1 rounded-full text-white text-sm font-semibold ${getCalorieBadgeColor(dayData.totalCalories)}`}>
                                {dayData.totalCalories} cal
                            </div>

                            {/* Mini macro indicators */}
                            <div className="mt-2 flex gap-1 justify-center text-xs">
                                <div className="flex items-center gap-1">
                                    <span className="text-blue-300">P:</span>
                                    <span className="text-white/80">{dayData.macros?.protein}g</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <span className="text-orange-300">F:</span>
                                    <span className="text-white/80">{dayData.macros?.fats}g</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <span className="text-green-300">C:</span>
                                    <span className="text-white/80">{dayData.macros?.carbs}g</span>
                                </div>
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
