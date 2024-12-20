import React, { useState } from "react";

const TikTokAudioFetcher = () => {
  const [videoUrl, setVideoUrl] = useState(""); // The video URL to be fetched
  const [audioUrl, setAudioUrl] = useState(null); // To store the audio URL
  const [loading, setLoading] = useState(false); // To track loading state
  const [error, setError] = useState(""); // To store any errors

  const fetchAudio = async () => {
    if (!videoUrl) {
      setError("Please enter a video URL.");
      return;
    }

    setLoading(true);
    setError(""); // Reset the error message

    try {
      const audioResponse = await fetch(
        `https://bk9.fun/download/tiktok2?url=${videoUrl}`
      );

      if (!audioResponse.ok) {
        throw new Error("Failed to fetch audio details. Please try again.");
      }

      const audioData = await audioResponse.json();

      if (!audioData.status) {
        throw new Error("Audio is not available for this video.");
      }

      setAudioUrl(audioData.BK9.audio); // Set the audio URL from the response
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false); // Stop loading once the fetch is complete
    }
  };

  return (
    <div className="audio-fetcher">
      <h1>TikTok Audio Fetcher</h1>

      <input
        type="text"
        placeholder="Enter TikTok video URL"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)} // Handle input change
        className="input-url"
      />

      <button onClick={fetchAudio} disabled={loading} className="fetch-button">
        {loading ? "Loading..." : "Fetch Audio"}
      </button>

      {error && <p className="error">{error}</p>} {/* Display error if any */}
      
      {audioUrl && (
        <div className="audio-container">
          <h2>Audio Preview:</h2>
          <audio controls>
            <source src={audioUrl} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
};

export default TikTokAudioFetcher;
