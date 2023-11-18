import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import Nav from "../Navigation/nav";
import "../../App.css";

const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASSWORD = "admin";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const [userId, setuserId] = useState(null);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const isAdmin = () => email === ADMIN_EMAIL && password === ADMIN_PASSWORD;

  const validateInputs = () => {
    let errorMessages = {};
    if (!email) errorMessages.email = "Email should not be empty";
    if (!password) errorMessages.password = "Password should not be empty";
    setErrors(errorMessages);
    return Object.keys(errorMessages).length === 0;
  };

  const authenticateUser = () => {
    axios
      .post("http://localhost:8081/login", { email, password })
      .then((res) => {
        if (res.data.status === "Success") {
          const userId = res.data.userId;
          localStorage.setItem("userId", userId); // Store userId in localStorage
          setuserId(userId); // Store userId in component state
          console.log("userId ID:", userId); // Log userId for users
          navigate("/home");
        } else {
          navigate("/register");
          alert("Invalid Credentials. Please Register.");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("An error occurred during login.");
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isAdmin()) {
      navigate("/home");
      return;
    }
    if (validateInputs()) {
      authenticateUser();
    }
  };

  return (
    <div className="loginPage">
      <Nav />
      <div className="d-flex justify-content-center align-items-center mt-5 ">
        <div className="p-4 rounded w-25 text-white loginForm">
          <form onSubmit={handleSubmit}>
            <center>
              <strong>Hey Hurry up and login to play now!!</strong>
            </center>
            <br />
            <div className="mb-3">
              <input
                type="text"
                id="email"
                placeholder="Enter Email"
                value={email}
                onChange={handleEmailChange}
                className="form-control rounded-1"
                autoComplete="off"
              />
              {errors.email && (
                <span className="text-danger">{errors.email}</span>
              )}
            </div>
            <div className="mb-3">
              <input
                type="password"
                id="password"
                placeholder="Enter Password"
                value={password}
                onChange={handlePasswordChange}
                className="form-control rounded-1"
              />
              {errors.password && (
                <span className="text-danger">{errors.password}</span>
              )}
            </div>
            <div className="d-flex justify-content-between">
              <div>
                <button
                  type="submit"
                  id="loginButton"
                  className="btn btn-success rounded-2"
                  style={{ backgroundColor: "#FA7070", border: "none" }}
                >
                  Log in
                </button>
              </div>
              <div>
                <Link
                  to="/register"
                  type="button"
                  id="signupLink"
                  className="btn btn-primary rounded-2"
                >
                  Sign up
                </Link>
              </div>
              <Outlet />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
