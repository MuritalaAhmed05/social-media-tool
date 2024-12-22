"use client";
import React, { useState } from "react";
import { AiOutlineDownload } from "react-icons/ai";
import { FaExternalLinkAlt, FaSearch } from "react-icons/fa";
import { FiLoader } from "react-icons/fi";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
export default function SpotifyAlbumDownloader() {
  const [url, setUrl] = useState("");
  const [albumData, setAlbumData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle URL input change
  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  // Fetch album data from the API
  const fetchAlbumData = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://deliriussapi-oficial.vercel.app/download/spotifyalbum?url=${encodeURIComponent(
          url
        )}`
      );
      const data = await response.json();
      if (data.status) {
        setAlbumData(data);
      } else {
        setError("Failed to fetch album data.");
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
      <input
        type="text"
        placeholder="Enter Spotify Album URL"
        value={url}
        onChange={handleUrlChange}
        className="p-2 border w-full border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black mb-4"
      />
      <button
        onClick={fetchAlbumData}
        className="p-3 bg-black w-full text-white rounded-md flex items-center justify-center space-x-2"
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
              <span>Fetch Album</span>
            </>
          )}
      </button>

      {error && (
                    <Alert variant="destructive" className="w-full mt-4">
                      <AlertTitle>Error:</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

      {albumData && (
        <div className="mt-6 w-full flex flex-col items-center">
        <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-9">
  {/* Image Section */}
  <img
    src={albumData.data.image}
    alt={albumData.data.name}
    className="max-h-42 md:max-h-sm max-w-42 md:max-w-sm rounded-md shadow-lg"
  />

  {/* Text Section */}
  <div>
    <h3 className="text-xl font-semibold">{albumData.data.name}</h3>
    <p className="mt-2">Copyright: {albumData.data.copyrights}</p>
    <p className="mt-2">Popularity: {albumData.data.popularity}</p>
    <p className="mt-2">Published: {albumData.data.publish}</p>
    <p className="mt-2">Total Tracks: {albumData.data.total_tracks}</p>
    <p className="mt-2">Label: {albumData.data.labels}</p>
    <a
  href={albumData.data.link}
  target="_blank"
  rel="noopener noreferrer"
  className="mt-2  px-6 font-semibold text-md py-2 bg-black text-white rounded-md hover:bg-black inline-flex items-center justify-center"
>
  Visit <FaExternalLinkAlt className="text-white inline ml-2"/>
</a>

  </div>
</div>

          <div className="mt-4 w-full">
            {albumData.tracks.map((track) => (
              <div
                key={track.id}
                className="flex flex-col md:flex-row items-start justify-between py-3 border-b"
              >
                <div className="flex items-start">
                  <img
                    src={track.image}
                    alt={track.title}
                    className="w-12 h-12 rounded-md mr-3"
                  />
                  <div>
                    <h4 className="font-semibold">{track.title}</h4>
                    <p className="text-sm text-gray-600">
                      Artist: {track.artist} - Duration: {track.duration}
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
