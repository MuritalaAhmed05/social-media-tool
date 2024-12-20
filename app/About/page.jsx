"use client";
import React from "react";
import { ThemeProvider } from "../component/ThemeProvider";

const features = [
  {
    title: "No Watermark",
    description: "Download content without any intrusive watermarks, ensuring clean and professional results.",
  },
  {
    title: "High Resolution",
    description: "Get your content in the best possible quality, with high-resolution downloads for all media types.",
  },
  {
    title: "Variety of Social Media",
    description: "Support for a wide range of platforms, so you can grab content from all your favorite social networks.",
  },
  {
    title: "Fast Downloads",
    description: "Experience lightning-fast download speeds, so you can save content in seconds.",
  },
  {
    title: "Easy to Use",
    description: "A simple, user-friendly interface that anyone can navigate, making it effortless to find and download content.",
  },
];

export default function About() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <section className="py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-6">About Our App</h1>
          <p className="text-lg text-center mb-8">
            Our app is designed to make your digital life easier by allowing you to search, download, and save content from various social media platforms directly to your phone. It's fast, reliable, and designed with you in mind.
          </p>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="shadow-lg rounded-lg p-6 text-center"
              >
                <h2 className="text-2xl font-semibold mb-4">{feature.title}</h2>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </ThemeProvider>
  );
}
