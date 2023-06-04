import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RegistrationForm } from "./components/registrationForm";
import { LogInForm } from "./components/loginForm";
import { UserHome } from "./components/userHome/UserHome";
export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LogInForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<LogInForm />} />
        <Route path="/UserHome" element={<UserHome />} />
      </Routes>
    </Router>
  );
};
