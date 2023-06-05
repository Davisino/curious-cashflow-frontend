import React, { useState } from "react";
import { postLogInData } from "../api/postLogInData";
import { useNavigate } from "react-router-dom";
import "../assets/loginForm.css";
export const LogInForm = () => {
  const [formData, setFormData] = useState({
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
      const data = await postLogInData(
        `${process.env.REACT_APP_SERVER_URL}/api/login`,
        formData
      );
      console.log("Success get request, owner data: ", data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("businessOwnerId", data.user.id);
      navigate("/UserHome");
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const handleRegisterPage = () => {
    navigate("/register");
  };
  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
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
          Login
        </button>
        Don't have an account?{" "}
        <span
          style={{ borderBottom: "solid 2px blue" }}
          onClick={handleRegisterPage}
        >
          Register!
        </span>
      </form>
    </div>
  );
};
