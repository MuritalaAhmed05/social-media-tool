"use client"; // Ensures this runs in the browser environment

import React, { useState } from "react";

export default function YouTubeDownload() {
  const [url, setUrl] = useState(""); // State to store the user input URL
  const [videoData, setVideoData] = useState(null); // State to store the fetched video data
  const [loading, setLoading] = useState(false); // State to manage loading state
  const [error, setError] = useState(""); // State to handle errors

  const handleInputChange = (e) => {
    setUrl(e.target.value); // Update the URL state
  };

  const handleFetchData = async () => {
    if (!url) {
      alert("Please enter a valid YouTube URL!");
      return;
    }

    setLoading(true);
    setError("");
    
    try {
      // Ensure URL is correctly encoded
      const proxyUrl = `http://localhost:8080?url=${encodeURIComponent(url)}`;
      console.log("Fetching data from: ", proxyUrl); // Debugging statement
      const response = await fetch(proxyUrl);

      if (!response.ok) {
        throw new Error("Failed to fetch video data. Proxy may not be working.");
      }

      // Check if the response is JSON
      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        console.log("Fetched data:", data); // Debugging statement

        if (data.result) {
          setVideoData(data.result);
        } else {
          throw new Error("No video data found. Please check the URL.");
        }
      } else {
        // If it's not JSON, throw an error
        throw new Error("Received non-JSON response from server. Response might be HTML.");
      }
    } catch (err) {
      setError(err.message);
      console.error("Error fetching video data:", err); // Debugging statement
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-4 bg-black text-white rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-center mb-4">YouTube Video Downloader</h2>

      <input
        type="text"
        value={url}
        onChange={handleInputChange}
        placeholder="Enter YouTube URL"
        className="w-full p-2 rounded-lg border border-gray-300 mb-4"
      />
      
      <button
        onClick={handleFetchData}
        disabled={loading}
        className="w-full p-3 bg-blue-500 text-white rounded-lg mt-4 disabled:bg-gray-400"
      >
        {loading ? "Loading..." : "Fetch Video Data"}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {videoData && (
        <div className="mt-6">
          <img src={videoData.thumb} alt="Video Thumbnail" className="w-full rounded-lg mb-4" />
          <h3 className="text-xl">{videoData.title}</h3>
          <p className="text-sm text-gray-400">{videoData.duration}</p>
          <p className="mt-2">{videoData.description}</p>

          <div className="mt-4 flex justify-between items-center">
            <a
              href={videoData.audio}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-4 py-2 rounded-lg"
            >
              Download Audio
            </a>
            <a
              href={videoData.video}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Download Video
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
