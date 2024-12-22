const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
const port = 8080;

app.use(cors());

app.get("/", async (req, res) => {
  const url = req.query.url; // Get the YouTube URL from the query parameter

  if (!url) {
    return res.json({ error: "No target URL provided" });
  }

  try {
    const response = await fetch(`https://exonity.tech/api/ytdlp2-faster?apikey=adminsepuh&url=${encodeURIComponent(url)}`);
    const data = await response.json();

    // If the response is successful, send the video details back
    if (data.status === 200) {
      res.json(data);
    } else {
      res.status(500).json({ error: "Failed to fetch video details" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`CORS proxy running on http://localhost:${port}`);
});
