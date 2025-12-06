// src/pages/profile/Step3.jsx
import React from "react";

export default function Step3({ form, updateForm, next, back }) {
  return (
    <div className="w-full max-w-md space-y-4">
      <h2 className="text-xl font-semibold">Activity Level</h2>

      {["Sedentary", "Light", "Moderate", "Active", "Very Active"].map(
        (level) => (
          <label key={level} className="flex items-center gap-3">
            <input
              type="radio"
              name="activityLevel"
              value={level}
              checked={form.activityLevel === level}
              onChange={(e) => updateForm({ activityLevel: e.target.value })}
            />
            {level}
          </label>
        )
      )}

      <div className="flex justify-between gap-3">
        <button onClick={back} className="w-[50%] px-6 py-2 border rounded-xl">
          Back
        </button>
        <button
          onClick={next}
          disabled={!form.activityLevel}
          className={`w-[50%] rounded-xl text-white
          ${!form.activityLevel ? 'bg-gray-300 cursor-not-allowed' : 'bg-emerald-600'}`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
