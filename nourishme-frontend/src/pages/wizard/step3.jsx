// src/pages/profile/Step3.jsx
import React from "react";
import WizardLayout from "../../components/wizardLayout";

export default function Step3({ form, updateForm, next, back }) {
  return (
    <WizardLayout
      title="Activity Level"
      step={3}
      totalSteps={6}
    >
      <div className="space-y-4">

        {["Sedentary", "Light", "Moderate", "Active", "Very Active"].map(
          (level) => (
            <label
              key={level}
              className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition"
            >
              <input
                type="radio"
                name="activityLevel"
                value={level}
                checked={form.activityLevel === level}
                onChange={(e) => updateForm({ activityLevel: e.target.value })}
                className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-gray-700">{level}</span>
            </label>
          )
        )}

        <div className="flex justify-between gap-3">
          <button
            onClick={back}
            className="w-[50%] px-6 py-2 border border-gray-300 rounded-xl hover:bg-gray-100 transition"
          >
            Back
          </button>

          <button
            onClick={next}
            disabled={!form.activityLevel}
            className={`w-[50%] p-3 rounded-xl text-white transition
              ${
                !form.activityLevel
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-emerald-600 hover:bg-emerald-700"
              }`}
          >
            Next
          </button>
        </div>
      </div>
    </WizardLayout>
  );
}
