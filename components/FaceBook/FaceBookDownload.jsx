"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FiDownload, FiLoader, FiFacebook, FiVideo } from "react-icons/fi";

export default function FaceBookDownload() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFetch = async () => {
    if (!url.trim()) {
      setError("Please enter a valid Facebook video URL.");
      return;
    }
    setLoading(true);
    setError("");
    setData(null);

    try {
      const res = await fetch(`/api/downloader?platform=facebook&url=${encodeURIComponent(url.trim())}`);
      const json = await res.json();

      if (!res.ok || json.error) {
        throw new Error(json.error || "Failed to fetch Facebook video.");
      }

      setData(json.data);
    } catch (err) {
      setError(err.message || "An error occurred while fetching Facebook video.");
    } finally {
      setLoading(false);
    }
  };

  const triggerDownload = (fileUrl, filename) => {
    const a = document.createElement("a");
    a.href = fileUrl;
    a.download = filename || "facebook_video.mp4";
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="w-full space-y-6">
      
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          type="text"
          placeholder="Paste Facebook video URL (e.g. https://www.facebook.com/watch/...)"
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
          <h4 className="font-bold text-base leading-tight">{data.title}</h4>

          {data.media && data.media.length > 0 && (
            <div className="space-y-2">
              {data.media.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => triggerDownload(item.url, `facebook_video_${idx + 1}.mp4`)}
                  className="w-full flex items-center justify-between p-3.5 rounded-xl bg-accent/50 hover:bg-accent border border-border/50 text-sm font-semibold transition-all group"
                >
                  <span className="flex items-center gap-2">
                    <FiVideo className="w-4 h-4 text-primary" />
                    {item.quality || `Facebook Video ${idx + 1}`}
                  </span>
                  <span className="text-xs text-muted-foreground group-hover:text-foreground">Download &rarr;</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
}
