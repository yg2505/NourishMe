import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";

function App() {
  return (
    <Router>
      <nav className="p-4 bg-emerald-600 flex justify-center space-x-4">
        <Link to="/signup" className="text-white">Signup</Link>
        <Link to="/login" className="text-white">Login</Link>
        <Link to="/dashboard" className="text-white">Dashboard</Link>
      </nav>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}


export default App;
