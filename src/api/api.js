export async function createPayment(data) {
  return await fetch(`${process.env.REACT_APP_SERVER_URL}/api/payments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    credentials: "include",
    body: JSON.stringify(data),
  }).then((response) => response.json());
}

export async function createJob(data) {
  return await fetch(`${process.env.REACT_APP_SERVER_URL}/job`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    credentials: "include",
    body: JSON.stringify(data),
  }).then((response) => response.json());
}

export const handleDeleteJob = async (jobId) => {
  const response = await fetch(`${process.REACT_APP_SERVER_URL}/job/${jobId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    credentials: "include",
  });

  if (!response.ok) {
    // Handle error
    throw new Error("Error deleting job");
  }
};

export async function handleBusinessName(data) {
  return await fetch(`${process.env.REACT_APP_SERVER_URL}/user`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    credentials: "include",
    body: JSON.stringify(data),
  }).then((response) => response.json());
}
