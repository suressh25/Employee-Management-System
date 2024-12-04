import React, { useState } from "react";
import axios from "axios";
import "./styles/form.css";

function EmployeeForm() {
  const [formData, setFormData] = useState({
    employee_id: "",
    name: "",
    email: "",
    phone_number: "",
    department: "",
    date_of_joining: "",
    role: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/employees",
        formData
      );
      setSuccess(response.data.message);
      setFormData({
        employee_id: "",
        name: "",
        email: "",
        phone_number: "",
        department: "",
        date_of_joining: "",
        role: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="employee_id"
        placeholder="Employee ID"
        value={formData.employee_id}
        onChange={handleChange}
        required
      />
      <input
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        name="phone_number"
        placeholder="Phone Number"
        value={formData.phone_number}
        onChange={handleChange}
        required
      />
      <select
        name="department"
        value={formData.department}
        onChange={handleChange}
        required
      >
        <option value="">Select Department</option>
        <option value="HR">HR</option>
        <option value="Engineering">Engineering</option>
        <option value="Marketing">Marketing</option>
      </select>
      <input
        name="date_of_joining"
        type="date"
        value={formData.date_of_joining}
        onChange={handleChange}
        required
      />
      <input
        name="role"
        placeholder="Role"
        value={formData.role}
        onChange={handleChange}
        required
      />
      <button type="submit">Submit</button>
      {success && <p className="success">{success}</p>}
      {error && <p className="error">{error}</p>}
    </form>
  );
}

export default EmployeeForm;
