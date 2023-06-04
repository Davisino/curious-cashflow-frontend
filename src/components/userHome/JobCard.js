// JobCard.js
import React, { useState } from "react";
import "../../assets/JobCard.css";

const JobCard = ({ job, idx, onDelete }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const handleToggle = () => {
    if (showModal) {
      setShowModal(false);
      setSelectedJob(null);
    } else {
      setSelectedJob(job);
      setShowModal(true);
    }
  };

  const onDeleteClick = async () => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this job?"
    );
    if (!confirmation) return;
    onDelete(job._id); // call the onDelete function passed as prop
  };
  return (
    <div className="jobs-container">
      <div className="job-card" onClick={handleToggle}>
        <div>
          <p>{idx + 1}</p>
        </div>
        <div>
          <p>{job.title}</p>
        </div>
        <div>
          <p>{job.description}</p>
        </div>
        <div>
          <p style={{ paddingLeft: 5 }}>{job.totalCost}£</p>
        </div>
      </div>
      {showModal && selectedJob && (
        <div className="modal">
          <h3>Transaction & Payment Information</h3>
          <p>
            <span>Customer Name:</span> {job.clientName}
          </p>
          <p>
            <span>Customer Email:</span> {job.clientEmail}
          </p>
          <p>
            <span>Customer Phone:</span> {job.clientPhone}
          </p>

          <p>
            <span>Total:</span> {job.totalCost}£
          </p>
          <p>
            <span>Paid By: </span>
            {job.sourceType}
          </p>

          <p>
            <span>Transaction made:</span> {job.createdAt.slice(0, 10)}
          </p>
          <p>
            <span>View Receipt: </span>
            <a href={job.receiptUrl}>Click</a>
          </p>
          <button className="btn-job" onClick={onDeleteClick}>
            Delete Transaction
          </button>
        </div>
      )}
    </div>
  );
};
export default JobCard;
