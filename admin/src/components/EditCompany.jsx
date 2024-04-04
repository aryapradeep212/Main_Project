import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material'; // Import components from Material-UI
import NavBar from './NavBar';

const EditCompanyForm = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');
  const navigate = useNavigate();
  const [companyData, setCompanyData] = useState({
    name: '',
    address: '',
    salary: '',
    description: '',
    status: '',
  });

  useEffect(() => {
    fetchCompanyDetails();
  }, []);

  const fetchCompanyDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:9453/singlecompany/${id}`);
      setCompanyData(response.data);
    } catch (error) {
      console.error('Error fetching company details:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyData({ ...companyData, [name]: value });
  };

  const handleChange = (e) => { // Define handleChange function
    const { name, value } = e.target;
    setCompanyData({ ...companyData, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:9453/updatecompany/${id}`, companyData);
      alert('Company details updated successfully!');
      navigate('/company'); // Redirect to the company table after update
    } catch (error) {
      console.error('Error updating company details:', error);
    }
  };

  return (
    <>
      <NavBar />
      <div style={formStyle}>
        <Typography variant='h3' style={{ marginTop: '200px' }}>Edit Company Details</Typography><br /><br />
        <form onSubmit={handleUpdate}>
          <div style={formGroupStyle}>
            <TextField
              label="Name"
              name="name"
              value={companyData.name}
              onChange={handleInputChange}
              required
              fullWidth
            />
          </div>
          <div style={formGroupStyle}>
            <TextField
              label="Address"
              name="address"
              value={companyData.address}
              onChange={handleInputChange}
              required
              fullWidth
            />
          </div>
          <div style={formGroupStyle}>
            <TextField
              label="Salary"
              name="salary"
              value={companyData.salary}
              onChange={handleInputChange}
              required
              fullWidth
            />
          </div>
          <div style={formGroupStyle}>
            <TextField
              label="Description"
              name="description"
              value={companyData.description}
              onChange={handleInputChange}
              required
              fullWidth
            />
          </div>
          <div style={formGroupStyle}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                label="Status"
                name="status"
                value={companyData.status}
                onChange={handleChange} // Use handleChange function here
                required
              >
                <MenuItem value="Available">Available</MenuItem>
                <MenuItem value="Not Available">Not Available</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div>
            <Button type="submit" variant="contained" color="primary">Update</Button>
          </div>
        </form>
      </div>
    </>
  );
};

// Styles (reuse the styles from the AddCompanyForm)
const formStyle = {
  maxWidth: '400px',
  margin: 'auto',
};

const formGroupStyle = {
  marginBottom: '15px',
};

export default EditCompanyForm;
