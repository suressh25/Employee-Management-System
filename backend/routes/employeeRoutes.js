const express = require("express");
const { body, validationResult } = require("express-validator");
const pool = require("../db/dbConfig");

const router = express.Router();

// Add Employee
router.post(
  "/",
  [
    body("employee_id")
      .isLength({ max: 10 })
      .withMessage("Max 10 characters allowed for Employee ID"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("phone_number")
      .isNumeric()
      .isLength({ min: 10, max: 10 })
      .withMessage("Phone number must be 10 digits"),
    body("date_of_joining").custom((value) => {
      if (new Date(value) > new Date())
        throw new Error("Future dates not allowed");
      return true;
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      employee_id,
      name,
      email,
      phone_number,
      department,
      date_of_joining,
      role,
    } = req.body;

    try {
      const result = await pool.query(
        "INSERT INTO Employees (employee_id, name, email, phone_number, department, date_of_joining, role) VALUES ($1, $2, $3, $4, $5, $6, $7)",
        [
          employee_id,
          name,
          email,
          phone_number,
          department,
          date_of_joining,
          role,
        ]
      );
      res.status(201).json({ message: "Employee added successfully" });
    } catch (err) {
      if (err.code === "23505") {
        res
          .status(400)
          .json({ message: "Employee ID or Email already exists" });
      } else {
        res.status(500).json({ message: "Server error" });
      }
    }
  }
);
// Get all employees
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM Employees ORDER BY created_at DESC"
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Error fetching employee data" });
  }
});
// Update employee
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, phone_number, department, date_of_joining, role } =
    req.body;

  try {
    const result = await pool.query(
      "UPDATE Employees SET name=$1, email=$2, phone_number=$3, department=$4, date_of_joining=$5, role=$6 WHERE employee_id=$7",
      [name, email, phone_number, department, date_of_joining, role, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json({ message: "Employee updated successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Error updating employee" });
  }
});

// Delete employee
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM Employees WHERE employee_id=$1",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json({ message: "Employee deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Error deleting employee" });
  }
});

module.exports = router;
