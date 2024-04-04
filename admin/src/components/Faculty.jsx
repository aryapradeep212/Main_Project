import React, { useEffect, useState } from 'react';
import { useTable } from 'react-table';
import axios from 'axios';
import { Button, Typography } from '@mui/material'; // Import Button and Typography from Material-UI
import NavBar from './NavBar';

const FacultyTable = () => {
  const [facultyData, setFacultyData] = useState([]);

  useEffect(() => {
    fetchFacultyData();
  }, []);

  const fetchFacultyData = async () => {
    try {
      const response = await axios.get('http://localhost:9453/viewfaculty');
      setFacultyData(response.data);
    } catch (error) {
      console.error('Error fetching faculty data:', error);
    }
  };

  const handleDelete = async (facultyId) => {
    console.log('Delete faculty with ID:', facultyId);
    const response = await axios.delete('http://localhost:9453/deletefaculty/' + facultyId);
    window.location.reload();
    // Implement the logic to delete the faculty with the specified ID
  };

  const handleUpdate = (facultyId) => {
    console.log('Update faculty with ID:', facultyId);
    // Implement the logic to update the faculty with the specified ID
  };

  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Designation',
        accessor: 'designation',
      },
      {
        Header: 'Department',
        accessor: 'department',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Phone',
        accessor: 'phone',
      },
      {
        Header: 'Actions',
        accessor: '_id',
        Cell: ({ value }) => (
          <div>
            <Button variant="contained" color="secondary" onClick={() => handleDelete(value)} style={{ backgroundColor: '#007bff', color: 'white', marginRight: '5px' }}>Delete</Button> {/* Apply Button style */}
            {/* Add Update button here */}
          </div>
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data: facultyData });

  return (
    <div>
      <style>
        {`
        .button-blue {
          background-color: #007bff;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
        }
        `}
      </style>
      <NavBar /> 
      <div>
        <Typography variant='h3' style={{  textAlign: 'center', marginTop: '100px' }}>Faculty Details</Typography> {/* Apply Typography style */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '20px' }}>
          {facultyData.map((faculty) => (
            <div key={faculty._id} style={{ border: '1px solid #ccc', borderRadius: '5px', width: '300px', margin: '10px', padding: '20px', display: 'flex', flexDirection: 'column' }}>
              <h2>{faculty.name}</h2>
              <p><strong>Designation:</strong> {faculty.designation}</p>
              <p><strong>Department:</strong> {faculty.department}</p>
              <p><strong>Email:</strong> {faculty.email}</p>
              <p><strong>Phone:</strong> {faculty.phone}</p>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'auto' }}>
                <button className="button-blue" onClick={() => handleDelete(faculty._id)}>Delete</button>
                {/* Add Update button here */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FacultyTable;
