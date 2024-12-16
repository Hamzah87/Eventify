import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./AboutPage.jsx";
import Events from "./EventsPage.jsx";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import { Dashboard } from "./components/Dashboard";
import { CreateEvent } from "./components/CreateEvent";
import { Navbar } from "./components/Navbar";
import { MinimalNavbar } from "./components/MinimalNavbar";
import { EventDetails } from "./components/EventDetails";

function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

function AuthLayout({ children }) {
  return (
    <>
      <MinimalNavbar />
      {children}
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <MainLayout>
                  <App />
                </MainLayout>
              }
            />
            <Route
              path="/about"
              element={
                <MainLayout>
                  <About />
                </MainLayout>
              }
            />
            <Route
              path="/events"
              element={
                <MainLayout>
                  <Events />
                </MainLayout>
              }
            />
            <Route
              path="/dashboard"
              element={
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              }
            />
            <Route
              path="/create-event"
              element={
                <MainLayout>
                  <CreateEvent />
                </MainLayout>
              }
            />
            <Route
              path="/events/:eventId"
              element={
                <MainLayout>
                  <EventDetails />
                </MainLayout>
              }
            />

            <Route
              path="/login"
              element={
                <AuthLayout>
                  <Login />
                </AuthLayout>
              }
            />
            <Route
              path="/register"
              element={
                <AuthLayout>
                  <Register />
                </AuthLayout>
              }
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);
