import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert"; 
import "./AllCostomCss.css";

function Login() {
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null); // State for alerts
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    agree: false,
  });

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCredentials({
      ...credentials,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000); // Alert will disappear after 3 seconds
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/api/auth/login", {  //call the API
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const json = await response.json();

      if (json.success) {
        localStorage.setItem("token", json.authToken);
        showAlert("Login successful!", "success");
        navigate("/"); // Redirect on success to home page
      } else {
        showAlert(json.error || "Invalid credentials", "danger");
      }
    } catch (error) {
      showAlert("Something went wrong. Please try again.", "danger");
    }
  };

  return (
    <div className="container login about-container">
      <center>
        <h1>
          Plese login first to use <i style={{ color: "red" }}>inotebook</i>
        </h1>
      </center>
      <Alert alert={alert} /> {/* Show alert component */}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
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
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
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
            <p>
              By signing up, you agree to our{" "}
              <a href="/terms">Terms and Conditions</a>.
            </p>
          </label>
        </div>
        <button
          type="submit"
          disabled={  //butoon is disbale when password length is not grater 
            //than 3 number and not a email not a email 
            !/\S+@\S+\.\S+/.test(credentials.email) ||
            credentials.password.length < 3 ||
            !credentials.agree
          }
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
