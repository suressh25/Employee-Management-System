const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const employeeRoutes = require("./routes/employeeRoutes");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use("/api/employees", employeeRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
app.get("/", (req, res) => {
  res.send("Backend is running!");
});
