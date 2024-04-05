import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import Typography from "@mui/material/Typography";
import styles from "./AluminiList.module.css";

const FacultyList = () => {
  const [facultyList, setFacultyList] = useState([]);

  useEffect(() => {
    async function fetchFaculty() {
      try {
        const response = await axios.get("http://localhost:9453/viewfaculty");
        setFacultyList(response.data);
      } catch (error) {
        console.error("Error fetching faculty details:", error);
      }
    }

    fetchFaculty();
  }, []);

  return (
    <>
      <NavBar />
      <Typography variant="h3" style={{ marginTop: "100px" }}>
        Faculty
      </Typography>
      <div className={styles.container}>
        {facultyList.map((faculty) => (
          <div key={faculty._id} className={styles.card}>
            <h3 className={styles.title}>{faculty.name}</h3>
            <p className={styles.detail}>Designation: {faculty.designation}</p>
            <p className={styles.detail}>Department: {faculty.department}</p>
            <p className={styles.detail}>Email: {faculty.email}</p>
            <p className={styles.detail}>Phone: {faculty.phone}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default FacultyList;
