import { Routes, Route, Navigate } from "react-router-dom";
import type { FC } from "react";
import Dashboard from "./components/Dashboard";
import LandingPage from "./static/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Protected Route Component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("jwt_token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
