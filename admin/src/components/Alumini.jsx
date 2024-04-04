import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from './NavBar'; // Import NavBar component
import { Typography } from '@mui/material';

const Alumini = () => {
  const [aluminiData, setAluminiData] = useState([]);

  useEffect(() => {
    fetchAluminiData();
  }, []);

  const fetchAluminiData = async () => {
    try {
      const response = await axios.get('http://localhost:9453/viewalumini');
      setAluminiData(response.data);
    } catch (error) {
      console.error('Error fetching alumini data:', error);
    }
  };

  const handleDelete = async (userId) => {
    console.log('Delete user with ID:', userId);
    try {
      const response = await axios.delete('http://localhost:9453/deletealumini/' + userId);
      window.location.reload();
    } catch (error) {
      console.error('Error fetching alumini data:', error);
    }
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
        `}
      </style>
      <NavBar /> 
      <div>
        <Typography variant='h3' style={{marginTop:'100px'}}>Alumini Details</Typography>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '20px' }}>
          {aluminiData.map((alumini) => (
            <div key={alumini._id} style={{ border: '1px solid #ccc', borderRadius: '5px', width: '300px', margin: '10px', padding: '20px', display: 'flex', flexDirection: 'column' }}>
              <h2>{alumini.name}</h2>
              <p><strong>Company:</strong> {alumini.company}</p>
              <p><strong>Department:</strong> {alumini.department}</p>
              <p><strong>Batch:</strong> {alumini.batch}</p>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'auto' }}>
                <button className="button-blue" onClick={() => handleDelete(alumini._id)}>Delete</button>
                {/* Add Update button here */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
    
  );
};

export default Alumini;
