// CompanyCard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import placement from '../background/company.jpeg';
import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';

const CompanyCard = () => {
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCompanies() {
      try {
        const response = await axios.get('http://localhost:9453/viewcompany');
        setCompanies(response.data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    }

    fetchCompanies();
  }, []);

  const goToApplyPage = () => {
    navigate('/apply'); // This should match the path you defined for the Apply component in your routes
  };

  return (
    <>
    <NavBar/>
    <Typography variant='h3' style={{ marginTop: "100px" }}>Company</Typography>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '150px', justifyContent: 'center', padding: '20px', marginTop: '10px' }}>
      
        {companies.map((company) => (
          <Card key={company._id} sx={{ maxWidth: 400 }}>
            <CardMedia
              component="img"
              height="140"
              image={placement}
              alt="Placement"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {company.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {company.address}
              </Typography>
            </CardContent>
            <CardActions>
              <Link to={`/company/${company._id}`} style={{ textDecoration: 'none' }}>
                <Button size="small">Learn More</Button>
              </Link>
              <Button
              size="small"
              disabled={company.status === 'Not Available'}
              onClick={goToApplyPage} // Add the onClick event handler here
            >
              Apply
            </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </>
  );
};

export default CompanyCard;
