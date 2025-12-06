import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MEAL_TYPES = [
    { key: "breakfast", label: "Breakfast" },
    { key: "snack1", label: "Snack 1" },
    { key: "lunch", label: "Lunch" },
    { key: "snack2", label: "Snack 2" },
    { key: "dinner", label: "Dinner" },
];

export default function WeeklyCalendarView({
    weekDays,
    currentWeekIndex,
    totalWeeks,
    onNext,
    onPrev,
    onMealClick,
}) {
    // Helper to format date
    const formatDate = (dayIndex) => {
        // Assuming dayIndex is 1-based from the start of the plan
        // We don't have actual dates in the mock data usually, just "Day 1", "Day 2".
        // If we had a startDate, we could calculate.
        // For now, let's just show "Day X".
        return `Day ${dayIndex}`;
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Header / Navigation */}
            <div className="flex items-center justify-between p-4 mb-4">
                <button
                    onClick={onPrev}
                    disabled={currentWeekIndex === 0}
                    className="p-2 rounded-lg hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition"
                >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>

                <h3 className="text-lg font-semibold text-gray-800">
                    Week {currentWeekIndex + 1}
                </h3>

                <button
                    onClick={onNext}
                    disabled={currentWeekIndex >= totalWeeks - 1}
                    className="p-2 rounded-lg hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition"
                >
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
            </div>

            {/* Calendar Grid */}
            <div className="overflow-x-auto">
                <div className="min-w-[800px]">
                    {/* Days Header */}
                    <div className="grid grid-cols-[100px_repeat(7,1fr)] border-b border-gray-200">
                        <div className="p-4 font-medium text-gray-500 text-sm flex items-center justify-center border-r border-gray-200">
                            Meal
                        </div>
                        {weekDays.map((day, index) => (
                            <div
                                key={day.day}
                                className="p-4 text-center border-r border-gray-200 last:border-r-0"
                            >
                                <div className="font-semibold text-gray-800">
                                    {formatDate(day.day)}
                                </div>
                                {/* <div className="text-xs text-gray-400 mt-1">Mon</div> */}
                            </div>
                        ))}
                    </div>

                    {/* Meal Rows */}
                    {MEAL_TYPES.map((type) => (
                        <div
                            key={type.key}
                            className="grid grid-cols-[100px_repeat(7,1fr)] border-b border-gray-200 last:border-b-0"
                        >
                            {/* Row Label */}
                            <div className="p-4 text-sm font-medium text-gray-600 flex items-center justify-center border-r border-gray-200 bg-gray-50/50">
                                {type.label}
                            </div>

                            {/* Meal Cells */}
                            {weekDays.map((day) => {
                                const meal = day.meals[type.key];
                                return (
                                    <div
                                        key={`${day.day}-${type.key}`}
                                        className="p-2 border-r border-gray-200 last:border-r-0 h-32 relative group cursor-pointer hover:bg-blue-50/50 transition"
                                        onClick={() => onMealClick(meal, day)}
                                    >
                                        {meal ? (
                                            <div className="h-full flex flex-col">
                                                <div className="font-medium text-sm text-gray-800 line-clamp-2 mb-1">
                                                    {meal.name}
                                                </div>
                                                <div className="mt-auto">
                                                    <span className="inline-block px-2 py-0.5 bg-green-100 text-green-700 text-[10px] rounded-full font-medium">
                                                        {meal.calories} kcal
                                                    </span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="h-full flex items-center justify-center text-gray-300 text-xs">
                                                -
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
