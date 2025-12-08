// src/pages/profile/Step4.jsx
import React, { useState } from "react";
import WizardLayout from "../../components/wizardLayout";

export default function Step4({ form, updateForm, next, back }) {
  const [inputValue, setInputValue] = useState("");

  const handleEnter = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      updateForm({ allergies: [...(form.allergies || []), e.target.value] });
      setInputValue("");
    }
  };

  const remove = (index) => {
    updateForm({ allergies: form.allergies.filter((_, i) => i !== index) });
  };

  return (
    <WizardLayout
      title="Any food allergies?"
      step={4}
      totalSteps={6}
    >
      <div className="space-y-4">

        <input
          type="text"
          placeholder="Type allergy & press Enter"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleEnter}
          className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
        />

        {/* Allergy chips */}
        <div className="flex flex-wrap gap-2">
          {(form.allergies || []).map((a, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full flex items-center gap-2 shadow-sm"
            >
              {a}
              <button
                onClick={() => remove(i)}
                className="text-red-500 hover:text-red-700 font-semibold"
              >
                ✕
              </button>
            </span>
          ))}
        </div>

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
            className="w-[50%] p-3 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition"
          >
            Next
          </button>
        </div>
      </div>
    </WizardLayout>
  );
}
