"use client";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FiLoader } from "react-icons/fi";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function YouTubeMusicSearch() {
  const [query, setQuery] = useState("");
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTracks = async () => {
    if (!query.trim()) {
      setError("Please enter a search query");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `https://deliriussapi-oficial.vercel.app/search/searchtrack?q=${query}`
      );
      const data = await response.json();

      if (Array.isArray(data)) {
        setTracks(data);
      } else {
        setTracks([]);
        setError("No tracks found");
      }
    } catch (error) {
      console.error("Error fetching tracks:", error);
      setTracks([]);
      setError("Failed to fetch tracks. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchClick = () => {
    fetchTracks();
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Alert for errors */}
     

      {/* Search Bar */}
      <div className="w-full flex flex-col items-center space-y-4 mb-8">
        <Input
          type="text"
          placeholder="Search for tracks..."
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
      {/* Track Results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
        {tracks.map((track) => (
          <div
            key={track.id}
            className="bg-black text-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform"
          >
            <img
              src={track.image}
              alt={track.title}
              className="w-full h-48 object-cover rounded-t-md"
            />
            <div className="p-4 text-left">
              <h3 className="text-xl font-semibold">{track.title}</h3>
              <p className="text-sm">{track.artist}</p>
              <p className="text-sm text-gray-400">Album: {track.album}</p>
              <p className="text-sm text-gray-400">Duration: {track.duration.label}</p>
            </div>
            <div className="p-4">
              <iframe
                width="100%"
                height="200"
                src={`https://www.youtube.com/embed/${track.id}`}
                title={track.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-md"
              ></iframe>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
