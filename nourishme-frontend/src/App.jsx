import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check token on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <>
      <nav className="p-4 bg-emerald-600 flex justify-center space-x-4">
        {!isLoggedIn ? (
          <>
            <Link to="/signup" className="text-white hover:underline">
              Signup
            </Link>
            <Link to="/login" className="text-white hover:underline">
              Login
            </Link>
            <Link to="/dashboard" className="text-white hover:underline">
              Dashboard
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="text-white justify-between "
          >
            Logout
          </button>
        )}
      </nav>

      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

// Wrap App with Router outside (needed for useNavigate to work properly)
export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
