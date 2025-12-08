// App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Signup from "./pages/signup";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import CompleteProfile from "./pages/CompleteProfile";
import MonthlyMealPlanPage from "./pages/MonthlyMealPlanPage";
import Recipes from "./pages/Recipes";
import Profile from "./pages/Profile";
import Favorites from "./pages/Favorites";

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
        <div className="flex justify-between items-center w-full px-6">
          <h1 className="text-white text-3xl font-bold">NourishMe</h1>
          <button onClick={logout} className="text-white hover:underline">
            Logout
          </button>
        </div>
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
          path="/monthly-meal-plan"
          element={
            <PrivateRoute>
              <MonthlyMealPlanPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/recipes"
          element={
            <PrivateRoute>
              <Recipes />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        <Route
          path="/favorites"
          element={
            <PrivateRoute>
              <Favorites />
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
