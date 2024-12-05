import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import axios from "axios";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [editingEmployee, setEditingEmployee] = useState(null); // State for editing
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  // Check if user is authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      logout(); // Call logout if not authenticated
      navigate("/login"); // Redirect to login page
    }
  }, [isAuthenticated, logout, navigate]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          "https://employee-management-system-backend-ro81.onrender.com/api/employees"
        );
        setEmployees(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch employee data.");
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://employee-management-system-backend-ro81.onrender.com/api/employees/${id}`
      );
      setEmployees(employees.filter((employee) => employee.employee_id !== id));
    } catch (err) {
      setError("Failed to delete employee.");
    }
  };

  const handleLogout = () => {
    logout(); // Use the logout function from AuthContext
    navigate("/login"); // Redirect to login page
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee); // Set the employee to be edited
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://employee-management-system-backend-ro81.onrender.com/api/employees/${editingEmployee.employee_id}`,
        editingEmployee
      );
      setEmployees(
        employees.map((emp) =>
          emp.employee_id === editingEmployee.employee_id
            ? editingEmployee
            : emp
        )
      );
      setEditingEmployee(null); // Clear editing state
    } catch (err) {
      setError("Failed to update employee.");
    }
  };

  const handleChange = (e) => {
    setEditingEmployee({
      ...editingEmployee,
      [e.target.name]: e.target.value,
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  if (loading) return <p>Loading employees...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Employee List</h2>
      <button onClick={handleLogout}>Logout</button>
      {editingEmployee && (
        <form onSubmit={handleUpdate}>
          <h3>Edit Employee</h3>
          <input
            type="text"
            name="name"
            value={editingEmployee.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
          <input
            type="email"
            name="email"
            value={editingEmployee.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            type="text"
            name="phone_number"
            value={editingEmployee.phone_number}
            onChange={handleChange}
            placeholder="Phone Number"
            required
          />
          <input
            type="text"
            name="department"
            value={editingEmployee.department}
            onChange={handleChange}
            placeholder="Department"
            required
          />
          <input
            type="date"
            name="date_of_joining"
            value={editingEmployee.date_of_joining} // Ensure this retains the date value
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="role"
            value={editingEmployee.role}
            onChange={handleChange}
            placeholder="Role"
            required
          />
          <button type="submit">Update</button>
          <button type="button" onClick={() => setEditingEmployee(null)}>
            Cancel
          </button>
        </form>
      )}
      <table border="1" style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Department</th>
            <th>Date of Joining</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.employee_id}>
              <td>{employee.employee_id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.phone_number}</td>
              <td>{employee.department}</td>
              <td>{formatDate(employee.date_of_joining)}</td>{" "}
              {/* Format the date here */}
              <td>{employee.role}</td>
              <td>
                <button onClick={() => handleEdit(employee)}>Edit</button>
                <button onClick={() => handleDelete(employee.employee_id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;
