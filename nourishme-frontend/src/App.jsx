// App.jsx
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import Signup from "./pages/signup";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import CompleteProfile from "./pages/CompleteProfile";  
import MealPlansPage from "./pages/mealPlans"

import { AuthProvider, useAuth } from "./contexts/AuthContext";
import PrivateRoute from "./components/privateRoute";

function Navbar() {
  const { token, logout } = useAuth();

  return (
    <nav className="p-4 bg-gradient-to-r from-[#159957] to-[#155799] flex justify-center space-x-4">
      {!token ? (
        <>
          <Link to="/signup" className="text-white hover:underline">Signup</Link>
          <Link to="/login" className="text-white hover:underline">Login</Link>
        </>
      ) : (
        <>
          <Link to="/dashboard" className="text-white hover:underline">Dashboard</Link>
          <button onClick={logout} className="text-white hover:underline">
            Logout
          </button>
        </>
      )}
    </nav>
  );
}

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/complete-profile"
          element={
            <PrivateRoute>
              <CompleteProfile />
            </PrivateRoute>
          }
        />
     

      <Route
        path="/meal-plans"
        element={
          <PrivateRoute>
            <MealPlansPage />
          </PrivateRoute>
        }
      />
      </Routes>

    </>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  );
}
