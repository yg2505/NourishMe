// src/pages/profile/Step5.jsx
import React from "react";
import WizardLayout from "../../components/wizardLayout";

export default function Step5({ form, updateForm, next, back }) {
  return (
    <WizardLayout
      title="What is your goal?"
      step={5}
      totalSteps={6}   // If Step5 is not final, adjust accordingly
    >
      <div className="space-y-4">

        {["Lose Weight", "Gain Weight", "Gain Muscle", "General Wellness"].map(
          (g) => (
            <label
              key={g}
              className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition"
            >
              <input
                type="radio"
                value={g}
                checked={form.goal === g}
                onChange={() => updateForm({ goal: g })}
                className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-gray-700">{g}</span>
            </label>
          )
        )}

        {/* Navigation */}
        <div className="flex justify-between gap-3">
          <button
            onClick={back}
            className="w-[50%] px-6 py-2 border border-gray-300 rounded-xl hover:bg-gray-100 transition"
          >
            Back
          </button>

          <button
            onClick={next}
            disabled={!form.goal}
            className={`w-[50%] p-3 rounded-xl text-white transition
              ${
                !form.goal
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
