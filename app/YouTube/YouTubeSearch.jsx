"use client";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FiLoader } from "react-icons/fi";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function YouTubeSearch() {
  const [query, setQuery] = useState("");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchVideos = async () => {
    if (!query.trim()) {
      setError("Please enter a search query");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `https://deliriussapi-oficial.vercel.app/search/ytsearch?q=${query}`
      );
      const data = await response.json();

      if (Array.isArray(data.data)) {
        setVideos(data.data);
      } else {
        setVideos([]);
        setError("No videos found");
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
      setVideos([]);
      setError("Failed to fetch videos. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchClick = () => {
    fetchVideos();
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Search Bar */}
      <div className="w-full flex flex-col items-center space-y-4 mb-8">
        <Input
          type="text"
          placeholder="Search for YouTube videos..."
          value={query}
          onChange={handleInputChange}
          className="p-2 border w-full border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        />
        <Button
          type="button"
          onClick={handleSearchClick}
          className="p-3 bg-black w-full text-white rounded-md flex items-center justify-center space-x-2"
        >
          {loading ? (
            <>
              <FiLoader className="animate-spin mr-1" />
              <span>Searching...</span>
            </>
          ) : (
            <>
              <FaSearch />
              <span>Search</span>
            </>
          )}
        </Button>
      </div>

      {error && (
        <Alert variant="destructive" className="w-full mt-2">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Video Results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
        {videos.map((video) => (
          <div
            key={video.videoId}
            className="bg-black text-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform"
          >
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-48 object-cover rounded-t-md"
            />
            <div className="p-4 text-left">
              <h3 className="text-xl font-semibold">{video.title}</h3>
              <p className="text-sm">{video.description}</p>
              <p className="text-sm text-gray-400">
                Duration: {video.duration}
              </p>
              <p className="text-sm text-gray-400">Views: {video.views}</p>
            </div>
            <div className="p-4">
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Watch Video
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
