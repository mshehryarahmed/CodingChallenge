const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
const mongoose = require('mongoose');
const csv = require('fast-csv');
const { Readable } = require('stream');

const app = express();
const upload = multer();

// Configure middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enable CORS
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/codingChallenge', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define Employee Schema
const employeeSchema = new mongoose.Schema({
    recordId: Number,
    employeeId: String,
    employeeName: String,
    checkin: Date,
    checkout: Date,
    attendance: [{
        checkin: Date,
        checkout: Date
    }]
});

// Define Employee Model
const Employee = mongoose.model('Employee', employeeSchema);

// Helper function to calculate working hours
function calculateWorkingHours(checkin, checkout) {
    // Implement the logic to calculate the working hours based on check-in and check-out times
    // This is just a placeholder implementation
    return '8 hours';
}

// API Endpoint to Fetch Employee Attendance
app.get('/api/attendance/:employeeId', async (req, res) => {
    const employeeId = req.params.employeeId;
    try {
        const employees = await Employee.find({ employeeId });
        if (employees.length > 0) {
            const attendanceList = [];
            employees.forEach((employee) => {
                const { checkin, checkout } = employee;
                const totalWorkingHours = calculateWorkingHours(checkin, checkout);
                attendanceList.push({
                    name: employee.employeeName,
                    checkin: employee.checkin,
                    checkout: employee.checkout,
                    totalWorkingHours,
                });
            });
            res.json(attendanceList);
        } else {
            res.json([]); // Return an empty array if no attendance records found
        }
    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        res.status(500).json({ error: 'Internal server error' });
    }
});

// API Endpoint to Upload CSV File and Process Data
app.post('/api/upload', upload.single('csvFile'), async (req, res) => {
    try {
        const file = req.file;

        if (!file) {
            res.status(400).json({ error: 'No file uploaded' });
            return;
        }

        const filePath = file.buffer.toString(); // Get the file path correctly

        // Delete existing records from the collection
        await Employee.deleteMany();

        // Read the CSV file and process the data
        const stream = Readable.from([filePath]);
        const csvStream = csv.parse({ headers: true })
            .on('data', async (data) => {
                try {
                    // Map the column names from the CSV file to the MongoDB schema fields
                    const employeeData = {
                        recordId: data.recordId,
                        employeeId: data.employeeId,
                        employeeName: data.employeeName,
                        checkin: new Date(data.checkin),
                        checkout: new Date(data.checkout),
                        attendance: [] // Initialize attendance as an empty array
                    };

                    // Create and save the employee document

                    const employee = new Employee(employeeData);
                    await employee.save();
                } catch (error) {
                    console.error('Error:', error);
                }
            })
            .on('end', () => {
                console.log('CSV parsing finished');
                res.json({ message: 'CSV file uploaded successfully' });
            });

        stream.pipe(csvStream);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Start the server
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});