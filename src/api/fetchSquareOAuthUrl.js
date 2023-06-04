export const fetchSquareOAuthUrl = async () => {
  try {
    const response = await fetch("/api/square/oauth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({ token: localStorage.getItem("token") }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch the OAuth URL:", error);
    throw error;
  }
};
