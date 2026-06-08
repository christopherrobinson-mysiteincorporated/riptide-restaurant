 exports.handler = async (event) => {
  // 1. Only allow POST requests
  if (event.httpMethod !== "POST") {
    return { 
      statusCode: 405, 
      body: "Method Not Allowed" 
    };
  }

  try {
    // 2. Parse the incoming data from your frontend
    const data = JSON.parse(event.body);
    
    // 3. Send the data to Supabase
    const response = await fetch(process.env.SUPABASE_URL + "/rest/v1/layouts", {
      method: "POST",
      headers: {
        "apikey": process.env.SUPABASE_KEY,
        "Authorization": "Bearer " + process.env.SUPABASE_KEY,
        "Content-Type": "application/json",
        "Prefer": "return=minimal"
      },
      body: JSON.stringify(data)
    });

    // 4. Check if the database accepted the data
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error("Database error: " + errorText);
    }
    
    return { 
      statusCode: 200, 
      body: JSON.stringify({ message: "Data saved successfully!" }) 
    };

  } catch (error) {
    // 5. Handle any errors that happen during the process
    return { 
      statusCode: 500, 
      body: JSON.stringify({ error: error.message }) 
    };
  }
};
