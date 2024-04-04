import React from "react";
import "./landingpage.css";
import ApeXHire_landingpage from "../background/bgvideo.mp4";
import { Link } from "react-router-dom";
const Landingpage = () => {
  return (
    <div className="landingpage">
      <video src={ApeXHire_landingpage} autoPlay muted loop class="video-bg" />
      <div className="bg-overlay"></div>
      <div className="home-text">
        <h1>ApeXHire</h1>
        <p4>The Career You Need Is Here</p4>

        <div className="button-container">
          <button className="button primary-button"> 
            <Link
              to={"/login"}
              style={{ textDecoration: "none", color: "white" }}
            >
              Sign in
            </Link>
          </button>
          <button className="button secondary-button">
            <Link
              to={"/signup"}
              style={{ textDecoration: "none", color: "white" }}
            >
              Sign up
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landingpage;
