import React, { useState } from "react";
import './AllCostomCss.css'

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
    agree: false,
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    description: "",
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validate = () => {
    const newErrors = {
      name: "",
      email: "",
      description: "",
    };

    if (formData.name.length < 5) {
      newErrors.name = "Name must be at least 5 characters long.";
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please provide a valid email.";
    }
    if (formData.description.length < 5) {
      newErrors.description = "Description must be at least 5 characters long.";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {  // Validate the form
      // If validation passes, reset form
      setFormData({
        name: "",
        email: "",
        description: "",
        agree: false,
      });
      setErrors({ name: "", email: "", description: "" }); // Clear errors
    }
  };

  return (
    <>
      {Object.values(errors).some((error) => error) && (
        <div className="alert alert-danger" role="alert">
          {Object.values(errors)
            .filter((error) => error)
            .map((error, index) => (
              <div key={index}>{error}</div>
            ))}
        </div>
      )}
      <div className="container mt-5 about-container">
        <h1 className="text-center mb-4">Contact Us</h1>
        
        <form className="needs-validation" noValidate onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              rows="3"
              required
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <button
            className="btn btn-primary"
            type="submit"
          >
            Submit form
          </button>
          <button
            className="btn btn-primary mx-4"
            type="reset"
            onClick={() => setFormData({ name: "", email: "", description: "", agree: false })}
          >
            Reset
          </button>
        </form>
      </div>
    </>
  );
}

export default ContactUs;
