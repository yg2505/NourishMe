import { useState } from "react";
import AuthLayout from "../components/authLayout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("https://nourishme.onrender.com/api/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Welcome Back">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="text-gray-700 font-medium">Email Address</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={form.email}
            className="w-full mt-1 p-3 border border-emerald-200 rounded-xl bg-white/60 focus:ring-2 focus:ring-emerald-400 focus:outline-none transition"
            required
          />
        </div>
        <div>
          <label className="text-gray-700 font-medium">Password</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={form.password}
            className="w-full mt-1 p-3 border border-emerald-200 rounded-xl bg-white/60 focus:ring-2 focus:ring-emerald-400 focus:outline-none transition"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold tracking-wide shadow-lg hover:shadow-emerald-200 transition-all"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-gray-700 text-sm">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="text-emerald-700 font-semibold hover:underline"
          >
            Sign up
          </a>
        </p>
      </form>
    </AuthLayout>
  );
}
