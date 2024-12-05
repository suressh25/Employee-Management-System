import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAdmin") === "true"
  );

  const login = () => {
    localStorage.setItem("isAdmin", "true");
    setIsAuthenticated(true);
  };
  
  const logout = () => {
    localStorage.removeItem("isAdmin");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
