import React from "react";

export default function MealPlanCard({ plan, onEdit, onDelete }) {
  const mealsCount = Array.isArray(plan.meals) ? plan.meals.length : 0;

  return (
    <div className="bg-white/80 rounded-2xl p-4 shadow-md border border-white/40">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-emerald-800">{plan.title}</h3>
          <p className="text-sm text-gray-700 mt-1">{plan.description}</p>
          <div className="mt-3 text-xs text-gray-600">
            {mealsCount} meal{mealsCount !== 1 ? "s" : ""} • {new Date(plan.createdAt).toLocaleDateString()}
          </div>
        </div>

        <div className="flex flex-col items-end space-y-2">
          <button
            onClick={() => onEdit(plan)}
            className="px-3 py-1 rounded-md text-sm font-medium bg-gradient-to-r from-[#159957] to-[#155799] text-white"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(plan.id)}
            className="px-3 py-1 rounded-md text-sm font-medium bg-red-500 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
