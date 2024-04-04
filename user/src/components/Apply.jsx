import { useState, useEffect } from "react";
import { Box, Container, Grid, Typography, TextField, Button } from '@mui/material';
import NavBar from './NavBar';
import axios from 'axios';

const Apply = () => {
  const [user, setUser] = useState({
    reg_number: "",
    email: "",
    firstName: "",
    lastName: "",
    dob: "",
    department: "",
    phone: "",
    arrers: "",
  });

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put("http://localhost:9453/updateuser", user, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Applied successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:9453/singleuser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <>
      <NavBar />
      <Container style={{ textAlign: 'center', marginTop: '100px', fontSize: '18px' }}>
        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h2" sx={{ textAlign: 'center', mb: 2 }}>Apply</Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={user.firstName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={user.lastName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Date of Birth"
                  name="dob"
                  value={user.dob}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Department"
                  name="department"
                  value={user.department}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="No, of Arrers"
                  name="arrers"
                  value={user.arrers}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="CGPA"
                  name="CGPA"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit">
                 Apply
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </>
  );
}

export default Apply;
