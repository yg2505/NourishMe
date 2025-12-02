import React, { useState, useEffect } from "react";

export default function MealPlanForm({ initial = null, onClose, onSave }) {
  const [title, setTitle] = useState(initial?.title || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [meals, setMeals] = useState(initial?.meals || []); // array of {name, calories, time}
  const [isPublic, setIsPublic] = useState(initial?.isPublic || false);

  useEffect(() => {
    if (initial) {
      setTitle(initial.title || "");
      setDescription(initial.description || "");
      setMeals(initial.meals || []);
      setIsPublic(!!initial.isPublic);
    }
  }, [initial]);

  const addMeal = () => setMeals(prev => [...prev, { name: "", calories: "", time: "" }]);
  const updateMeal = (i, patch) => setMeals(prev => prev.map((m, idx) => idx === i ? { ...m, ...patch } : m));
  const removeMeal = (i) => setMeals(prev => prev.filter((_, idx) => idx !== i));

  const handleSubmit = (e) => {
    e.preventDefault();
    // basic validation
    if (!title.trim()) return alert("Title required");
    onSave({ title, description, meals, isPublic });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-white/90 p-6 rounded-2xl">
        <h2 className="text-xl font-semibold mb-4">{initial ? "Edit" : "Create"} Meal Plan</h2>

        <label className="block mb-2 font-medium">Title</label>
        <input className="w-full p-3 rounded-xl mb-3 border" value={title} onChange={e => setTitle(e.target.value)} />

        <label className="block mb-2 font-medium">Description</label>
        <textarea className="w-full p-3 rounded-xl mb-3 border" value={description} onChange={e => setDescription(e.target.value)} />

        <div className="mb-3">
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium">Meals</label>
            <button type="button" onClick={addMeal} className="text-sm text-emerald-700">+ Add meal</button>
          </div>

          {meals.map((m, i) => (
            <div key={i} className="mb-2 grid grid-cols-12 gap-2 items-center">
              <input value={m.name} onChange={e => updateMeal(i, { name: e.target.value })} placeholder="Name" className="col-span-5 p-2 border rounded-md" />
              <input value={m.calories} onChange={e => updateMeal(i, { calories: e.target.value })} placeholder="Calories" className="col-span-3 p-2 border rounded-md" />
              <input value={m.time} onChange={e => updateMeal(i, { time: e.target.value })} placeholder="Time" className="col-span-3 p-2 border rounded-md" />
              <button type="button" onClick={() => removeMeal(i)} className="col-span-1 text-red-600">✕</button>
            </div>
          ))}
        </div>

        <label className="flex items-center space-x-2 mb-4">
          <input type="checkbox" checked={isPublic} onChange={e => setIsPublic(e.target.checked)} />
          <span className="text-sm">Make plan public</span>
        </label>

        <div className="flex items-center justify-end space-x-3">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg">Cancel</button>
          <button type="submit" className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#159957] to-[#155799] text-white">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
