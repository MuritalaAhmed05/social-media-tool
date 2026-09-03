"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FiDownload, FiLoader, FiHeart, FiRepeat, FiEye, FiImage } from "react-icons/fi";

export default function XDownload() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFetch = async () => {
    if (!url.trim()) {
      setError("Please enter a valid X/Twitter link.");
      return;
    }
    setLoading(true);
    setError("");
    setData(null);

    try {
      const res = await fetch(`/api/downloader?platform=twitter&url=${encodeURIComponent(url.trim())}`);
      const json = await res.json();

      if (!res.ok || json.error) {
        throw new Error(json.error || "Failed to fetch X/Twitter post.");
      }

      setData(json.data);
    } catch (err) {
      setError(err.message || "An error occurred while fetching X post.");
    } finally {
      setLoading(false);
    }
  };

  const triggerDownload = (fileUrl, filename) => {
    const a = document.createElement("a");
    a.href = fileUrl;
    a.download = filename || "x_download";
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
          placeholder="Paste X / Twitter post link (e.g. https://x.com/username/status/...)"
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
          
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              {data.author?.avatar && (
                <img src={data.author.avatar} alt={data.author.name} className="w-11 h-11 rounded-full object-cover border border-border/50" />
              )}
              <div>
                <h4 className="font-bold text-base leading-tight">{data.author?.name}</h4>
                <p className="text-xs text-muted-foreground">{data.author?.username}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground bg-accent/40 px-3 py-1.5 rounded-full border border-border/40">
              <span className="flex items-center gap-1"><FiHeart className="text-rose-500" /> {formatCount(data.metrics?.likes)}</span>
              <span className="flex items-center gap-1"><FiRepeat className="text-emerald-500" /> {formatCount(data.metrics?.retweets)}</span>
              {data.metrics?.views > 0 && <span className="flex items-center gap-1"><FiEye /> {formatCount(data.metrics?.views)}</span>}
            </div>
          </div>

          <p className="text-sm text-foreground/90 font-medium leading-relaxed whitespace-pre-wrap">{data.title}</p>

          {data.media && data.media.length > 0 ? (
            <div className="space-y-4">
              <h5 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Extracted Media ({data.media.length})</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.media.map((item, idx) => (
                  <div key={idx} className="border border-border/50 rounded-xl overflow-hidden bg-background/80 p-3 space-y-3">
                    {item.type === "video" ? (
                      <video controls src={item.url} poster={item.thumbnail || data.thumbnail} className="w-full aspect-video rounded-lg object-contain bg-black" />
                    ) : (
                      <img src={item.url} alt={`Media ${idx}`} className="w-full aspect-video rounded-lg object-cover" />
                    )}
                    <button
                      onClick={() => triggerDownload(item.url, `x_media_${idx + 1}`)}
                      className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-accent hover:bg-accent/80 text-xs font-semibold transition-colors"
                    >
                      {item.type === "image" ? <FiImage /> : <FiDownload />}
                      Download {item.quality}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">No direct media files found in this post.</p>
          )}

        </div>
      )}

    </div>
  );
}
