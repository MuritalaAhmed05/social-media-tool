"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FiDownload, FiLoader, FiMusic } from "react-icons/fi";
import { FaSpotify } from "react-icons/fa6";

export default function SpotifyDownload() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFetch = async () => {
    if (!url.trim()) {
      setError("Please enter a valid Spotify track link.");
      return;
    }
    setLoading(true);
    setError("");
    setData(null);

    try {
      const res = await fetch(`/api/downloader?platform=spotify&url=${encodeURIComponent(url.trim())}`);
      const json = await res.json();

      if (!res.ok || json.error) {
        throw new Error(json.error || "Failed to fetch Spotify track.");
      }

      setData(json.data);
    } catch (err) {
      setError(err.message || "An error occurred while fetching Spotify track.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          type="text"
          placeholder="Paste Spotify Track URL (e.g. https://open.spotify.com/track/...)"
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
              <FaSpotify className="w-4 h-4 mr-2 text-emerald-500" />
              Fetch Track
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
          
          <div className="flex items-center gap-4">
            {data.thumbnail && (
              <img src={data.thumbnail} alt={data.title} className="w-24 h-24 rounded-2xl object-cover border border-border/50 shadow-md shrink-0" />
            )}
            <div>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full mb-2">
                <FaSpotify /> Spotify Track
              </span>
              <h4 className="font-bold text-base leading-tight">{data.title}</h4>
              <p className="text-xs text-muted-foreground">{data.author?.name}</p>
            </div>
          </div>

          {data.iframeUrl && (
            <div className="w-full rounded-2xl overflow-hidden border border-border/40 bg-black/40">
              <iframe
                src={data.iframeUrl}
                width="100%"
                height="152"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded-2xl"
              />
            </div>
          )}

        </div>
      )}

    </div>
  );
}
