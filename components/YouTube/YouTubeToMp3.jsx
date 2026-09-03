"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FiDownload, FiLoader, FiMusic } from "react-icons/fi";

export default function YouTubeToMp3() {
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
        throw new Error(json.error || "Failed to extract audio from YouTube video.");
      }

      setData(json.data);
    } catch (err) {
      setError(err.message || "An error occurred while converting audio.");
    } finally {
      setLoading(false);
    }
  };

  const triggerDownload = (fileUrl, filename) => {
    const a = document.createElement("a");
    a.href = fileUrl;
    a.download = filename || "youtube_audio.mp3";
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const audioStreams = data?.media?.filter((m) => m.type === "audio") || [];

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          type="text"
          placeholder="Paste YouTube Video link for MP3 audio conversion..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleFetch()}
          className="h-12 bg-background/50 text-base"
        />
        <Button onClick={handleFetch} disabled={loading} className="h-12 px-8 font-semibold text-sm shrink-0">
          {loading ? (
            <>
              <FiLoader className="w-4 h-4 animate-spin mr-2" />
              Converting...
            </>
          ) : (
            <>
              <FiMusic className="w-4 h-4 mr-2" />
              Convert to MP3
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
              <img src={data.thumbnail} alt={data.title} className="w-24 h-24 rounded-xl object-cover border border-border/50 shrink-0" />
            )}
            <div>
              <h4 className="font-bold text-base leading-tight mb-1">{data.title}</h4>
              <p className="text-xs text-muted-foreground">{data.author?.name}</p>
            </div>
          </div>

          <div className="space-y-2">
            <h5 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Audio Downloads</h5>
            {audioStreams.length > 0 ? (
              audioStreams.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => triggerDownload(item.url, `${data.title}.mp3`)}
                  className="w-full flex items-center justify-between p-3.5 rounded-xl bg-accent/50 hover:bg-accent border border-border/50 text-sm font-semibold transition-all group"
                >
                  <span className="flex items-center gap-2">
                    <FiMusic className="w-4 h-4 text-emerald-500" />
                    {item.quality}
                  </span>
                  <span className="text-xs text-muted-foreground group-hover:text-foreground">Download MP3 &rarr;</span>
                </button>
              ))
            ) : (
              <button
                onClick={() => triggerDownload(data.media?.[0]?.url, `${data.title}.mp4`)}
                className="w-full flex items-center justify-between p-3.5 rounded-xl bg-accent/50 hover:bg-accent border border-border/50 text-sm font-semibold transition-all group"
              >
                <span className="flex items-center gap-2">
                  <FiDownload className="w-4 h-4 text-primary" />
                  Extract Audio / Media File
                </span>
                <span className="text-xs text-muted-foreground group-hover:text-foreground">Download &rarr;</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
