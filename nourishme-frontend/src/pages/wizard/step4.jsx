// src/pages/profile/Step4.jsx
import React, { useState } from "react";

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
    <div className="w-full max-w-md space-y-4">
      <h2 className="text-xl font-semibold">Any food allergies?</h2>

      <input
        type="text"
        placeholder="Type allergy & press Enter"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleEnter}
        className="w-full p-3 border rounded-xl"
      />

      <div className="flex flex-wrap gap-2">
        {(form.allergies || []).map((a, i) => (
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
          onClick={next}
          className="px-6 py-2 bg-emerald-600 text-white rounded-xl"
        >
          Next
        </button>
      </div>
    </div>
  );
}
