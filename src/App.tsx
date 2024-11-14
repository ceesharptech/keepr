import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import Dashboard from "./pages/Dashboard";
import Validation from "./pages/Validation";
import { useState, useEffect } from "react";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import { Toaster } from "@/components/ui/toaster";
import { getCurrentUser } from 'aws-amplify/auth';

Amplify.configure(outputs);

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => sessionStorage.getItem("isAuthenticated") === "true"
  );
  const [authChecked, setAuthChecked] = useState(false);

  // Check for authenticated user session on app load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        await getCurrentUser();
        setIsAuthenticated(true);
        sessionStorage.setItem("isAuthenticated", "true");
      } catch {
        setIsAuthenticated(false);
        sessionStorage.setItem("isAuthenticated", "false");
      } finally {
        setAuthChecked(true);
      }
    };
    checkAuthStatus();
  }, []);

  // Update auth status when user logs in or out
  function updateAuthStatus(authStatus: boolean) {
    setIsAuthenticated(authStatus);
    sessionStorage.setItem("isAuthenticated", authStatus.toString());
  }

  // Protected Route wrapper
  const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    if (!authChecked) return null; // wait until auth is checked
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={<LandingPage isAuthenticated={isAuthenticated} />}
        />
        <Route
          path="/"
          element={<LandingPage isAuthenticated={isAuthenticated} />}
        />
        <Route
          path="/login"
          element={<LoginPage updateAuthStatus={updateAuthStatus} />}
        />
        <Route path="/signup" element={<SignUpPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard updateAuthStatus={updateAuthStatus} />
            </ProtectedRoute>
          }
        />
        <Route path="/validate" element={<Validation />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}
