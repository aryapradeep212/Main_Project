import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const AdminLog = () => {
  const [data_, setData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data_, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:9453/adminlogin", data_)
      .then((response) => {
        console.log(response.data.status);
		if(response.data.status === "ok") {
			alert("Login Successful");
			localStorage.setItem("token", response.data.data)
			window.location.href = "/home"
		}
      })
      .catch((error) => {
		if (error.response || error.response.status || error.response.status === 403) {
			alert("Access Denied");
		  }
		  if (error.response || error.response.status || error.response.status === 401) {
			alert("Invalid Credentials!");
		  }
      });
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Admin Login</h1>
            <input
              type="String"
              placeholder="Username"
              name="username"
              onChange={handleChange}
              value={data_.username}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data_.password}
              required
              className={styles.input}
            />
            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className={styles.green_btn}>
              Sign in
            </button>
            <button
              onClick={() =>
                (window.location.href = "http://localhost:3000/login")
              }
              className={styles.green_btn}
            >
              User login
            </button>
          </form>
        </div>
        {/* <div className={styles.right}>
          <h1>User Signin</h1>
          <Link to="/login">
            <button type="button" className={styles.white_btn}>
              Sign Up
            </button>
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default AdminLog;
