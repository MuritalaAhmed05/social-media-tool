"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaSearch } from "react-icons/fa";
import { FiLoader } from "react-icons/fi";
import { AiOutlineDownload } from "react-icons/ai";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
export default function InstagramDownload() {
  const [url, setUrl] = useState("");
  const [downloadData, setDownloadData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDownload = async () => {
    if (!url) {
      setError("Please input your link.");
      return;
    }

    setLoading(true);
    setError(""); // Clear any existing errors
    try {
      const response = await fetch(
        `https://deliriussapi-oficial.vercel.app/download/instagram?url=${encodeURIComponent(
          url
        )}`
      );
      const data = await response.json();
      if (data.status && data.data) {
        setDownloadData(data.data);
      } else {
        setError("Failed to fetch media data. Please try again.");
      }
    } catch (err) {
      console.error("Error fetching Instagram media:", err);
      setError("An error occurred while fetching the media.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadMedia = (mediaUrl, fileName) => {
    const link = document.createElement("a");
    link.href = mediaUrl;
    link.download = fileName;
    link.click();
  };
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full flex flex-col items-center space-y-4 mb-4">
        <Input
          type="text"
          placeholder="Enter Instagram URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full"
        />
        <Button onClick={handleDownload} className="w-full bg-black text-white">
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
        <Alert variant="destructive" className="w-full ">
          <AlertTitle>Error:</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {downloadData && (
        <div className="w-full flex flex-col items-center space-y-4">
          {downloadData.map((media, index) => (
            <div key={index} className="w-full flex items-center">
              {media.type === "image" ? (
                <img
                  src={media.url}
                  alt={`Instagram media ${index}`}
                  className="rounded-md w-80 h-auto"
                />
              ) : media.type === "video" ? (
                <video
                  src={media.url}
                  controls
                  className="rounded-md w-80 h-auto"
                >
                  Your browser does not support the video tag.
                </video>
              ) : null}
              <button
                onClick={() =>
                  handleDownloadMedia(media.url, `instagram_media_${index}`)
                }
                className="mt-4 p-3 bg-black text-white rounded-md flex items-center space-x-2"
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
