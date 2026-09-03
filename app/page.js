import React from "react";
import TabsDemo from "@/components/custom/Tabs";

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-5rem)] bg-background bg-grid-pattern relative pb-20">
      
      {/* Background radial highlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-primary/5 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 md:pt-16 pb-8 text-center relative z-10">
        
        {/* Feature Badges */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/80 border border-border/50 text-xs font-semibold text-muted-foreground mb-6 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Universal Social Media Media Grabber</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground max-w-4xl mx-auto leading-tight mb-4">
          Download HD Media & Audio <br className="hidden sm:inline" />
          <span className="text-muted-foreground font-medium">Without Limits or Watermarks.</span>
        </h1>

        {/* Hero Subtitle */}
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 font-normal">
          Paste any link from TikTok, Instagram, X (Twitter), YouTube, Facebook, or Spotify to extract crystal clear MP4 videos, MP3 audio, and photo slides in seconds.
        </p>

        {/* Main Downloader Component */}
        <div className="max-w-4xl mx-auto text-left">
          <TabsDemo />
        </div>
      </div>
    </main>
  );
}
