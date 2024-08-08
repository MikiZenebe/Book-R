import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <Routes>
      <Route exact path="/login" element={<LoginPage />} />
      <Route exact path="/register" element={<Signup />} />
      <Route exact path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}
