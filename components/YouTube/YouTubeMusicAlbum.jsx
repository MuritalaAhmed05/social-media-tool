"use client";
import React, { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";
import { FiLoader } from "react-icons/fi";
export default function YouTubeMusicAlbum() {
  const [query, setQuery] = useState("");
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setLoading(true);
    setError("");
    setAlbums([]);
    try {
      const response = await fetch(
        `/api/downloader?platform=youtube&query=${encodeURIComponent(query.trim() + " album")}`
      );
      const resData = await response.json();
      const rawList = resData.data || resData.results || [];
      if (Array.isArray(rawList) && rawList.length > 0) {
        const listItem = rawList.map((item) => ({
          albumId: item.id || item.videoId,
          title: item.title,
          artist: item.author || "Artist",
          year: "Album",
          type: "YouTube Music",
          image: item.thumbnail
        }));
        setAlbums(listItem);
      } else {
        setError("No albums found for this query.");
      }
    } catch (err) {
      setError("Failed to fetch albums. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="w-full">
      <div className="w-full">
        <div className="flex flex-col mb-4">
          <Input
            type="text"
            placeholder="Search for an album"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full mb-4"
          />
          <Button
            type="button"
            onClick={handleSearch}
            className="w-full bg-black text-white"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
          {albums.map((album) => (
            <div
              key={album.albumId}
              className="bg-black text-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform"
            >
              <img
                src={album.image}
                alt={album.title}
                className="w-full h-auto rounded-lg mb-4"
              />
              <div className="p-4 text-left">
                <h2 className="text-lg font-semibold">{album.title}</h2>
                <p className="text-gray-400">{album.artist}</p>
                <p className="text-gray-500">{album.year}</p>
                <p className="text-gray-400 italic">{album.type}</p>
              </div>
              <a
                href="https://music.youtube.com/playlist?list=${album.albumId}"
                target="_blank"
                rel="noopener noreferrer"
                class="mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-black"
              >
                Listen on YouTube Music
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
