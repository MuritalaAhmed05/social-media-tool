"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FiDownload, FiLoader, FiInstagram, FiImage, FiVideo } from "react-icons/fi";

export default function InstagramDownload() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFetch = async () => {
    if (!url.trim()) {
      setError("Please enter a valid Instagram post or reel link.");
      return;
    }
    setLoading(true);
    setError("");
    setData(null);

    try {
      const res = await fetch(`/api/downloader?platform=instagram&url=${encodeURIComponent(url.trim())}`);
      const json = await res.json();

      if (!res.ok || json.error) {
        throw new Error(json.error || "Failed to fetch Instagram media.");
      }

      setData(json.data);
    } catch (err) {
      setError(err.message || "An error occurred while fetching Instagram media.");
    } finally {
      setLoading(false);
    }
  };

  const triggerDownload = (fileUrl, filename) => {
    const a = document.createElement("a");
    a.href = fileUrl;
    a.download = filename || "instagram_download";
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
          placeholder="Paste Instagram Reel / Post URL (e.g. https://www.instagram.com/reel/...)"
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
              Fetch Post
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.media.map((item, idx) => (
                <div key={idx} className="border border-border/50 rounded-xl overflow-hidden bg-background/80 p-3 space-y-3">
                  {item.type === "video" ? (
                    <video controls src={item.url} poster={item.thumbnail || data.thumbnail} className="w-full aspect-video rounded-lg object-contain bg-black" />
                  ) : (
                    <img src={item.url} alt={`Media ${idx}`} className="w-full aspect-video rounded-lg object-cover" />
                  )}
                  <button
                    onClick={() => triggerDownload(item.url, `instagram_media_${idx + 1}`)}
                    className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-accent hover:bg-accent/80 text-xs font-semibold transition-colors"
                  >
                    {item.type === "image" ? <FiImage /> : <FiVideo />}
                    Download Media {idx + 1}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
}
