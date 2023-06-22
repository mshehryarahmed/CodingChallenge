-- Create Locations table
CREATE TABLE Locations (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    company_id INT NOT NULL,
    FOREIGN KEY (company_id) REFERENCES Company(id)
);

-- Create Company table
CREATE TABLE Company (
    id INT PRIMARY KEY,
    name VARCHAR(255)
);

-- Create Assets table
CREATE TABLE Assets (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    company_id INT NOT NULL,
    FOREIGN KEY (company_id) REFERENCES Company(id)
);

-- Create Managers table
CREATE TABLE Managers (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    company_id INT NOT NULL,
    FOREIGN KEY (company_id) REFERENCES Company(id)
);

-- Create Employees table
CREATE TABLE Employees (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    manager_id INT NOT NULL,
    company_id INT NOT NULL,
    FOREIGN KEY (manager_id) REFERENCES Managers(id),
    FOREIGN KEY (company_id) REFERENCES Company(id)
);

-- Create People table
CREATE TABLE People (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    manager_id INT NOT NULL,
    employee_id INT NOT NULL,
    FOREIGN KEY (manager_id) REFERENCES Managers(id),
    FOREIGN KEY (employee_id) REFERENCES Employees(id)
);

-- Create CompanyGroups table
CREATE TABLE CompanyGroups (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    company_id INT,
    parent_group_id INT,
    FOREIGN KEY (company_id) REFERENCES Company(id),
    FOREIGN KEY (parent_group_id) REFERENCES CompanyGroups(id)
);
