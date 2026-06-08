import { getStore } from "@netlify/blobs";

export default async () => {
  const store = getStore("restaurant-data");
  // This matches the key you used in your save-data.js
  const data = await store.get("menu-content", { type: "json" });

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" }
  });
};
