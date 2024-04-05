import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./SignUp.module.css";

const Signup = () => {
  const [data, setData] = useState({
    reg_number: "",
    firstName: "",
    lastName: "",
    dob: "",
    department: "",
    email: "",
    phone: "",
    arrers: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  // Define the list of departments
  const departments = [
    "Computer Engineering",
    "Electronics and Communication Engineering",
    "Mechanical Engineering",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCheckboxChange = () => {
    setIsChecked((prevChecked) => !prevChecked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation checks
    if (!isChecked) {
      setError("Please accept the terms and conditions.");
      return;
    }

    if (data.password !== data.confirmPassword) {
      setError("Password and confirm password do not match.");
      return;
    }
    setError("");

    // Making an HTTP request using axios
    try {
      const response = await axios.post("http://localhost:9453/register", data);
      console.log(response.data);
      if (response.data.status === "ok") {
        alert("Registration successful. Please login.");
        window.localStorage.setItem("token", response.data.data);
        window.location.href = "/login";
      } else if (response.data.status === "User Exists") {
        alert("Invalid email. Please check your email.");
      } else if (
        response.status === 400 ||
        response.data.error === "User Exists"
      ) {
        alert("User already exists. Please login.");
      }
    } catch (error) {
      console.log(error);
      setError("An error occurred. Please try again.");
    }
  };

  // JSX for the component
  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.left}>
          <h1>Welcome Back</h1>
          <Link to="/login">
            <button type="button" className={styles.white_btn}>
              Sign in
            </button>
          </Link>
        </div>
        <div className={styles.right}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              onChange={handleChange}
              value={data.firstName}
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              onChange={handleChange}
              value={data.lastName}
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Register No."
              name="reg_number"
              onChange={handleChange}
              value={data.reg_number}
              required
              className={styles.input}
            />
            <input
              type="Date"
              placeholder="Date of Birth"
              name="dob"
              onChange={handleChange}
              value={data.dob}
              required
              className={styles.input}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className={styles.input}
            />
            <select
              name="department"
              placeholder="Department"
              onChange={handleChange}
              value={data.department}
              required
              className={styles.input}
            >
              <option value="" disabled>
                Select Department
              </option>
              {departments.map((dept, index) => (
                <option key={index} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Phone Number"
              name="phone"
              onChange={handleChange}
              value={data.phone}
              required
              className={styles.input}
            />
            <input
              type="number"
              placeholder="No. of Arrears"
              name="arrers"
              onChange={handleChange}
              value={data.arrers}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={handleChange}
              value={data.confirmPassword}
              required
              className={styles.input}
            />
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                I accept the terms and conditions
              </label>
            </div>
            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className={styles.green_btn}>
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
