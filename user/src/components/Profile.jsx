import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NavBar from "./NavBar";
import './Profile.css'; // Import CSS file for styling

const Profile = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dob: "", 
    department: "",
    phone: "",
    arrers:"",
   
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:9453/singleuser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser({
        ...response.data,
        dob: new Date(response.data.dob).toLocaleDateString() 
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("Failed to fetch user data. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <NavBar />
      <div className="profile-container"> {/* Apply profile-container class */}
        <div className="profile-card"> {/* Apply profile-card class */}
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p style={{ color: "red" }}>{error}</p>
          ) : (
            <>
              <h2>PROFILE PAGE</h2>
              <br />
              <h2>Name: {user.firstName} {user.lastName}</h2>
              <h4>Email: {user.email}</h4>
              <h3>Date of Birth: {user.dob}</h3>
              <h3>Department: {user.department}</h3>
              <h3>Phone: {user.phone}</h3>
              <h3>No. of Arrers: {user.arrers}</h3>
              <div className="profile-buttons"> {/* Apply profile-buttons class */}
                <Link to={"/edit"}>
                  <button className="edit-button">
                    Edit Profile
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
