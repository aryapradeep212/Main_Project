import React, { useState } from "react";
import axios from "axios";
import {
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material"; // Import Dialog for alert dialog
import NavBar from "./NavBar";

const AddFacultyForm = () => {
  const [facultyData, setFacultyData] = useState({
    name: "",
    designation: "",
    department: "",
    email: "",
    phone: "",
  });
  const [openAlert, setOpenAlert] = useState(false); // State for alert dialog

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFacultyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:9453/addfaculty",
        facultyData,
      );
      console.log(response.data);
      setOpenAlert(true); // Open alert dialog upon successful submission
      // You can perform other actions here such as clearing the form
    } catch (error) {
      console.error(error.response.data);
      // Handle error, e.g., show an error message to the user
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
          Add Faculty
        </Typography>
        <br />
        <br />
        <div style={formGroupStyle}>
          <TextField
            label="Name"
            name="name"
            value={facultyData.name}
            onChange={handleChange}
            required
            fullWidth
          />
        </div>
        <div style={formGroupStyle}>
          <TextField
            label="Designation"
            name="designation"
            value={facultyData.designation}
            onChange={handleChange}
            required
            fullWidth
          />
        </div>
        <div style={formGroupStyle}>
          <TextField
            label="Department"
            name="department"
            value={facultyData.department}
            onChange={handleChange}
            required
            fullWidth
          />
        </div>
        <div style={formGroupStyle}>
          <TextField
            label="Email"
            name="email"
            type="email"
            value={facultyData.email}
            onChange={handleChange}
            required
            fullWidth
          />
        </div>
        <div style={formGroupStyle}>
          <TextField
            label="Phone"
            name="phone"
            type="tel"
            value={facultyData.phone}
            onChange={handleChange}
            required
            fullWidth
          />
        </div>
        <div>
          <Button type="submit" variant="contained" color="primary">
            Add Faculty
          </Button>
        </div>
      </form>

      {/* Alert Dialog */}
      <Dialog open={openAlert} onClose={handleCloseAlert}>
        <DialogTitle>Faculty Added</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Faculty has been successfully added.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAlert} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

// Styles
const formStyle = {
  maxWidth: "400px",
  margin: "auto",
  marginTop: "50px",
};

const formGroupStyle = {
  marginBottom: "15px",
};

export default AddFacultyForm;
