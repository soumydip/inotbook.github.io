import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Alert from './Alert';  // Import Alert component
import './AllCostomCss.css'

function Signup() {
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);  // State for alerts

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,  // New state for agreeing to terms
  });

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCredentials({ ...credentials, [name]: type === "checkbox" ? checked : value });
  };

  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000);  // Alert will disappear after 3 seconds
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (credentials.password !== credentials.confirmPassword) {
      showAlert("Password and confirm password do not match", "danger");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/auth/newuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          name: credentials.name, 
          email: credentials.email, 
          password: credentials.password 
        }),
      });

      const json = await response.json();
      
      if (json.success) {
        localStorage.setItem('token', json.authToken);
        showAlert("Signup successful!", "success");
        navigate("/");  // Redirect on success
      } else {
        showAlert(json.error || "Invalid details provided", "danger");
      }
    } catch (error) {
      showAlert("Something went wrong. Please try again.", "danger");
    }
  };

  return (
    <div className="container about-container">
      <Alert alert={alert} />  {/* Show alert component */}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={credentials.name}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={credentials.email}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            value={credentials.confirmPassword}
            onChange={onChange}
          />
        </div>
        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="agree"
            name="agree"
            checked={credentials.agree}
            onChange={onChange}
          />
          <label className="form-check-label" htmlFor="agree">
            I agree to the Terms and Conditions
          </label>
        </div>
        <button 
          type="submit" 
          className="btn btn-primary" 
          //button is disble when chakebox,password,email not set his proper Conditions
          disabled={!credentials.agree || credentials.password.length < 5 || !/\S+@\S+\.\S+/.test(credentials.email)}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Signup;
