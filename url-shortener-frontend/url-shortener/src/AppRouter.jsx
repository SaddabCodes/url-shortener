import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { Toaster } from "react-hot-toast";
import "./App.css";
import AboutPage from "./components/AboutPage";
import DashboardLayout from "./components/Dashboard/DashboardLayout";
import ErrorPage from "./components/ErrorPage";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import Navbar from "./components/Navbar";
import RegisterPage from "./components/RegisterPage";
import ShortUrlRedirect from "./components/ShortUrlRedirect";
import PrivateRoute from "./PrivateRoute";
import ShortenUrlPage from "./ShortenUrlPage";

export default function AppRouter() {
  return (
    <Router>
      <Navbar />
      <Toaster position="bottom-center" />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />

        <Route
          path="/register"
          element={
            <PrivateRoute publicPage={true}>
              {" "}
              <RegisterPage />{" "}
            </PrivateRoute>
          }
        />

        <Route
          path="/login"
          element={
            <PrivateRoute publicPage={true}>
              {" "}
              <LoginPage />{" "}
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute publicPage={false}>
              {" "}
              <DashboardLayout />{" "}
            </PrivateRoute>
          }
        />
        <Route path="/s/:shortUrl" element={<ShortUrlRedirect />} />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export const SubDomainRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/:url" element={<ShortenUrlPage />} />
      </Routes>
    </Router>
  );
};
