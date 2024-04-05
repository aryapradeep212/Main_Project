import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import styles from "./AluminiList.module.css";
import Typography from "@mui/material/Typography";

const AluminiList = () => {
  const [aluminiList, setAluminiList] = useState([]);

  useEffect(() => {
    async function fetchAlumini() {
      try {
        const response = await axios.get("http://localhost:9453/viewalumini");
        setAluminiList(response.data);
      } catch (error) {
        console.error("Error fetching alumini details:", error);
      }
    }

    fetchAlumini();
  }, []);

  return (
    <>
      <NavBar />
      <Typography variant="h3" style={{ marginTop: "100px" }}>
        Alumini
      </Typography>
      <div
        className={styles.container}
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "150px",
          justifyContent: "center",
          padding: "60px",
          marginTop: "10px",
        }}
      >
        {aluminiList.map((alumini) => (
          <div key={alumini._id} className={styles.card}>
            <h3 className={styles.title}>{alumini.name}</h3>
            <p className={styles.detail}>Company: {alumini.company}</p>
            <p className={styles.detail}>Department: {alumini.department}</p>
            <p className={styles.detail}>Batch: {alumini.batch}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default AluminiList;
