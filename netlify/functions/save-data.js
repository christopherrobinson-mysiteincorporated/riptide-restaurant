 const { getStore } = require("@netlify/blobs");

module.exports = async (req) => {
  // Only allow POST requests for security
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    // 1. Parse the incoming JSON data from your portal
    const body = await req.json();
    
    // 2. Initialize the store (this automatically creates it if it doesn't exist)
    // 'restaurant-data' acts as the container for your stored items
    const store = getStore("restaurant-data");

    // 3. Save the data. 'menu-content' is the unique key for your data object
    await store.set("menu-content", JSON.stringify(body));

    // 4. Return success response
    return new Response(JSON.stringify({ message: "Successfully saved!" }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    // Log the error to your Netlify function logs for debugging
    console.error("Function error:", error);
    
    // Return a 500 error if something fails
    return new Response(JSON.stringify({ error: "Failed to save data" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
