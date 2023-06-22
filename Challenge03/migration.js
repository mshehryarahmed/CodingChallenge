// Create Locations collection
db.createCollection("locations");
db.locations.createIndex({ company_id: 1 });
db.locations.createIndex({ company_id: 1 }, { unique: true });

// Create Company collection
db.createCollection("companies");

// Create Assets collection
db.createCollection("assets");
db.assets.createIndex({ company_id: 1 });

// Create Managers collection
db.createCollection("managers");
db.managers.createIndex({ company_id: 1 });

// Create Employees collection
db.createCollection("employees");
db.employees.createIndex({ manager_id: 1 });
db.employees.createIndex({ company_id: 1 });

// Create People collection
db.createCollection("people");
db.people.createIndex({ manager_id: 1 });
db.people.createIndex({ employee_id: 1 });

// Create CompanyGroups collection
db.createCollection("companyGroups");
db.companyGroups.createIndex({ company_id: 1 });
db.companyGroups.createIndex({ parent_group_id: 1 });