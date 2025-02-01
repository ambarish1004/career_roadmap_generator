import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { Login, Signup, Slider } from "./pages/Login_Signup";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} /> {/* ✅ Redirect to login */}
        <Route path="/login" element={<Login />} />
        <Route element={<Slider />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
