import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from './NavBar'; // Import NavBar component
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const CompanyTable = () => {
  const [companyData, setCompanyData] = useState([]);

  useEffect(() => {
    fetchCompanyData();
  }, []);

  const fetchCompanyData = async () => {
    try {
      const response = await axios.get('http://localhost:9453/viewcompany');
      setCompanyData(response.data);
    } catch (error) {
      console.error('Error fetching company data:', error);
    }
  };

  const handleStatusChange = async (companyId) => {
    try {
      // Toggle the status between "Available" and "Not Available"
      const updatedData = companyData.map((company) =>
        company._id === companyId
          ? { ...company, status: company.status === 'Available' ? 'Not Available' : 'Available' }
          : company
      );
      const daa = updatedData.find((company) => company._id === companyId)
      console.log(daa)
      // Update the status in the backend
      await axios.put(`http://localhost:9453/updatecompany/${companyId}`, {
        status: updatedData.find((company) => company._id === companyId).status,
      });
      
      // Update the state to reflect the changes
      setCompanyData(updatedData);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDelete = async(userId) => {
    console.log('Delete user with ID:', userId);
    await axios.delete('http://localhost:9453/deletecompany/' + userId);
    window.location.reload()
  };

  return (
    <>
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

        .button {
          margin: 5px;
        }
        `}
      </style>
      <NavBar /> 
      <div>
        <Typography variant='h3' style={{marginTop:'100px'}}>Company Details</Typography>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '20px' }}>
          {companyData.map((company) => (
            <div key={company._id} style={{ border: '1px solid #ccc', borderRadius: '5px', width: '300px', margin: '10px', padding: '20px', display: 'flex', flexDirection: 'column' }}>
              <h2>{company.name}</h2>
              <p><strong>Address:</strong> {company.address}</p>
              <p><strong>Salary:</strong> {company.salary}</p>
              <p><strong>Status:</strong> {company.status}</p>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'auto' }}>
                <button className="button button-blue" onClick={() => handleStatusChange(company._id)}>
                  {company.status === 'Available' ? 'Available' : 'Not Available'}
                </button>
                <button className="button button-blue" onClick={() => handleDelete(company._id)}>Delete</button>
                <Link to={`/editcompany?id=${company._id}`}>
                  <button className="button button-blue">Update</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CompanyTable;
