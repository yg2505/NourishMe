import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://nourishme.onrender.com/api",
  headers: { "Content-Type": "application/json" },
});

export const setAuthToken = (token) => {
  if (token) api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete api.defaults.headers.common["Authorization"];
};

export const getMealPlans = () => api.get("/meal-plans").then(r => r.data);
export const getMealPlan = (id) => api.get(`/meal-plans/${id}`).then(r => r.data);
export const createMealPlan = (payload) => api.post("/meal-plans", payload).then(r => r.data);
export const updateMealPlan = (id, payload) => api.put(`/meal-plans/${id}`, payload).then(r => r.data);
export const deleteMealPlan = (id) => api.delete(`/meal-plans/${id}`).then(r => r.data);
