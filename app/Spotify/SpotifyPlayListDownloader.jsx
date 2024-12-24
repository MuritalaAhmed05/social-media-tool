"use client";
import React, { useState } from "react";
import { AiOutlineDownload } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FiLoader } from "react-icons/fi";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
export default function SpotifyPlayListDownloader() {
  const [url, setUrl] = useState("");
  const [playlistData, setPlaylistData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle URL input change
  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  // Fetch playlist data from the API
  const fetchPlaylistData = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://deliriussapi-oficial.vercel.app/download/spotifyplaylist?url=${encodeURIComponent(
          url
        )}`
      );
      const data = await response.json();
      if (data.status) {
        setPlaylistData(data);
      } else {
        setError("Failed to fetch playlist data.");
      }
    } catch (err) {
      setError("An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  // Handle download for a specific track
  const handleDownload = (trackUrl) => {
    const link = document.createElement("a");
    link.href = trackUrl;
    link.download = ""; // Set filename if needed
    link.click();
  };

  return (
    <div className="w-full flex flex-col items-center ">
      <Input
        type="text"
        placeholder="Enter Spotify Playlist URL"
        value={url}
        onChange={handleUrlChange}
        className="w-full mb-4"
      />
      <Button
        onClick={fetchPlaylistData}
        className="w-full bg-black text-white"
        disabled={loading}
      >
        {loading ? (
          <>
            <FiLoader className="animate-spin mr-1" />
            <span>Fetching...</span>
          </>
        ) : (
          <>
            <FaSearch />
            <span>Fetch Playlist</span>
          </>
        )}
      </Button>

      {error && (
        <Alert variant="destructive" className="w-full mt-4">
          <AlertTitle>Error:</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {playlistData && (
        <div className="mt-6 w-full flex flex-col ">
          {/* Image and Playlist Info */}
          <div className="flex flex-col sm:flex-row justify-evenly items-center gap-4">
            <img
              src={playlistData.data.image}
              alt={playlistData.data.name}
              className="max-h-42 md:max-h-sm max-w-42 md:max-w-sm rounded-md shadow-lg"
            />
            <div className="text-center sm:text-left">
              <h3 className="text-xl font-semibold">
                {playlistData.data.name}
              </h3>
              <p className="mt-2">{playlistData.description}</p>
              <p className="mt-2">Followers: {playlistData.data.followers}</p>
            </div>
          </div>

          {/* Track List */}
          <div className="mt-4 w-full">
            {playlistData.tracks.map((track) => (
              <div
                key={track.id}
                className="flex flex-col md:flex-row items-center justify-between p-2 border-b"
              >
                <div className="flex items-center">
                  <img
                    src={track.image}
                    alt={track.title}
                    className="w-12 h-12 rounded-md mr-3"
                  />
                  <div>
                    <h4 className="font-semibold">{track.title}</h4>
                    <p className="text-sm text-gray-600">
                      {track.artist} - {track.album} ({track.duration})
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleDownload(track.url)}
                  className="bg-black md:w-auto md:mt-0 mt-3 w-full text-white p-2 rounded-md flex items-center justify-center space-x-2"
                >
                  <AiOutlineDownload />
                  <span>Download</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
