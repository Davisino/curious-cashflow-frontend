import React, { useState } from "react";
import { postRegisterData } from "../api/postRegisterData";
import { useNavigate } from "react-router-dom";
import "../assets/Registration.css";
import "../assets/registrationForm.css";
export const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    businessName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await postRegisterData(
        `${process.env.REACT_APP_SERVER_URL}/api/register`,
        formData
      );
      console.log("Success post request, new client created: ", data);
      navigate("/login");
    } catch (error) {
      console.error("Error: ", error);
    }
  };
  const handleLoginRedirect = () => {
    navigate("/login");
  };
  return (
    <div className="register-container">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <label>
          Business Name:
          <input
            type="text"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <button className="btn-job" type="submit">
          Register
        </button>
        Have already an account?{" "}
        <a href="#" onClick={handleLoginRedirect}>
          Login
        </a>
      </form>
    </div>
  );
};
