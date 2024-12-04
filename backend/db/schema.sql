CREATE TABLE Employees (
    id SERIAL PRIMARY KEY,
    employee_id VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone_number CHAR(10) NOT NULL,
    department VARCHAR(50) NOT NULL,
    date_of_joining DATE NOT NULL,
    role VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
