"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FiDownload, FiLoader, FiPlay, FiEye, FiMusic, FiFilm } from "react-icons/fi";

export default function YouTubeDownload() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFetch = async () => {
    if (!url.trim()) {
      setError("Please enter a valid YouTube video URL.");
      return;
    }
    setLoading(true);
    setError("");
    setData(null);

    try {
      const res = await fetch(`/api/downloader?platform=youtube&url=${encodeURIComponent(url.trim())}`);
      const json = await res.json();

      if (!res.ok || json.error) {
        throw new Error(json.error || "Failed to fetch YouTube video details.");
      }

      setData(json.data);
    } catch (err) {
      setError(err.message || "An error occurred while fetching YouTube video.");
    } finally {
      setLoading(false);
    }
  };

  const triggerDownload = (fileUrl, filename) => {
    const a = document.createElement("a");
    a.href = fileUrl;
    a.download = filename || "youtube_download";
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
      
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          type="text"
          placeholder="Paste YouTube Video URL (e.g. https://www.youtube.com/watch?v=...)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleFetch()}
          className="h-12 bg-background/50 text-base"
        />
        <Button onClick={handleFetch} disabled={loading} className="h-12 px-8 font-semibold text-sm shrink-0">
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
          
          <div className="flex items-start justify-between gap-4">
            <div>
              <h4 className="font-bold text-base leading-tight mb-1">{data.title}</h4>
              <p className="text-xs text-muted-foreground">{data.author?.name}</p>
            </div>
            {data.metrics?.views > 0 && (
              <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground bg-accent/40 px-3 py-1.5 rounded-full border border-border/40 shrink-0">
                <FiEye /> {formatCount(data.metrics.views)} views
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            
            <div className="relative rounded-xl overflow-hidden bg-black/50 border border-border/40 aspect-video flex items-center justify-center max-h-80">
              {data.thumbnail ? (
                <img src={data.thumbnail} alt={data.title} className="w-full h-full object-cover" />
              ) : (
                <FiPlay className="w-12 h-12 text-muted-foreground" />
              )}
            </div>

            <div className="space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Download Options</h5>
              
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {data.media?.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => triggerDownload(item.url, `youtube_${item.type}_${idx}`)}
                    className="w-full flex items-center justify-between p-3.5 rounded-xl bg-accent/50 hover:bg-accent border border-border/50 text-sm font-semibold transition-all group"
                  >
                    <span className="flex items-center gap-2">
                      {item.type === "audio" ? <FiMusic className="w-4 h-4 text-emerald-500" /> : <FiFilm className="w-4 h-4 text-rose-500" />}
                      {item.quality}
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
