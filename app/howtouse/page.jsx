"use client";

import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function HowToUse() {
  const steps = [
    {
      id: "step1",
      num: "01",
      title: "Copy the Link",
      content: "Open TikTok, Instagram, Twitter/X, YouTube, Facebook, or Spotify. Find the video, post, or track you want to save, tap 'Share', and select 'Copy Link'.",
    },
    {
      id: "step2",
      num: "02",
      title: "Select Platform Tab",
      content: "Open VidGrab and choose the corresponding platform tab (e.g., TikTok, YouTube, Instagram) at the top of the page.",
    },
    {
      id: "step3",
      num: "03",
      title: "Paste & Click Fetch",
      content: "Paste the copied URL into the search bar and click 'Fetch Video' or press Enter to load the media details.",
    },
    {
      id: "step4",
      num: "04",
      title: "Select Format & Download",
      content: "Choose your preferred media format (HD Video, No-Watermark, MP3 Audio, Photo Slide) and click the Download button to save the file instantly to your device.",
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">How to Use VidGrab</h1>
        <p className="text-base sm:text-lg text-muted-foreground">
          Follow these simple steps to download videos, photos, and audio files in seconds.
        </p>
      </div>

      <div className="border border-border/50 rounded-2xl bg-card/60 backdrop-blur-sm p-6 sm:p-8 shadow-sm">
        <Accordion type="single" collapsible defaultValue="step1" className="space-y-4">
          {steps.map((step) => (
            <AccordionItem key={step.id} value={step.id} className="border-border/40 px-2">
              <AccordionTrigger className="text-base sm:text-lg font-bold hover:no-underline py-4">
                <span className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xs font-extrabold">
                    {step.num}
                  </span>
                  {step.title}
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pl-11 pb-4">
                {step.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
