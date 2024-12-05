import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Example hardcoded admin credentials
    const adminUsername = "admin";
    const adminPassword = "password";

    if (
      credentials.username === adminUsername &&
      credentials.password === adminPassword
    ) {
      login(); // Update the authentication state
      setTimeout(() => {
        console.log("Checking authentication state after login");
        console.log("Is authenticated:", isAuthenticated);
        navigate("/admin"); // Redirect to Employee List
      }, 100); // Small delay to ensure state is updated
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div>
      <h1>Admin Login</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={credentials.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
