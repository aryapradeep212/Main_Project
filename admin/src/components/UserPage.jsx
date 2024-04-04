import React, { useEffect, useState } from 'react';
import { Button, Typography } from '@mui/material';
import axios from 'axios';
import NavBar from './NavBar';

const UserPage = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('http://localhost:9453/viewuser');
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleDelete = async (userId) => {
    console.log('Delete user with ID:', userId);
    try {
      await axios.delete(`http://localhost:9453/deleteuser/${userId}`);
      // Remove the deleted user from the state
      setUserData(userData.filter(user => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <NavBar />
      <div style={{ textAlign: 'center', marginTop: '120px' }}>
        <Typography variant="h3" gutterBottom>User Details</Typography>
        <div className="user-container">
          {userData.map(user => (
            <div key={user._id} className="user-card">
              <h2>{user.firstName} {user.lastName}</h2>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Registration Number:</strong> {user.reg_number}</p>
              <p><strong>Department:</strong> {user.department}</p>
              <p><strong>Phone:</strong> {user.phone}</p>
              <div className="user-actions">
                <Button variant="contained" color="secondary" onClick={() => handleDelete(user._id)}>Delete</Button>
                {/* Add Update button here */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
