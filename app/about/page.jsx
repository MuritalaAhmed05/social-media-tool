"use client";

import React from "react";
import { FiCheckCircle, FiZap, FiShield, FiSmile, FiLayers, FiTv } from "react-icons/fi";

const features = [
  {
    icon: FiShield,
    title: "No Watermark",
    description: "Download video content without intrusive logos or watermarks for clean, high-quality media.",
  },
  {
    icon: FiTv,
    title: "Ultra HD Quality",
    description: "Extract videos and photos in maximum available resolution up to 4K and 1080p.",
  },
  {
    icon: FiLayers,
    title: "Multi-Platform Support",
    description: "Supports TikTok, Instagram, X (Twitter), YouTube, Facebook, and Spotify audio.",
  },
  {
    icon: FiZap,
    title: "Lightning Fast",
    description: "Direct server-side processing ensures instant links without tedious waiting screens.",
  },
  {
    icon: FiSmile,
    title: "Clean & Ad-Free Interface",
    description: "Distraction-free minimalist interface designed for speed and accessibility on mobile & desktop.",
  },
  {
    icon: FiCheckCircle,
    title: "100% Free & Unlimited",
    description: "No subscription required. Download as many videos, photos, and music tracks as you need.",
  },
];

export default function About() {
  return (
    <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">About VidGrab</h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          VidGrab is a high-performance, privacy-conscious social media downloader designed to extract media assets directly from your favorite platforms with maximum speed and zero friction.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div key={index} className="border border-border/50 bg-card/60 backdrop-blur-sm rounded-2xl p-6 shadow-sm hover:border-border transition-all">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
