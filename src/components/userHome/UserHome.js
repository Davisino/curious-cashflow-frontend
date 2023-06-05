import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import "../../assets/UserHome.css";
import { handleDeleteJob } from "../../api/api"; // Import the function
import { Account } from "./Account";
import { History } from "./History";
import { Profit } from "./Profit";
import { Jobs } from "./Jobs";
export const UserHome = () => {
  const [error, setError] = useState(null);
  const [jobs, setJobs] = useState([]); // This will hold the jobs data
  const [showPopup, setShowPopup] = useState(false);
  const [activeComponent, setActiveComponent] = useState("jobs");

  const navigate = useNavigate();
  const businessOwnerId = localStorage.getItem("businessOwnerId");
  const userSquareAccessToken = localStorage.getItem("squareAccessToken");
  useEffect(() => {
    if (userSquareAccessToken === null || userSquareAccessToken === false) {
      const userConsent = window.confirm(
        "You need to connect your Square account to continue. Press OK to do that now."
      );
      if (userConsent) {
        fetch(`${process.env.REACT_APP_SERVER_URL}/api/square/oauth`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          credentials: "include",
          body: JSON.stringify({
            token: localStorage.getItem("token"),
            businessOwnerId,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            window.location.href = data.authorizeUrl;
            localStorage.setItem("squareAccessToken", "true");
          });
      }
    }
  }); // Add an empty array here

  const fetchJobs = () => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      credentials: "include",
      body: JSON.stringify({ businessOwnerId }), // pass the businessOwnerID
    })
      .then((response) => response.json())
      .then((data) => {
        setJobs(data);
      })
      .catch((error) => {
        setError(error);
      });
  };

  useEffect(() => {
    fetchJobs();
  });

  const handleJobDelete = async (id) => {
    try {
      await handleDeleteJob(id);
      fetchJobs(); // Refresh job list after successful deletion
    } catch (error) {
      console.error("Failed to delete job:", error);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("businessOwnerId");
    localStorage.removeItem("squareAccessToken");
    navigate("/login");
  };

  const addNewJob = (newJob) => {
    const intCost = Number(newJob.totalCost);
    newJob.totalCost = intCost;
    setJobs([...jobs, newJob]);
    setShowPopup(false);
  };

  const closeNewJobForm = () => {
    setShowPopup(false);
  };

  const handleNavClick = (component) => {
    setActiveComponent(component);
  };
  const renderComponent = () => {
    switch (activeComponent) {
      case "account":
        return <Account />;
      case "jobs":
        return (
          <Jobs
            jobs={jobs}
            handleJobDelete={handleJobDelete}
            setShowPopup={setShowPopup}
            showPopup={showPopup}
            addNewJob={addNewJob}
            closeNewJobForm={closeNewJobForm}
          />
        );
      case "history":
        return <History jobs={jobs} />;
      case "profit":
        return <Profit jobs={jobs} />;
      default:
        return null;
    }
  };

  if (error) {
    navigate("/login");
  }
  return (
    <div className="container">
      <div className="nav-column">
        <NavBar handleNavClick={handleNavClick} handleLogout={handleLogout} />
      </div>
      {renderComponent()}
    </div>
  );
};
