 const { getStore } = require("@netlify/blobs");

exports.handler = async (event) => {
  // 1. Only allow POST requests (prevents 405 errors)
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    // 2. Initialize the store
    const store = getStore("restaurant-data");
    
    // 3. Save the data
    await store.set("menu-content", event.body);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Success" })
    };
  } catch (error) {
    console.error("Function error:", error);
    return { statusCode: 500, body: error.message };
  }
};
