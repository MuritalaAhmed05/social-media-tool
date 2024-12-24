"use client";
import React, { useState } from "react";
import { FiLoader } from "react-icons/fi";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
export default function YouTubeToMp3() {
  const [videoUrl, setVideoUrl] = useState("");
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDownload = async () => {
    if (!videoUrl) {
      setError("Please enter a valid YouTube URL.");
      return;
    }

    setLoading(true);
    setError("");
    setVideoData(null);

    try {
      const response = await fetch(
        `https://api.davidcyriltech.my.id/download/ytmp3?url=${encodeURIComponent(
          videoUrl
        )}`
      );
      const data = await response.json();

      if (data.status === 200 && data.success) {
        setVideoData(data.result);
      } else {
        setError("Failed to fetch video. Please check the URL and try again.");
      }
    } catch (err) {
      setError("An error occurred while fetching the video.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center text-black">
      <header className="w-full  space-y-4">
        <Input
          type="text"
          placeholder="Enter YouTube URL"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          className="w-full mb-4"
        />
        <Button
          onClick={handleDownload}
          className="w-full bg-black text-white p-3 rounded-md flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <>
              <FiLoader className="animate-spin mr-2" />
              Converting...
            </>
          ) : (
            "Convert to MP3"
          )}
        </Button>
      </header>

      {error && (
        <Alert variant="destructive" className="w-full mt-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {videoData && (
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg mt-8 p-4">
          <img
            src={videoData.thumbnail}
            alt={videoData.title}
            className="w-full rounded-md"
          />
          <h2 className="text-lg font-bold mt-4">{videoData.title}</h2>
          <p className="text-sm text-gray-600">Quality: {videoData.quality}</p>
          <a
            href={videoData.download_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-green-500 text-white text-center p-3 rounded-md mt-4 hover:bg-green-600"
          >
            Download MP3
          </a>
        </div>
      )}
    </div>
  );
}
