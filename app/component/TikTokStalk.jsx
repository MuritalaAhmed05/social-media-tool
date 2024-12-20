"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FiDownload, FiLoader } from "react-icons/fi";
import { FaShare } from "react-icons/fa6";

export default function TikTokDownloader() {
  const [videoUrl, setVideoUrl] = useState("");
  const [videoData, setVideoData] = useState(null);
  const [audioUrl, setAudioUrl] = useState("");
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
    setAudioUrl("");

    try {
      // Fetch video data
      const videoResponse = await fetch(
        `https://deliriussapi-oficial.vercel.app/download/tiktok?url=${videoUrl}`
      );

      if (!videoResponse.ok) {
        throw new Error("Failed to fetch video details. Please try again.");
      }

      const videoData = await videoResponse.json();

      if (!videoData.status) {
        throw new Error("Invalid video URL or the video cannot be downloaded.");
      }

      setVideoData(videoData.data);

      // Fetch audio data
      const audioResponse = await fetch(
        `https://bk9.fun/download/tiktok2?url=${videoUrl}`
      );

      if (!audioResponse.ok) {
        throw new Error("Failed to fetch audio details. Please try again.");
      }

      const audioData = await audioResponse.json();

      if (!audioData.status) {
        throw new Error("Audio is not available for this video.");
      }

      setAudioUrl(audioData.BK9.audio);
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

  const formatNumber = (numString) => {
    const num = parseInt(numString.replace(".", ""), 10); // Convert string to number
    if (num >= 1_000_000) {
      return `${(num / 1_000_000).toFixed(1)}M`; // Millions
    } else if (num >= 1_000) {
      return `${(num / 1_000).toFixed(1)}K`; // Thousands
    }
    return num.toString(); // Less than 1,000
  };

  return (
    <section className="w-full ">
      <div className="w-full flex flex-col items-center">
        <Input
          type="text"
          placeholder="Paste TikTok video URL here"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          className="w-full mb-4"
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
          <Alert variant="destructive" className="w-full mt-4">
            <AlertTitle>Error:</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>

      {videoData && (
        <div className="mt-6 w-full space-y-6 ">
          <div className="relative overflow-hidden flex justify-center items-center rounded-lg ">
            <video
              controls
              className="w-full h-auto rounded-lg max-w-lg"
              src={videoData.meta.media[0]?.org || ""}
            />
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-bold">Caption: {videoData.title}</h3>
            <p className="text-sm text-gray-800 ">
              Username: {videoData.author.username} <br />
              Nickname: {videoData.author.nickname}
            </p>
            <p className="text-sm text-gray-600">
              Published: {videoData.published}
            </p>
            <p className="text-sm text-gray-600">
              Duration: {videoData.duration} seconds
            </p>
            <div className="flex space-x-6 text-gray-600">
              <p>❤️ {formatNumber(videoData.like || "0")}</p>
              <p>💬 {formatNumber(videoData.comment || "0")}</p>
              <p className="flex items-center gap-1">
                <FaShare /> {formatNumber(videoData.share || "0")}
              </p>
            </div>

            <div>
                <p></p>
                <audio id="audioPlayer" controls className="bg-[#F1F3F4] rounded-lg">
                  <source src={audioUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-4">
                       <h3 className="text-xl font-semibold">Download Options</h3>
                       {videoData.meta.media.map((media, index) => (
                         <div
                           key={index}
                           className="flex items-center justify-between p-4 bg-gray-100 rounded-lg"
                         >
                           <p className="text-sm font-medium capitalize">
                             {media.type} ({media.size_org || media.size_hd || media.size_wm})
                           </p>
                           <div className="flex space-x-2">
                             {media.org && (
                               <Button
                                 onClick={() =>
                                   downloadFile(media.org, `${videoData.title}_Original.mp4`)
                                 }
                                 className="bg-green-500 text-white"
                               >
                                 Original
                               </Button>
                             )}
                             {media.hd && (
                               <Button
                                 onClick={() =>
                                   downloadFile(media.hd, `${videoData.title}_HD.mp4`)
                                 }
                                 className="bg-blue-500 text-white"
                               >
                                 HD
                               </Button>
                             )}
                             {media.wm && (
                               <Button
                                 onClick={() =>
                                   downloadFile(media.wm, `${videoData.title}_Watermarked.mp4`)
                                 }
                                 className="bg-red-500 text-white"
                               >
                                 Watermarked
                               </Button>
                             )}
                           </div>
                         </div>
                       ))}
                     </div>

                   

            {audioUrl && (
              <div className="flex justify-between p-4 bg-gray-100 rounded-lg">
                <p className="text-sm font-medium">Audio</p>
                <Button onClick={() => downloadFile(audioUrl, "audio.mp3")}>
                  Download
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
