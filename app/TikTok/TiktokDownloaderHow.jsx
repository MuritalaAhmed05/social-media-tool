"use client";
import React from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"; // Assuming you have ShadCN Accordion components

export default function TiktokDownloaderHow() {
  const steps = [
    {
      title: "Open the TikTok app and locate the video you want to download.",
      image: "/TikTok/img1.jpg",
      alt: "Open TikTok App",
    },
    {
      title:
        'If the video does not have a save option, click on the "Share" or "Link" icon as shown below.',
      image: "/TikTok/img2.jpg",
      alt: "Click on Share/Link Icon",
    },
    {
      title:
        'Copy the video link and paste it into the input field provided in the TikTok Downloader. Then, click the "Download" button.',
      image: "/TikTok/img3.jpg",
      alt: "Paste Link and Click Download",
    },
    {
      title:
        "The video details will be processed in just a few seconds, as demonstrated below.",
      image: "/TikTok/img4.jpg",
      alt: "Generated Video Info",
    },
    {
      title: "Select the media type and download size that suits your needs.",
      image: "/TikTok/img5.jpg",
      alt: "Choose Media Type",
    },
    {
      title: 'Click the "Download" button to save the media to your device.',
      image: "/TikTok/img6.jpg",
      alt: "Save Media",
    },
  ];

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">
        How to Use TikTok Downloader
      </h1>

      <Accordion type="single" collapsible>
        {steps.map((step, index) => (
          <AccordionItem key={index} value={`step-${index}`}>
            <AccordionTrigger className="w-full text-left font-semibold text-gray-800 flex justify-between items-center">
              {index + 1}. {step.title}
            </AccordionTrigger>
            <AccordionContent>
              <div className="mt-4">
                <img
                  src={step.image}
                  alt={step.alt}
                  className="w-full md:w-2/3 lg:w-1/2 mx-auto rounded-md shadow-md"
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
