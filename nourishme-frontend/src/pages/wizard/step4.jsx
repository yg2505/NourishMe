// src/pages/profile/Step5.jsx
import React, { useState } from "react";

export default function Step5({ next, back }) {
  const [allergies, setAllergies] = useState([]);

  const handleEnter = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      setAllergies([...allergies, e.target.value]);
      e.target.value = "";
    }
  };

  const remove = (index) => {
    setAllergies(allergies.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    const prev = JSON.parse(localStorage.getItem("profile")) || {};
    localStorage.setItem("profile", JSON.stringify({ ...prev, allergies }));
    next();
  };

  return (
    <div className="w-full max-w-md space-y-4">
      <h2 className="text-xl font-semibold">Any food allergies?</h2>

      <input
        type="text"
        placeholder="Type allergy & press Enter"
        onKeyDown={handleEnter}
        className="w-full p-3 border rounded-xl"
      />

      <div className="flex flex-wrap gap-2">
        {allergies.map((a, i) => (
          <span
            key={i}
            className="px-2 py-1 bg-emerald-200 rounded-full flex items-center gap-2"
          >
            {a}
            <button onClick={() => remove(i)}>❌</button>
          </span>
        ))}
      </div>

      <div className="flex justify-between">
        <button onClick={back} className="px-6 py-2 border rounded-xl">
          Back
        </button>
        <button
          onClick={handleNext}
          className="px-6 py-2 bg-emerald-600 text-white rounded-xl"
        >
          Next
        </button>
      </div>
    </div>
  );
}
