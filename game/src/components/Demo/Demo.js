import React from "react";
import Navbar from "../Navbar/Navbar";
import './Demo.css'

export default function Demo() {
  return (
    <div>
      <Navbar />
      <div className="demo-container">
        <video autoPlay controls>
          <source src="http://localhost:8081/video" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}
