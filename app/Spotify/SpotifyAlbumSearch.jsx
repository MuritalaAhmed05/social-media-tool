"use client";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FiLoader } from "react-icons/fi";
import { AiOutlineDownload } from "react-icons/ai";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function SpotifyAlbumSearch() {
  const [query, setQuery] = useState("");
  const [albums, setAlbums] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!query) {
      setError("Please enter a valid query.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://deliriussapi-oficial.vercel.app/search/spotifyalbum?q=${query}&limit=3`
      );
      const data = await response.json();

      if (data.status) {
        setAlbums(data.data); // Set the album data from the API
      } else {
        setError("Failed to fetch album data. Please try again.");
      }
    } catch (err) {
      console.error("Error fetching Spotify albums:", err);
      setError("An error occurred while fetching album data.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (albumUrl) => {
    const link = document.createElement("a");
    link.href = albumUrl;
    link.download = albumUrl.split("/").pop();
    link.click();
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full space-y-4 mb-8">
        <input
          type="text"
          placeholder="Search for an album"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-2 border w-full border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        />
        <button
          onClick={handleSearch}
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
        </button>
      </div>

      {error && (
        <Alert variant="destructive" className="w-full mt-4">
          <AlertTitle>Error:</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Album Gallery */}
      {albums && !loading && (
  <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 place-items-center">
    {albums.map((album, index) => (
      <div key={index} className="flex flex-col items-start bg-black shadow-lg p-4 rounded-lg w-full">
        <a
          href={album.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full"
        >
          <img
            src={album.image}
            alt={album.name}
            className="w-full h-auto object-cover rounded-md shadow-md mb-4"
          />
        </a>
        <div className="text-left space-y-2 w-full">
          <h2 className="text-lg font-bold text-white">{album.name}</h2>
          <p className="text-gray-300">Artist: {album.artists}</p>
          <p className="text-gray-300">Published: {album.publish}</p>
          <p className="text-gray-300">Tracks: {album.tracks}</p>
        </div>
        <button
          onClick={() => handleDownload(album.url)}
          className="bg-black shadow-2xl text-white p-2 rounded-md flex items-center justify-center space-x-2 mt-2"
        >
          <AiOutlineDownload />
          <span>Download</span>
        </button>
      </div>
    ))}
  </div>
)}

    </div>
  );
}
