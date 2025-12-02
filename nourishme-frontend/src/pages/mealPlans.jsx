import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { setAuthToken, getMealPlans, createMealPlan, updateMealPlan, deleteMealPlan } from "../services/mealPlanService";
import MealPlanCard from "../components/mealPlanCard";
import MealPlanForm from "../components/mealPlanForm";
import WizardLayout from "../components/wizardLayout"; // optional layout: uses your light gradient

export default function MealPlans() {
  const { token } = useAuth();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    if (!token) return;
    setAuthToken(token);
    fetchPlans();
  }, [token]);

  const fetchPlans = async () => {
    setLoading(true);
    try {
      const data = await getMealPlans();
      console.log("Fetched meal plans:", data);
      if (Array.isArray(data)) {
        setPlans(data);
      } else {
        console.error("Meal plans data is not an array:", data);
        setPlans([]);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to load meal plans");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditing(null);
    setShowForm(true);
  };

  const handleSave = async (payload) => {
    try {
      if (editing) {
        const updated = await updateMealPlan(editing.id, payload);
        setPlans(prev => prev.map(p => p.id === updated.id ? updated : p));
      } else {
        const created = await createMealPlan(payload);
        setPlans(prev => [created, ...prev]);
      }
      setShowForm(false);
    } catch (err) {
      console.error(err);
      alert("Failed to save");
    }
  };

  const handleEdit = (plan) => {
    setEditing(plan);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this meal plan?")) return;
    try {
      await deleteMealPlan(id);
      setPlans(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <WizardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-semibold text-white">Meal Plans</h1>
          <button onClick={handleCreate} className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#159957] to-[#155799] text-white">
            + New Plan
          </button>
        </div>

        {loading ? (
          <div className="text-white">Loading...</div>
        ) : plans.length === 0 ? (
          <div className="text-white">You have no meal plans yet. Create your first plan.</div>
        ) : (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            {plans.map(plan => (
              <MealPlanCard key={plan.id} plan={plan} onEdit={handleEdit} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>

      {showForm && (
        <MealPlanForm
          initial={editing}
          onClose={() => setShowForm(false)}
          onSave={handleSave}
        />
      )}
    </WizardLayout>
  );
}
