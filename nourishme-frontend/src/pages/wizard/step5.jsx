// src/pages/profile/Step5.jsx
import React from "react";

export default function Step5({ form, updateForm, next, back }) {
  return (
    <div className="w-full max-w-md space-y-4">
      <h2 className="text-xl font-semibold">What is your goal?</h2>

      {["Lose Weight", "Gain Weight", "Gain Muscle" , "General Wellness"].map((g) => (
        <label key={g} className="flex gap-3 items-center">
          <input
            type="radio"
            value={g}
            checked={form.goal === g}
            onChange={() => updateForm({ goal: g })}
          />
          {g}
        </label>
      ))}

      <div className="flex justify-center gap-3">
        <button onClick={back} className="w-[50%] px-6 py-2 border rounded-xl">
          Back
        </button>
        <button
          onClick={next}
          disabled={!form.goal}
          className={`w-[50%] px-6 py-2 rounded-xl text-white
          ${!form.goal ? 'bg-gray-300 cursor-not-allowed' : 'bg-emerald-600'}`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
