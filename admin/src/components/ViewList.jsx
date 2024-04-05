import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import { Typography } from '@mui/material';

const List = () => {
  const [listData, setListData] = useState([]);

  useEffect(() => {
    fetchlistData();
  }, []);

  const fetchlistData = async () => {
    try {
      const response = await axios.get('http://localhost:9453/viewreg/' );
      setListData(response.data);
    } catch (error) {
      console.error('Error fetching List data:', error);
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
        <Typography variant='h3' style={{marginTop:'100px'}}>List Details</Typography>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '20px' }}>
          {listData.map((lis) => (
            <div key={lis._id} style={{ border: '1px solid #ccc', borderRadius: '5px', width: '300px', margin: '10px', padding: '20px', display: 'flex', flexDirection: 'column' }}>
              <h2>{lis.name}</h2>
              <p><strong>Company:</strong> {lis.company}</p>
              <p><strong>Department:</strong> {lis.department}</p>
              <p><strong>Batch:</strong> {lis.batch}</p>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'auto' }}>
                <button className="button-blue" onClick={() => handleDelete(lis._id)}>Delete</button>
                {/* Add Update button here */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
    
  );
};

export default List;
