import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ADMIN_EMAIL = 'admin@gmail.com';
const ADMIN_PASSWORD = 'admin';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const isAdmin = () => email === ADMIN_EMAIL && password === ADMIN_PASSWORD;

  const validateInputs = () => {
    let errorMessages = {};
    if (!email) errorMessages.email = 'Email should not be empty';
    if (!password) errorMessages.password = 'Password should not be empty';
    setErrors(errorMessages);
    return Object.keys(errorMessages).length === 0;
  };

  const authenticateUser = () => {
    axios
      .post('http://localhost:8081/login', { email, password })
      .then((res) => {
        if (res.data.Status === 'Success') {
          navigate('/home');
        } else {
          navigate('/register');
          alert('Invalid Credentials. Please Register.');
        }
      })
      .catch((err) => {
        console.log(err);
        alert('An error occurred during login.');
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isAdmin()) {
      navigate('/home');
      return;
    }
    if (validateInputs()) {
      authenticateUser();
    }
  };

  return (
    <>
      <div className='d-flex justify-content-center align-items-center p-4 w-100 loginHead'>
      </div>
      <br />
      <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
        <div className='p-4 rounded w-25 loginForm'>
          <form onSubmit={handleSubmit}>
            <center>
              <strong>Hey hurry up and login now!!</strong>
            </center><br />
            <div className='mb-3'>
              <input
                type='text'
                id='email'
                placeholder='Enter Email'
                value={email}
                onChange={handleEmailChange}
                className='form-control rounded-0'
                autoComplete='off'
              />
              {errors.email && <span className='text-danger'>{errors.email}</span>}
            </div>
            <div className='mb-3'>
              <input
                type='password'
                id='password'
                placeholder='Enter Password'
                value={password}
                onChange={handlePasswordChange}
                className='form-control rounded-0'
              />
              {errors.password && <span className='text-danger'>{errors.password}</span>}
            </div>
            <div className='row'>
              <div className='col-4'>
                <button type='submit' id='loginButton' className='btn btn-success w-100 rounded-0'>
                  Log in
                </button>
              </div>
              <div className='col-4'>
                <Link to='/register' type='button' id='signupLink' className='btn btn-primary rounded-0'>
                  Sign up
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

export default Login;
