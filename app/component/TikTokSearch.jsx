"use client";
import React, { useState } from "react";
import { FaPlay, FaThumbsUp, FaShareAlt } from "react-icons/fa";
import { FiLoader, FiDownload } from "react-icons/fi";
import { Alert, AlertDescription, AlertTitle } from  "@/components/ui/alert";
const Search = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // State to manage error messages

  const handleDownload = async () => {
    if (!videoUrl) return;

    setLoading(true);
    setError(""); // Reset error message before starting new fetch
    try {
      const response = await fetch(
        `https://deliriussapi-oficial.vercel.app/search/tiktoksearch?query=${videoUrl}`
      );
      const data = await response.json();
      setVideos(data.meta || []); // Ensure fallback if `meta` is undefined
    } catch (error) {
      console.error("Error fetching videos:", error);
      setError("Failed to fetch videos. Please try again."); // Set error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-black flex flex-col items-center font-sans">
      <header className="w-full flex flex-col items-center text-center space-y-4">
        <div className="w-full flex flex-col items-center">
          <input
            type="text"
            placeholder="Paste TikTok video URL here"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="w-full mb-4 p-3 text-black rounded-md border border-gray-600"
          />
          <button
            onClick={handleDownload}
            className="w-full bg-black text-white p-3 rounded-md flex justify-center items-center"
            disabled={loading}
          >
            {loading ? (
              <>
                <FiLoader className="animate-spin mr-2" />
                Loading...
              </>
            ) : (
              <>
                <FiDownload className="mr-2" />
                Download
              </>
            )}
          </button>
        </div>
      </header>

      {/* Display the error alert if there's an error */}
      {error && (
        <div className="w-full mt-4 px-4">
          <Alert className="bg-red-500 text-white">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      )}

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8 px-4 place-items-center">
        {videos.map((video) => (
          <div
            key={video.id}
            className="bg-gray-900 p-4 rounded-xl shadow-xl w-72 overflow-hidden"
          >
            <div className="relative">
              {/* Video element to display the video using hd URL */}
              {video.hd ? (
                <video
                  src={video.hd} // Use the `hd` URL to play the video
                  controls
                  width="100%"
                  height="400"
                  className="w-full h-72 rounded-lg"
                />
              ) : (
                <p className="text-white text-center">Video not available</p>
              )}
              <h2 className="text-lg font-semibold text-white truncate mt-2">
                {video.title || "No Title"}
              </h2>
              <div className="flex justify-between items-center mt-2 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <FaPlay />
                  <span>{video.play || 0}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaThumbsUp />
                  <span>{video.like || 0}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaShareAlt />
                  <span>{video.share || 0}</span>
                </div>
              </div>
            </div>
            <a
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block text-blue-400 hover:underline text-center"
            >
              View on TikTok
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
