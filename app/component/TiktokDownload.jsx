"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FiDownload, FiLoader, FiVideo } from "react-icons/fi";

export default function TikTokDownloader() {
  const [videoUrl, setVideoUrl] = useState("");
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDownload = async () => {
    if (!videoUrl) {
      setError("Please enter a valid TikTok video URL.");
      return;
    }
    setLoading(true);
    setError("");
    setVideoData(null);

    try {
      const response = await fetch(
        `https://deliriussapi-oficial.vercel.app/download/tiktok?url=${videoUrl}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch video details. Please try again.");
      }

      const data = await response.json();

      if (!data.status) {
        throw new Error("Invalid video URL or the video cannot be downloaded.");
      }

      setVideoData(data.data);
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const downloadFile = async (url, filename) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;
      link.click();
    } catch {
      setError("Failed to download the file. Please try again.");
    }
  };

  return (
    <section className="py-10">
      <div className="container px-1 w-full">
        <Card className="shadow-lg">
          <CardContent>
            <div className="flex flex-col items-center space-y-4">
              <Input
                type="text"
                placeholder="Paste TikTok video URL here"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className="w-full mt-4"
              />
              <Button
                onClick={handleDownload}
                className="w-full"
                disabled={loading}
                variant="primary"
              >
                {loading ? (
                  <>
                    <FiLoader className="animate-spin mr-2" />
                    Loading...
                  </>
                ) : (
                  <>
                    <FiDownload className="mr-2" />
                    Download
                  </>
                )}
              </Button>
              {error && (
                <Alert variant="destructive" className="w-full">
                  <AlertTitle>Error: </AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </div>

            {videoData && (
              <div className="mt-6">
                {/* Video Player Section */}
              
                <div className="relative w-full  overflow-hidden flex justify-center items-center rounded-lg">
                  <video
                    controls
                    className="w-[350px] self-center items-center h-full rounded-lg"
                    src={videoData.meta.media[0]?.org || ""}
                  />
                  {!videoData.meta.media[0]?.org && (
                    <div className="flex items-center justify-center ">
                      <FiVideo className="text-white text-6xl" />
                    </div>
                  )}
                </div>

                {/* Video Details */}
                <div className="mt-4 space-y-2">
                  <p className="text-lg font-bold">{videoData.title}</p>
                  <p className="text-sm text-gray-600">
                    By: {videoData.author.nickname} (@{videoData.author.username})
                  </p>
                  <p className="text-sm text-gray-600">
                    Published: {videoData.published}
                  </p>
                  <p className="text-sm text-gray-600">
                    Duration: {videoData.duration} seconds
                  </p>
                  <div className="flex space-x-6 text-gray-600 mt-2">
                    <p>❤️ {videoData.likes || "N/A"}</p>
                    <p>💬 {videoData.comments || "N/A"}</p>
                    <p>🔗 {videoData.shares || "N/A"}</p>
                  </div>
                </div>

                {/* Download Options */}
                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-4">Download Options</h3>
                  <div className="space-y-4">
                    {videoData.meta.media.map((media, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-gray-100 rounded-lg"
                      >
                        <p className="text-sm font-medium capitalize">
                          {media.type} ({media.size_org || media.size_hd || media.size_wm})
                        </p>
                        <Button
                          onClick={() =>
                            downloadFile(
                              media.org || media.hd || media.wm,
                              `${videoData.title || "tiktok-video"}_${media.type}.mp4`
                            )
                          }
                          className="bg-green-500 text-white"
                        >
                          <FiDownload className="mr-2" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
