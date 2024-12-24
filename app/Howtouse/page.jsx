"use client";
import React from "react";
import { ThemeProvider } from "../component/ThemeProvider";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function HowToUse() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <section className="py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-6">How to Use</h1>
          <p className="text-lg text-center mb-8">
            Follow these simple steps to download your favorite content
            seamlessly!
          </p>

          <Accordion type="single" collapsible className="space-y-4">
            {/* Step 1 */}
            <AccordionItem value="step1">
              <AccordionTrigger className="text-lg font-semibold">
                Step 1: Copy the Link
              </AccordionTrigger>
              <AccordionContent>
                Open your desired social media platform and find the video or
                post you want to download. Click on the{" "}
                <span className="font-semibold">Share</span> option and select{" "}
                <span className="font-semibold">Copy URL</span>.
              </AccordionContent>
            </AccordionItem>

            {/* Step 2 */}
            <AccordionItem value="step2">
              <AccordionTrigger className="text-lg font-semibold">
                Step 2: Open Our App
              </AccordionTrigger>
              <AccordionContent>
                Launch our app and navigate to the section dedicated to the
                social media platform you want to download content from.
              </AccordionContent>
            </AccordionItem>

            {/* Step 3 */}
            <AccordionItem value="step3">
              <AccordionTrigger className="text-lg font-semibold">
                Step 3: Paste the Link
              </AccordionTrigger>
              <AccordionContent>
                Paste the copied link into the input field provided in our app
                for that specific platform.
              </AccordionContent>
            </AccordionItem>

            {/* Step 4 */}
            <AccordionItem value="step4">
              <AccordionTrigger className="text-lg font-semibold">
                Step 4: Choose Download Quality
              </AccordionTrigger>
              <AccordionContent>
                Select your preferred download quality (e.g., SD, HD, or 4K)
                from the available options. This ensures you get the best
                resolution for your needs.
              </AccordionContent>
            </AccordionItem>

            {/* Step 5 */}
            <AccordionItem value="step5">
              <AccordionTrigger className="text-lg font-semibold">
                Step 5: Click Download
              </AccordionTrigger>
              <AccordionContent>
                Press the <span className="font-semibold">Download</span>{" "}
                button. The content will be saved directly to your phone in
                seconds, without watermarks or hassle.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </ThemeProvider>
  );
}
