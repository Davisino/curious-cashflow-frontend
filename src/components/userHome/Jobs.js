// Jobs.js
import React, { useState } from "react";
import JobCard from "./JobCard";
import { NewJobPopUp } from "./NewJobPopUp";
import "../../assets/Jobs.css";
export const Jobs = ({
  jobs,
  handleJobDelete,
  setShowPopup,
  showPopup,
  addNewJob,
  closeNewJobForm,
}) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleSort = (option) => {
    setShowOptions(false);
    if (option === "Ascending") {
      jobs.sort((a, b) => Number(a.totalCost) - Number(b.totalCost));
    } else if (option === "Descending") {
      jobs.sort((a, b) => Number(b.totalCost) - Number(a.totalCost));
    } else if (option === "Latest") {
      jobs.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (option === "Newest") {
      jobs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
  };
  return (
    <div className="main-column">
      <div className="titleTableContainer">
        <h2>Your Jobs</h2>
        <button
          className="btn-job"
          style={{ marginRight: "15px" }}
          onClick={() => setShowPopup(true)}
        >
          Add new job
        </button>
        <div className="dropdown">
          <button
            className="dropbt btn-job"
            onClick={() => setShowOptions(!showOptions)}
          >
            Sort By
          </button>
          {showOptions && (
            <div className="dropdown-content">
              <span onClick={() => handleSort("Ascending")}>
                Ascending (Price)
              </span>
              <span onClick={() => handleSort("Descending")}>
                Descending (Price)
              </span>
              <span onClick={() => handleSort("Latest")}>Latest (Date)</span>
              <span onClick={() => handleSort("Newest")}>Newest (Date)</span>
            </div>
          )}
        </div>
      </div>

      <div className="rowTableContainer">
        <div className="rowTitles">
          <div>ID</div>
          <div>Title</div>
          <div>Description</div>
          <div style={{ paddingLeft: 5, borderRight: 0 }}>Cost</div>
        </div>

        {jobs.map((job, idx) => (
          <JobCard key={idx} job={job} idx={idx} onDelete={handleJobDelete} />
        ))}
      </div>

      {showPopup && (
        <NewJobPopUp addNewJob={addNewJob} closeNewJobForm={closeNewJobForm} />
      )}
    </div>
  );
};
