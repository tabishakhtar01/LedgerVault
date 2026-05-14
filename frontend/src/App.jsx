import react from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

const app = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/api/auth/login" element={<Login />} />
          <Route path="/api/auth/register" element={<Register />} />
        </Routes>
      </Router>
    </>
  );
};

export default app;
