"use client";
import React, { useState } from "react";
import {
  FaPlay,
  FaHeart,
  FaShareAlt,
  FaComment,
  FaSearch,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FiLoader } from "react-icons/fi";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const Search = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const formatNumber = (num) => {
    const parsed = parseInt(num, 10) || 0;
    if (parsed >= 1_000_000) {
      return (parsed / 1_000_000).toFixed(1) + "M";
    } else if (parsed >= 1_000) {
      return (parsed / 1_000).toFixed(1) + "K";
    }
    return parsed.toString();
  };

  const handleDownload = async () => {
    if (!videoUrl.trim()) {
      setError("Please enter a search term.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `/api/downloader?action=tiktoksearch&query=${encodeURIComponent(videoUrl.trim())}`
      );
      const data = await response.json();
      if (data.status && data.meta) {
        setVideos(data.meta);
        if (data.meta.length === 0) {
          setError("No videos found for this search term.");
        }
      } else {
        setVideos([]);
        setError("Failed to fetch search results.");
      }
    } catch (err) {
      setError("Failed to fetch videos. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Search Input Bar */}
      <div className="w-full flex flex-col items-center">
        <Input
          type="text"
          placeholder="Search TikTok videos..."
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleDownload()}
          className="w-full mb-4"
        />
        <Button
          onClick={handleDownload}
          className="w-full bg-black text-white dark:bg-white dark:text-black font-semibold"
          disabled={loading}
        >
          {loading ? (
            <>
              <FiLoader className="animate-spin mr-2" />
              Searching...
            </>
          ) : (
            <>
              <FaSearch className="mr-2" />
              Search Videos
            </>
          )}
        </Button>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive" className="w-full mt-4">
          <AlertTitle>Notice</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Videos Grid */}
      {videos.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 w-full">
          {videos.map((video) => (
            <div
              key={video.id}
              className="bg-card text-card-foreground border border-border p-4 rounded-2xl shadow-md hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Media Container */}
                <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black mb-3">
                  {video.tiktokEmbed ? (
                    <iframe
                      src={video.tiktokEmbed}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full rounded-xl border-0 bg-black"
                    />
                  ) : video.hd ? (
                    <video
                      src={video.hd}
                      controls
                      referrerPolicy="no-referrer"
                      crossOrigin="anonymous"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    <img
                      src={video.thumbnail || video.author?.avatar}
                      alt={video.title}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  )}
                </div>

                {/* Title */}
                <h3 className="text-sm font-bold line-clamp-2 leading-snug mb-3">
                  {video.title || "TikTok Video"}
                </h3>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground p-3 rounded-xl bg-accent/40 border border-border/40 mb-3">
                  <div className="flex items-center space-x-1.5">
                    <FaPlay className="text-emerald-500" />
                    <span>{formatNumber(video.play)} Views</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <FaHeart className="text-rose-500" />
                    <span>{formatNumber(video.like)} Likes</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <FaComment className="text-blue-500" />
                    <span>{formatNumber(video.coment)} Comments</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <FaShareAlt className="text-purple-500" />
                    <span>{formatNumber(video.share)} Shares</span>
                  </div>
                </div>
              </div>

              {/* Author & External Link Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-border/50 mt-2">
                <div className="flex items-center space-x-2.5 min-w-0 pr-2">
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarImage
                      src={video.author?.avatar}
                      alt={video.author?.nickname}
                    />
                    <AvatarFallback className="text-xs">
                      {video.author?.nickname?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold truncate">
                      {video.author?.nickname || "Creator"}
                    </p>
                    <p className="text-[10px] text-muted-foreground truncate">
                      {video.author?.username}
                    </p>
                  </div>
                </div>

                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline flex-shrink-0"
                >
                  <span>Open</span>
                  <FaExternalLinkAlt size={10} />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;

