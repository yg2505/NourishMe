// src/pages/profile/Step2.jsx
import React from "react";
import WizardLayout from "../../components/wizardLayout";

export default function Step2({ form, updateForm, next, back }) {
  const handleChange = (e) =>
    updateForm({ [e.target.name]: e.target.value });

  return (
    <WizardLayout
      title="Body Information"
      step={2}
      totalSteps={6}
    >
      <div className="space-y-4">

        <input
          name="height"
          type="number"
          placeholder="Height (cm)"
          value={form.height}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
        />

        <input
          name="weight"
          type="number"
          placeholder="Weight (kg)"
          value={form.weight}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
        />

        <div className="flex justify-between gap-3">
          <button
            onClick={back}
            className="w-[50%] px-6 py-2 border border-gray-300 rounded-xl hover:bg-gray-100 transition"
          >
            Back
          </button>

          <button
            onClick={next}
            disabled={!form.height || !form.weight}
            className={`w-[50%] p-3 rounded-xl text-white transition
              ${
                !form.height || !form.weight
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
