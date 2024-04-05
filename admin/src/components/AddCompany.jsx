import React, { useState } from "react";
import axios from "axios";
import {
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Snackbar,
} from "@mui/material"; // Import Snackbar component from Material-UI
import NavBar from "./NavBar";

const AddCompanyForm = () => {
  const [companyData, setCompanyData] = useState({
    name: "",
    address: "",
    salary: "",
    description: "",
    status: "Not Available",
  });
  const [openAlert, setOpenAlert] = useState(false); // State for alert

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:9453/addcompany",
        companyData,
      );
      console.log(response.data);
      setOpenAlert(true); // Open alert upon successful submission
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  return (
    <>
      <NavBar />
      <form style={formStyle} onSubmit={handleSubmit}>
        <Typography variant="h3" style={{ marginTop: "200px" }}>
          Add Company
        </Typography>
        <br />
        <br />
        <div style={formGroupStyle}>
          <TextField
            label="Company Name"
            name="name"
            value={companyData.name}
            onChange={handleChange}
            required
            fullWidth
          />
        </div>
        <div style={formGroupStyle}>
          <TextField
            label="Company Address"
            name="address"
            value={companyData.address}
            onChange={handleChange}
            required
            fullWidth
          />
        </div>
        <div style={formGroupStyle}>
          <TextField
            label="Salary"
            name="salary"
            value={companyData.salary}
            onChange={handleChange}
            required
            fullWidth
          />
        </div>
        <div style={formGroupStyle}>
          <TextField
            label="Description"
            name="description"
            value={companyData.description}
            onChange={handleChange}
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
              onChange={handleChange}
              required
            >
              <MenuItem value="Available">Available</MenuItem>
              <MenuItem value="Not Available">Not Available</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <Button type="submit" variant="contained" color="primary">
            Add Company
          </Button>
        </div>
      </form>

      {/* Snackbar for alert */}
      <Snackbar
        open={openAlert}
        autoHideDuration={6000} // Adjust duration as needed
        onClose={handleCloseAlert}
        message="Company added successfully!"
        action={
          <Button color="inherit" size="small" onClick={handleCloseAlert}>
            Close
          </Button>
        }
      />
    </>
  );
};

// Styles (reuse the styles from the AddAlumniForm)
const formStyle = {
  maxWidth: "400px",
  margin: "auto",
};

const formGroupStyle = {
  marginBottom: "15px",
};

export default AddCompanyForm;
