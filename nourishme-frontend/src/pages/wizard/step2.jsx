// src/pages/profile/Step2.jsx
import React, { useState } from "react";

export default function Step2({ next }) {
  const [form, setForm] = useState({ height: "", weight: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleNext = () => {
    localStorage.setItem("profile", JSON.stringify(form));
    next();
  };

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

      <button
          onClick={handleNext}
          disabled={!form.height || !form.weight}
          className={`w-full mt-6 p-3 rounded-xl text-white
          ${!form.height || !form.weight? 'bg-gray-300 cursor-not-allowed' : 'bg-emerald-600'}`}
        >
          Next
      </button>
    </div>
  );
}
