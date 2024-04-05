import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Landingpage from "./components/Landingpage";
import Login from "./components/index";
import Signup from "./components/Signup";
import HomePage from "./components/Home";
import Company from "./components/Company";
import NavBar from "./components/NavBar";
import CompanyDetails from "./components/CompanyDetails";
import AluminiList from "./components/AluminiList";
import FacultyList from "./components/FacultyList";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import Apply from "./components/Apply";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/company" element={<Company />} />
        <Route path="/company/:companyId" element={<CompanyDetails />} />
        <Route path="/alumini" element={<AluminiList />} />
        <Route path="/faculty" element={<FacultyList />} />
        <Route path="/pro" element={<Profile />} />
        <Route path="/navbar" element={<NavBar />} />
        <Route path="/edit" element={<EditProfile />} />
        <Route path="/apply" element={<Apply />} />
      </Routes>
    </div>
  );
}

export default App;
