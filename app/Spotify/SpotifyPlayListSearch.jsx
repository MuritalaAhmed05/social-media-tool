"use client";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FiLoader } from "react-icons/fi";
import { AiOutlineDownload } from "react-icons/ai"; // Import download icon
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SpotifyPlayListSearch() {
  const [query, setQuery] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch playlists from the Spotify API
  const fetchPlaylists = async () => {
    if (!query.trim()) {
      setError("Please enter a search query"); // Show error if query is empty
      return;
    }
    setError(""); // Clear any previous errors
    setLoading(true);
    try {
      const response = await fetch(
        `https://deliriussapi-oficial.vercel.app/search/spotifyplaylist?q=${query}`
      );
      const data = await response.json();

      if (data.status) {
        setPlaylists(data.data); // Set playlists if response is successful
      } else {
        setPlaylists([]); // Fallback if no valid data returned
      }
    } catch (error) {
      console.error("Error fetching playlists:", error);
      setPlaylists([]); // Handle the error case
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value); // Update query when input changes
  };

  const handleSearchClick = () => {
    fetchPlaylists(); // Trigger fetchPlaylists when search button is clicked
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Alert for empty input */}

      {/* Search Bar */}
      <div className="w-full flex flex-col items-center space-y-4 mb-4">
        <Input
          type="text"
          placeholder="Search for playlists..."
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

      {/* Playlists Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
        {playlists.map((playlist) => (
          <div
            key={playlist.id}
            className="bg-black text-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform"
          >
            <a
              href={playlist.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <img
                src={playlist.images}
                alt={playlist.name}
                className="w-full h-48 object-cover rounded-t-md"
              />
            </a>
            <div className="p-4 text-left">
              <h3 className="text-xl font-semibold">{playlist.name}</h3>
              <p className="text-sm text-gray-400">
                {playlist.description || "No description available"}
              </p>
            </div>
            <a
              href={playlist.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black/35 text-white p-2 rounded-md w-full flex items-center justify-center space-x-2 mb-4"
            >
              <AiOutlineDownload />
              <span>Listen on Spotify</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
