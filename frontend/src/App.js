import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthContext";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";
import LoginPage from "./components/LoginPage";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Employee Form Page */}
          <Route path="/" element={<EmployeeForm />} />

          {/* Login Page */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Admin Page */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <EmployeeList />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
