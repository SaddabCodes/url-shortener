import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import "./App.css";
import AboutPage from "./components/AboutPage";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import Navbar from "./components/Navbar";
import RegisterPage from "./components/RegisterPage";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Toaster position="bottom-center"/>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}
