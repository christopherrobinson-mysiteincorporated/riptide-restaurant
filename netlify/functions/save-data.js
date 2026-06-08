 const { getStore } = require("@netlify/blobs");

// Change 'module.exports = async' to this:
exports.handler = async (req) => {
  if (req.httpMethod !== "POST") { // Note: standard Netlify functions use httpMethod
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const body = JSON.parse(req.body);
    const store = getStore("restaurant-data");
    await store.set("menu-content", JSON.stringify(body));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Successfully saved!" })
    };
  } catch (error) {
    console.error("Function error:", error);
    return { statusCode: 500, body: "Failed to save data" };
  }
};
