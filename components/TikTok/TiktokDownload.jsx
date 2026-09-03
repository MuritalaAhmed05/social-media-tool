"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FiDownload, FiLoader, FiPlay, FiHeart, FiMessageSquare, FiShare2, FiEye, FiMusic } from "react-icons/fi";

export default function TikTokDownloader() {
  const [videoUrl, setVideoUrl] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDownload = async () => {
    if (!videoUrl.trim()) {
      setError("Please paste a valid TikTok link.");
      return;
    }
    setLoading(true);
    setError("");
    setData(null);

    try {
      const res = await fetch(`/api/downloader?platform=tiktok&url=${encodeURIComponent(videoUrl.trim())}`);
      const json = await res.json();

      if (!res.ok || json.error) {
        throw new Error(json.error || "Failed to fetch TikTok video.");
      }

      setData(json.data);
    } catch (err) {
      setError(err.message || "An error occurred while fetching video.");
    } finally {
      setLoading(false);
    }
  };

  const triggerDownload = (fileUrl, filename) => {
    const a = document.createElement("a");
    a.href = fileUrl;
    a.download = filename || "tiktok_download";
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  function formatCount(num) {
    if (!num) return "0";
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  }

  return (
    <div className="w-full space-y-6">
      
      {/* Input Group */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          type="text"
          placeholder="Paste TikTok video link here (e.g. https://www.tiktok.com/@user/video/...)"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleDownload()}
          className="h-12 bg-background/50 text-base"
        />
        <Button
          onClick={handleDownload}
          disabled={loading}
          className="h-12 px-8 font-semibold text-sm shrink-0"
        >
          {loading ? (
            <>
              <FiLoader className="w-4 h-4 animate-spin mr-2" />
              Processing...
            </>
          ) : (
            <>
              <FiDownload className="w-4 h-4 mr-2" />
              Fetch Video
            </>
          )}
        </Button>
      </div>

      {error && (
        <Alert variant="destructive" className="rounded-xl">
          <AlertTitle className="font-semibold">Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {data && (
        <div className="border border-border/50 rounded-2xl p-6 bg-background/50 space-y-6 animate-in fade-in duration-300">
          
          {/* Author Header & Title */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              {data.author?.avatar && (
                <img
                  src={data.author.avatar}
                  alt={data.author.name}
                  className="w-11 h-11 rounded-full object-cover border border-border/50"
                />
              )}
              <div>
                <h4 className="font-bold text-base leading-tight">{data.author?.name}</h4>
                <p className="text-xs text-muted-foreground">@{data.author?.username}</p>
              </div>
            </div>

            {/* Metrics */}
            <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground bg-accent/40 px-3 py-1.5 rounded-full border border-border/40">
              <span className="flex items-center gap-1"><FiHeart className="text-rose-500" /> {formatCount(data.metrics?.likes)}</span>
              <span className="flex items-center gap-1"><FiEye /> {formatCount(data.metrics?.views)}</span>
              <span className="flex items-center gap-1"><FiMessageSquare /> {formatCount(data.metrics?.comments)}</span>
            </div>
          </div>

          <p className="text-sm text-foreground/90 font-medium leading-relaxed">{data.title}</p>

          {/* Media Preview & Downloads */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            
            {/* Video Player or Thumbnail */}
            <div className="relative rounded-xl overflow-hidden bg-black/50 border border-border/40 aspect-video flex items-center justify-center max-h-80">
              {data.media?.find((m) => m.type === "video") ? (
                <video
                  controls
                  poster={data.thumbnail}
                  src={data.media.find((m) => m.type === "video")?.url}
                  className="w-full h-full object-contain"
                />
              ) : data.thumbnail ? (
                <img src={data.thumbnail} alt={data.title} className="w-full h-full object-cover" />
              ) : (
                <FiPlay className="w-12 h-12 text-muted-foreground" />
              )}
            </div>

            {/* Download Actions */}
            <div className="space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Download Options</h5>
              
              <div className="space-y-2">
                {data.media?.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => triggerDownload(item.url, `tiktok_${item.type}_${idx}`)}
                    className="w-full flex items-center justify-between p-3.5 rounded-xl bg-accent/50 hover:bg-accent border border-border/50 text-sm font-semibold transition-all group"
                  >
                    <span className="flex items-center gap-2">
                      {item.type === "audio" ? <FiMusic className="w-4 h-4 text-emerald-500" /> : <FiDownload className="w-4 h-4 text-primary" />}
                      {item.quality || item.type.toUpperCase()}
                    </span>
                    <span className="text-xs text-muted-foreground group-hover:text-foreground">Download &rarr;</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
