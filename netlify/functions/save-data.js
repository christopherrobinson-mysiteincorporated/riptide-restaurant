 exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };

  try {
    const data = JSON.parse(event.body);
    const response = await fetch(process.env.DATABASE_URL + "/rest/v1/gallery_layouts", {
      method: "POST",
      headers: {
        "apikey": process.env.DATABASE_KEY,
        "Authorization": "Bearer " + process.env.DATABASE_KEY,
        "Content-Type": "application/json",
        "Prefer": "return=minimal"
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) throw new Error("Database error");
    return { statusCode: 200, body: "Data saved!" };
  } catch (error) {
    return { statusCode: 500, body: error.message };
  }
};
