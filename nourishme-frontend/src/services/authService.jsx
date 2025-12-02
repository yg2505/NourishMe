import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "https://nourishme.onrender.com/api";

export const signup = async (name, email, password) => {
  const res = await axios.post(`${API_URL}/auth/signup`, { name, email, password });
  return res.data;
};

export const login = async (email, password) => {
  const res = await axios.post(`${API_URL}/auth/login`, { email, password });
  return res.data;
};
