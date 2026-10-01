import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { Toaster } from "react-hot-toast";
import "./App.css";
import AboutPage from "./components/AboutPage";
import DashboardLayout from "./components/Dashboard/DashboardLayout";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import Navbar from "./components/Navbar";
import RegisterPage from "./components/RegisterPage";

export default function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Toaster position="bottom-center" />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardLayout />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}
