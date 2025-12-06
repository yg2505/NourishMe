// src/pages/profile/Step2.jsx
import React from "react";

export default function Step2({ form, updateForm, next, back }) {
  const handleChange = (e) =>
    updateForm({ [e.target.name]: e.target.value });

  return (
    <div className="w-full max-w-md space-y-4">
      <h2 className="text-xl font-semibold">Body Information</h2>

      <input
        name="height"
        type="number"
        placeholder="Height (cm)"
        value={form.height}
        onChange={handleChange}
        className="w-full p-3 border rounded-xl"
      />

      <input
        name="weight"
        type="number"
        placeholder="Weight (kg)"
        value={form.weight}
        onChange={handleChange}
        className="w-full p-3 border rounded-xl"
      />

      <div className="flex justify-between gap-3">
        <button onClick={back} className="w-[50%] px-6 py-2 border rounded-xl">
          Back
        </button>
        <button
          onClick={next}
          disabled={!form.height || !form.weight}
          className={`w-[50%] p-3 rounded-xl text-white
          ${!form.height || !form.weight ? 'bg-gray-300 cursor-not-allowed' : 'bg-emerald-600'}`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
