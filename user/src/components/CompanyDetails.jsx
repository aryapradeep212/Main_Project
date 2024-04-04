// CompanyDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';


const CompanyDetails = () => {
  const { companyId } = useParams();
  const [companyDetails, setCompanyDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCompanyDetails() {
      try {
        const response = await axios.get(`http://localhost:9453/singlecompany/${companyId}`);
        setCompanyDetails(response.data);
      } catch (error) {
        console.error("Error fetching company details:", error);
        setError("Unable to fetch data. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    fetchCompanyDetails();
  }, [companyId]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px', fontSize: '18px' }}>
        <p>Loading company details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px', color: 'red', fontSize: '18px' }}>
        <p>{error}</p>
      </div>
    );
  }

  const goToApplyPage = () => {
    navigate('/apply'); // This should match the path you defined for the Apply component in your routes
  };

  return (
    <>
    <NavBar/>
    
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      
      <Paper elevation={3} style={{ padding: '20px', maxWidth: '1000px', textAlign: 'center' }}>
        {loading && <CircularProgress style={{ margin: '50px' }} />}
        {error && (
          <Typography variant="h6" style={{ color: 'red', margin: '20px' }}>
            {error}
          </Typography>
        )}
        {companyDetails && (
          <>
            <Typography variant="h4" style={{ marginBottom: '20px' }}>
              {companyDetails.name}
            </Typography>
            <Typography variant="body1" style={{ marginBottom: '10px' }}>
              Address: {companyDetails.address}
            </Typography>
            <Typography variant="body1" style={{ marginBottom: '10px' }}>
              Salary: {companyDetails.salary}
            </Typography>
            <Typography variant="body1" style={{ marginBottom: '10px' }}>
              Description: {companyDetails.description}
            </Typography>
            <Button
      size="small"
      disabled={companyDetails.status === 'Not Available'}
      onClick={goToApplyPage} // Add the onClick event handler here
    >
      Apply
    </Button>
          </>
        )}
      </Paper>
    </div>
    </>
  );
};

export default CompanyDetails;
