// App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import homeImg from './assets/hom.png'
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


function Home() {
  return (
    <div
      className="bg-cover bg-center"
      style={{ backgroundImage: `url(${homeImg})` }}
    >
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Content */}
        <div className="relative text-center max-w-2xl text-white mt-72">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            NourishMe
          </h1>
          <p className="text-lg mb-8 opacity-90">
            Eat smarter. Plan healthier. Track your nutrition with ease.
          </p>
          <Link
            to="/signup"
            className="bg-green-600 px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto grid gap-8 md:grid-cols-3">
          {[
            ["Meal Planning", "Plan balanced meals for your day or week."],
            ["Calorie Tracking", "Track calories and macronutrients easily."],
            ["Nutrition Insights", "Understand your eating habits better."]
          ].map(([title, desc]) => (
            <div
              key={title}
              className="bg-white p-6 rounded-xl shadow-xl hover:shadow-md transition"
            >
              <h3 className="font-semibold text-xl mb-2">{title}</h3>
              <p className="text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">How it works</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {["Create an account", "Plan your meals", "Track nutrition daily"].map(
              (step, i) => (
                <div key={i}>
                  <div className="text-green-600 text-3xl font-bold mb-2">
                    {i + 1}
                  </div>
                  <p className="text-gray-700">{step}</p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-[#159957] to-[#155799] text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Start your healthy journey today
          </h2>
          <Link
            to="/signup"
            className="bg-white text-green-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
          >
            Create Free Account
          </Link>
        </div>
      </section>
    </div>
  );
}




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
      <Route path="/" element={<Home />} />

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
