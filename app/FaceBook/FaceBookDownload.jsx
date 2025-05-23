"use client";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FiLoader } from "react-icons/fi";
import { AiOutlineDownload } from "react-icons/ai";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
export default function FacebookDownload() {
  const [url, setUrl] = useState("");
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedQuality, setSelectedQuality] = useState("");
  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };
  const fetchVideoData = async () => {
    if (!url) return;
    const apiUrl = `https://bk9.fun/download/fb?url=${encodeURIComponent(url)}`;
    setLoading(true);
    setError("");
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (data.status) {
        setVideoData(data.BK9);
      } else {
        setError("Failed to fetch video data. Please try again.");
      }
    } catch (err) {
      console.error("Error fetching video data:", err);
      setError("An error occurred while fetching the video.");
    } finally {
      setLoading(false);
    }
  };
  const handleDownload = (quality) => {
    if (!videoData) return;
    const downloadUrl = quality === "sd" ? videoData.sd : videoData.hd;
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = `${videoData.title}_${quality}.mp4`;
    link.click();
  };
  return (
    <div className="w-full flex flex-col items-center">
      {}
      <Input
        type="text"
        placeholder="Enter Facebook Video URL"
        value={url}
        onChange={handleUrlChange}
        className="w-full mb-4"
      />
      {}
      <Button
        onClick={fetchVideoData}
        className="w-full bg-black text-white"
        disabled={loading}
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
      {}
      {error && (
        <Alert variant="destructive" className="w-full mt-4">
          <AlertTitle>Error:</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {}
      {videoData && !loading && (
        <div className="mt-6 w-full flex flex-col items-center">
          <video
            src={videoData.sd}
            controls
            className="w-full max-w-md rounded-lg"
          />
          <h3 className="text-xl font-semibold">{videoData.title}</h3>
          <p className="mt-2">{videoData.desc}</p>
          {}
          <div className="mt-4 flex flex-col w-full">
            <h2 className="text-gray-600 mb-2 font-semibold">
              Download Video:{" "}
            </h2>
            <Select onValueChange={(value) => setSelectedQuality(value)}>
              <SelectTrigger className="bg-gray-200 text-black p-2 rounded-lg outline-none">
                <SelectValue
                  placeholder="Choose Quality"
                  className="outline-none"
                />
              </SelectTrigger>
              <SelectContent className="bg-white border rounded-lg outline-none">
                <SelectItem value="sd">SD</SelectItem>
                <SelectItem value="hd">HD</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {}
          {selectedQuality && (
            <button
              onClick={() => handleDownload(selectedQuality)}
              className="mt-4 bg-black text-white p-3 rounded-md flex items-center justify-center space-x-2 w-full"
            >
              <AiOutlineDownload />
              <span>Download {selectedQuality.toUpperCase()}</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
