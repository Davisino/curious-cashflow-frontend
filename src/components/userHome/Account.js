import React, { useState, useEffect } from "react";
import "../../assets/Account.css";
import { handleBusinessName } from "../../api/api";
export const Account = () => {
  const [user, setUser] = useState("");
  const [businessName, setBusinessName] = useState("");
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      credentials: "include",
      body: JSON.stringify({
        token: localStorage.getItem("token"),
        businessOwnerId: localStorage.getItem("businessOwnerId"),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      });
  }, []);
  const handleUpdateBusinessName = async () => {
    const body = {
      businessOwnerId: localStorage.getItem("businessOwnerId"),
      newBusinessName: businessName,
      token: localStorage.getItem("token"),
    };
    try {
      const data = await handleBusinessName(body);
      alert(data.message);
    } catch (error) {
      console.log("Failed to update business name:", error);
    }
  };
  const handleInputChange = (event) => {
    setBusinessName(event.target.value);
  };
  return (
    <div className="account-container">
      <div className="row-field">
        <h2>BusinessName:</h2>
        <input
          className="field-data"
          value={businessName}
          onChange={handleInputChange}
          placeholder={user.businessName}
        ></input>
        <button
          onClick={handleUpdateBusinessName}
          className="btn-job update-field"
        >
          update
        </button>
      </div>
      <div className="row-field">
        <h2>Password:</h2>
        <input className="field-data" placeholder="Current Password"></input>
        <input className="field-data" placeholder="New Password"></input>
        <button className="btn-job update-field"> update</button>
      </div>
    </div>
  );
};
