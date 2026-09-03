"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FiSearch, FiLoader, FiPlay, FiEye } from "react-icons/fi";

export default function YouTubeSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!query.trim()) {
      setError("Please enter a keyword to search YouTube.");
      return;
    }
    setLoading(true);
    setError("");
    setResults([]);

    try {
      const res = await fetch(`/api/downloader?platform=youtube&query=${encodeURIComponent(query.trim())}`);
      const json = await res.json();

      if (!res.ok || json.error) {
        throw new Error(json.error || "Failed to search YouTube.");
      }

      if (json.results) {
        setResults(json.results);
      }
    } catch (err) {
      setError(err.message || "An error occurred during search.");
    } finally {
      setLoading(false);
    }
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
          placeholder="Search YouTube videos (e.g. Lofi beats, Tech reviews...)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="h-12 bg-background/50 text-base"
        />
        <Button onClick={handleSearch} disabled={loading} className="h-12 px-8 font-semibold text-sm shrink-0">
          {loading ? (
            <>
              <FiLoader className="w-4 h-4 animate-spin mr-2" />
              Searching...
            </>
          ) : (
            <>
              <FiSearch className="w-4 h-4 mr-2" />
              Search
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

      {results.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-300">
          {results.map((video) => (
            <div key={video.id} className="border border-border/50 rounded-2xl p-4 bg-background/50 flex flex-col justify-between space-y-3">
              <div className="flex gap-3">
                <img src={video.thumbnail} alt={video.title} className="w-28 h-20 rounded-xl object-cover border border-border/40 shrink-0" />
                <div>
                  <h5 className="font-bold text-sm line-clamp-2 leading-tight mb-1">{video.title}</h5>
                  <p className="text-xs text-muted-foreground">{video.author}</p>
                  <div className="flex items-center gap-3 text-[11px] text-muted-foreground mt-2">
                    <span>{video.duration}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><FiEye /> {formatCount(video.views)}</span>
                  </div>
                </div>
              </div>
              
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-accent hover:bg-accent/80 text-xs font-semibold transition-colors"
              >
                <FiPlay /> Watch on YouTube
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
