import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AttendanceList.css';

const AttendanceList = () => {
    const [employeeId, setEmployeeId] = useState('');
    const [attendance, setAttendance] = useState([]);
    const [csvFile, setCsvFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = () => {
        if (employeeId.trim() !== '') {
            // Make an API request to fetch attendance information for the specified employee
            axios
                .get(`http://localhost:8000/api/attendance/${employeeId}`)
                .then((response) => {
                    const data = response.data;
                    setAttendance(data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setCsvFile(file);
    };

    const handleUpload = () => {
        if (!csvFile) {
            alert('Choose a CSV file to upload');
            return;
        }

        setIsLoading(true);

        const formData = new FormData();
        formData.append('csvFile', csvFile);

        axios
            .post('http://localhost:8000/api/upload', formData)
            .then((response) => {
                console.log(response.data);
                setIsLoading(false);
                handleSearch(); // Fetch attendance information after uploading the CSV file
            })
            .catch((error) => {
                console.error(error);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        if (!isLoading) {
            handleSearch(); // Fetch attendance information on component mount and when not in loading state
        }
    }, [isLoading]);

    return (
        <div>
            <h1>Employee Attendance information</h1>
            <h2>Upload Data</h2>
            <div>
                <input type="file" accept=".csv" onChange={handleFileChange} />
                <button onClick={handleUpload}>Load</button>
            </div>
            <h2>Attendance List</h2>
            <div>
                <input
                    type="text"
                    placeholder="Enter Employee ID"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            {attendance[0] && <h4>Employee Name: {attendance[0].name}</h4>}
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Check-in</th>
                            <th>Check-out</th>
                            <th>Total Working Hours</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendance.map((record, index) => (
                            <tr key={index}>
                                <td>{record.checkin || 'N/A'}</td>
                                <td>{record.checkout || 'N/A'}</td>
                                <td>{record.totalWorkingHours || 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AttendanceList;