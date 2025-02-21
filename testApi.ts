fetch("http://157.180.16.228/auth/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    phoneNumber: "07713630215",
    password: "11111111", // Replace with the actual password
  }),
})
  .then((response) => {
    console.log("Response Status:", response.status); // Log status code
    return response.text(); // Get response as text
  })
  .then((text) => {
    if (text.includes("<html>")) {
      // Check if it's an HTML error page
      throw new Error("Received an HTML response instead of JSON");
    }
    console.log("Response Text:", text);
    return JSON.parse(text); // Parse JSON if valid
  })
  .then((data) => console.log("Login Success:", data))
  .catch((error) => console.error("Error:", error));
