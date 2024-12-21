"use client";
import React, { useState } from "react";
import { FaPlay, FaThumbsUp, FaShareAlt, FaComment, FaSearch  } from "react-icons/fa"; // Added FaComment for comments
import { FiLoader, FiDownload } from "react-icons/fi";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"; // Import Avatar component from shadcn

const Search = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // State to manage error messages

  // Helper function to format large numbers
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num;
  };

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
            placeholder="Search..."
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
                Searching...
              </>
            ) : (
              <>
                <FaSearch  className="mr-2" />
                Search 
              </>
            )}
          </button>
        </div>
      </header>

      {/* Display the error alert if there's an error */}
      {error && (
      
          <Alert variant="destructive" className="w-full mt-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
       
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8 px-4 place-items-center">
        {videos.map((video) => (
          <div
            key={video.id}
            className="bg-black p-4 rounded-xl shadow-xl w-full overflow-hidden"
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
                  <span>{formatNumber(video.play || 0)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaThumbsUp />
                  <span>{formatNumber(video.like || 0)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaShareAlt />
                  <span>{formatNumber(video.share || 0)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaComment />
                  <span>{formatNumber(video.coment || 0)}</span> {/* Display formatted comment count */}
                </div>
              </div>
              
              {/* Display author details */}
              <div className="mt-4 flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={video.author.avatar} alt={video.author.nickname} />
                  <AvatarFallback>{video.author.nickname.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="text-sm text-gray-300">
                  <p className="font-semibold">{video.author.nickname}</p>
                  <p className="text-xs">{video.author.username}</p>
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

//  <iframe
//  src={`https://www.tiktok.com/embed/${video.id}?autoplay=0`}
//  title={video.title}
//  width="100%"
//  height="400"
//  frameBorder="0"
//  allow="autoplay; encrypted-media"
//  allowFullScreen
//  className="w-full h-72 rounded-lg"
// ></iframe>