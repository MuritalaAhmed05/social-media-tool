"use client";
import React, { useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FaComments, FaRetweet, FaHeart, FaEye, FaSearch, FaMapMarkerAlt, FaRegCheckCircle, FaUsers, FaListUl, FaImages, FaTwitter, FaInfoCircle, FaSpinner } from "react-icons/fa";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"; // Assuming this is a custom Select component

export default function XDownload() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedMedia, setSelectedMedia] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState("480x270");
  // Fetch media details from the API
  const fetchMedia = async () => {
    if (!url.trim()) {
      setError("Please enter a valid Twitter URL.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setData(null);

      const response = await axios.get(
        `https://deliriussapi-oficial.vercel.app/download/twitterv2?url=${encodeURIComponent(url)}`
      );

      const result = response.data;

      if (result.status && result.data) {
        setData(result.data);
      } else {
        setError("No media found or invalid response from the server.");
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Failed to fetch media. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Format numbers to K and M
  function formatNumber(numString) {
    const num = parseInt(numString.replace(".", ""));
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    } else {
      return num.toString();
    }
  }

  const handleSelectChange = (value) => {
    setSelectedQuality(value); // Update selected quality based on user choice
  };

  // Download video
  const downloadFile = async (url, filename) => {
    setIsDownloading(true); // Show loading indicator
    try {
      const response = await fetch(url); // Fetch the file from the URL
      if (!response.ok) {
        throw new Error("Failed to fetch the file");
      }
      const blob = await response.blob(); // Convert the response to a Blob
      const link = document.createElement("a"); // Create a hidden anchor element
      link.href = URL.createObjectURL(blob); // Create an object URL for the blob
      link.download = filename; // Set the filename for download
      link.click(); // Trigger the download
      URL.revokeObjectURL(link.href); // Clean up the object URL
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setIsDownloading(false); // Hide loading indicator
    }
  };

  // Render media (photo or video)
  const renderMedia = (media) => {
    if (media.type === "photo") {
      return (
        <div className="flex flex-col items-center">
          <img
            src={media.image}
            alt="Twitter Media"
            className="max-w-full rounded-lg shadow-md"
          />
          <button
            onClick={() => downloadFile(media.image, "image.jpg")}
            className="mt-4 bg-black text-white px-4 py-2 rounded-lg"
            disabled={isDownloading}
          >
            {isDownloading ? <FaSpinner className="animate-spin" /> : "Download Image"}
          </button>
        </div>
      );
    } else if (media.type === "video") {
      return (
        <div className="flex flex-col items-center">
      {/* Video player */}
      <video controls poster={media.cover} className="max-w-full rounded-lg shadow-md">
        {media.videos.map((video, index) => (
          <source key={index} src={video.url} type="video/mp4" />
        ))}
      </video>

      {/* Select quality dropdown */}
      <Select onValueChange={handleSelectChange}>
        <SelectTrigger className="bg-gray-200 text-black p-2 rounded-lg outline-none mt-4">
          <SelectValue placeholder="Choose Media Quality" />
        </SelectTrigger>
        <SelectContent className="bg-white border rounded-lg outline-none">
          {media.videos.map((video, index) => (
            <SelectItem key={index} value={video.quality}>
              {video.quality} ({(video.bitrate / 1000).toFixed(0)} Kbps)
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Download button */}
      <button
        onClick={() => {
          const selectedVideo = media.videos.find((video) => video.quality === selectedQuality);
          if (selectedVideo) {
            // Trigger the download using the selected quality
            downloadFile(selectedVideo.url, `${selectedVideo.quality}_video.mp4`);
          }
        }}
        className="mt-4 bg-black text-white p-3 rounded-lg flex justify-center items-center w-full"
        disabled={isDownloading}
      >
        {isDownloading ? (
          <FaSpinner className="animate-spin text-white" /> // Display the spinner while downloading
        ) : (
          "Download Video"
        )}
      </button>
    </div>
      );
    } else {
      return <p>Unsupported media type.</p>;
    }
  };

  return (
    <div className="w-full">
      {/* Input Section */}
      <div className="w-full flex flex-col items-center">
        <input
          type="text"
          placeholder="Enter Twitter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full mb-4 p-3 text-black rounded-md border border-gray-600"
        />
        <button
          onClick={fetchMedia}
          className="w-full bg-black text-white p-3 rounded-md flex justify-center items-center"
          disabled={loading}
        >
          {loading ? (
            <>
              <div className="animate-spin w-5 h-5 border-4 border-t-transparent rounded-full mr-2"></div>
              <span> Searching...</span>
            </>
          ) : (
            <>
              <FaSearch className="mr-2" /> Search
            </>
          )}
        </button>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive" className="w-full mt-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Media Section */}
      {data && (
        <div className="mt-6 space-y-6">
          {/* Media Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Media Details</CardTitle>
            </CardHeader>
            <CardContent>
              {data.media && data.media.length > 0 ? (
                data.media.map((media, index) => (
                  <div key={index} className="mb-6">
                    {renderMedia(media)}
                  </div>
                ))
              ) : (
                <p>No media available</p>
              )}
            </CardContent>
          </Card>

          {/* Post Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Post Statistics</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <FaComments className="text-blue-500" />
                Replies: {formatNumber(data.replie || 0)}
              </div>
              <div className="flex items-center gap-2">
                <FaRetweet className="text-green-500" />
                Retweets: {formatNumber(data.retweet || 0)}
              </div>
              <div className="flex items-center gap-2">
                <FaHeart className="text-red-500" />
                Favorites: {formatNumber(data.favorite || 0)}
              </div>
              <div className="flex items-center gap-2">
                <FaEye className="text-gray-600" />
                Views: {formatNumber(data.view || 0)}
              </div>
            </CardContent>
          </Card>

          {/* Profile Details */}
          <Card className="w-full p-0">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Profile Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Banner */}
              <div className="relative rounded-lg">
                <img
                  src={data.author.profile_banner}
                  alt="Profile Banner"
                  className="w-full h-50 object-cover rounded-lg shadow-md"
                />
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-30 rounded-lg"></div>
              </div>

              {/* Profile Image and Username */}
              <div className="flex items-center gap-4">
                <img
                  src={data.author.profile_image}
                  alt="Profile"
                  className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
                />
                <div>
                  <a
                    href={data.author.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl font-semibold text-blue-600 hover:underline"
                  >
                    {data.author.username}
                  </a>
                  <p className="text-gray-500">{data.author.bio}</p>
                </div>
              </div>

              {/* Location and Verified Badge */}
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <FaMapMarkerAlt />
                <span>{data.author.location || "No location"}</span>
                {data.author.verified && <FaRegCheckCircle className="text-blue-500" />}
              </div>
              <div className="grid grid-cols-2 gap-4">
      <div className="flex items-center gap-2">
        <FaUsers className="text-blue-500" />
        <span>
          <strong>Followers: </strong>{formatNumber(data.author.followers)}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <FaUsers className="text-green-500" />
        <span>
        <strong>Friends:</strong> {formatNumber(data.author.friends)}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <FaListUl className="text-purple-500" />
        <span>
        <strong>Listed Count:</strong> {formatNumber(data.author.listed_ount)}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <FaImages className="text-yellow-500" />
        <span>
        <strong>Media Count:</strong> {formatNumber(data.author.media_count)}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <FaInfoCircle className="text-gray-500" />
        <span>
        <strong>Statuses:</strong> {formatNumber(data.author.statuses)}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <FaTwitter className="text-blue-500" />
        <span>
        <strong>Favorites:</strong> {formatNumber(data.author.favorite)}
        </span>
      </div>
    </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
