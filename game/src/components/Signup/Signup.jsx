import React, { useState } from "react";
import axios from "axios";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "../../App.css";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_PATTERN =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const USERNAME_PATTERN = /^[a-zA-Z0-9]{3,}$/;

function Signup() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const validateInputs = () => {
    let newErrors = {};
    if (!email) {
      newErrors.email = "Email should not be empty";
    } else if (!EMAIL_PATTERN.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password) {
      newErrors.password = "Password should not be empty";
    } else if (!PASSWORD_PATTERN.test(password)) {
      newErrors.password =
        "Password must be at least 8 characters long and include special characters, uppercase and lowercase letters, and numbers";
    }

    if (!username) {
      newErrors.username = "Username should not be empty";
    } else if (!USERNAME_PATTERN.test(username)) {
      newErrors.username =
        "Username must be at least 3 characters long and can only contain alphanumeric characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const registerUser = () => {
    axios
      .post("http://localhost:8081/signup", { name, username, email, password })
      .then((res) => {
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        alert("An error occurred during signup.");
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateInputs()) {
      registerUser();
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center text-white SignupPage">
        <div className=" d-flex flex-column align-items-center rounded w-25 mt-5 signupForm">
          <strong className=" my-3">Register</strong>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                id="name"
                placeholder="Enter name"
                value={name}
                onChange={handleNameChange}
                className="form-control rounded-1"
                autoComplete="off"
              />
              {errors.name && (
                <span className="text-danger">{errors.name}</span>
              )}
            </div>

            <div className="mb-3">
              <input
                type="text"
                id="username"
                placeholder="Enter Username"
                value={username}
                onChange={handleUsernameChange}
                className="form-control rounded-1"
                autoComplete="off"
              />
              {errors.username && (
                <span className="text-danger">{errors.username}</span>
              )}
            </div>

            <div className="mb-3">
              <input
                type="email"
                id="email"
                placeholder="Enter email"
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

            <div>
              <div className="col">
                <button
                  type="submit"
                  id="loginButton"
                  className="btn btn-success w-100 rounded-1"
                  style={{ backgroundColor: "#FA7070", border: "none" }}
                >
                  Submit
                </button>
              </div>
              <div className="d-flex justify-content-center text-white my-2">
                Already a user?
              </div>
              <div className="d-flex justify-content-center">
                <Link
                  to="/login"
                  type="button"
                  id="signupLink"
                  className="btn btn-primary rounded-1"
                >
                  Login
                </Link>
              </div>
              <Outlet />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
