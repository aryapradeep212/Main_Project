import React, { useState } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import { Typography, TextField, Button } from '@mui/material'; // Import TextField and Button from Material-UI

const AddAlumniForm = () => {
  const [alumniData, setAlumniData] = useState({
    name: '',
    company: '',
    department: '',
    batch: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAlumniData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:9453/addalumini', alumniData);
      console.log(response.data);
      // Show alert after successful addition
      window.alert('Alumni added successfully!');
      // Clear the form fields after successful addition
      setAlumniData({
        name: '',
        company: '',
        department: '',
        batch: '',
      });
    } catch (error) {
      console.error(error.response.data);
      window.alert('Failed to add alumni. Please try again.');
    }
  };

  return (
    <>
      <NavBar />
      <form style={formStyle} onSubmit={handleSubmit}>
        <Typography variant='h3' style={{ marginTop: '200px' }}>Add Alumni</Typography><br /><br />
        <div style={formGroupStyle}>
          <TextField
            label="Alumni Name"
            name="name"
            value={alumniData.name}
            onChange={handleChange}
            required
            fullWidth
          />
        </div>
        <div style={formGroupStyle}>
          <TextField
            label="Company"
            name="company"
            value={alumniData.company}
            onChange={handleChange}
            required
            fullWidth
          />
        </div>
        <div style={formGroupStyle}>
          <TextField
            label="Department"
            name="department"
            value={alumniData.department}
            onChange={handleChange}
            required
            fullWidth
          />
        </div>
        <div style={formGroupStyle}>
          <TextField
            label="Batch"
            name="batch"
            value={alumniData.batch}
            onChange={handleChange}
            required
            fullWidth
          />
        </div>
        <div>
          <Button type="submit" variant="contained" color="primary">Add Alumni</Button>
        </div>
      </form>
    </>
  );
};

// Styles
const formStyle = {
  maxWidth: '400px',
  margin: 'auto',
};

const formGroupStyle = {
  marginBottom: '15px',
};

export default AddAlumniForm;
