import React, { useState } from "react";
import { createPayment, createJob } from "../../api/api";
import "../../assets/NewJobPopUp.css";
export const NewJobPopUp = ({ addNewJob, closeNewJobForm }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [totalCost, setTotalCost] = useState("");
  const businessOwnerId = localStorage.getItem("businessOwnerId");

  const handleSubmit = (event) => {
    event.preventDefault();

    // construct the data to be sent
    const newJobData = {
      businessOwnerId,
      title,
      description,
      clientName,
      clientEmail,
      clientPhone,
      totalCost,
    };

    createPayment(newJobData)
      .then((data) => {
        // Now make a POST request to your server to save the job in the MongoDB database
        const payments = data.payment;
        const jobData = {
          ...newJobData,
          createdAt: payments.createdAt,
          status: payments.status,
          sourceType: payments.sourceType,
          orderID: payments.orderID,
          receiptUrl: payments.receiptUrl,
        };
        return createJob(jobData);
      })
      .then((data) => {
        addNewJob(data);
      })
      .catch((error) => {
        console.error("An error occurred while submitting the form:", error);
      });
  };

  const handleOverlayClick = (event) => {
    if (event.target.className === "popup-overlay") {
      closeNewJobForm();
    }
  };

  return (
    <div className="popup-overlay" onClick={handleOverlayClick}>
      <form className="popup-content" onSubmit={handleSubmit}>
        <h2>Transaccion Details</h2>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          Client Name:
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            required
          />
        </label>
        <label>
          Client Email:
          <input
            type="text"
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
          />
        </label>
        <label>
          Client Phone:
          <input
            type="text"
            value={clientPhone}
            onChange={(e) => setClientPhone(e.target.value)}
          />
        </label>
        <label>
          totalCost:
          <input
            type="number"
            value={totalCost}
            onChange={(e) => setTotalCost(e.target.value)}
            min={1}
            required
          />
        </label>
        <button className="btn-job" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};
