"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FiDownload, FiLoader } from "react-icons/fi";
import { FaSpinner } from "react-icons/fa";
import { FaShare } from "react-icons/fa6";
export default function TikTokDownloader() {
  const [videoUrl, setVideoUrl] = useState("");
  const [videoData, setVideoData] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [played, setPlayed] = useState("searching...");
  const [shared, setShared] = useState("searching...");
  const [commented, setCommented] = useState("searching...");
  const [selectedMedia, setSelectedMedia] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [downloadSize, setDownloadSize] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);
  const handleDownload = async () => {
    if (!videoUrl) {
      setError("Please enter a valid TikTok video URL.");
      return;
    }
    setLoading(true);
    setError("");
    setVideoData(null);
    setAudioUrl(null);
    try {
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
      const audioResponse = await fetch(
        `https://bk9.fun/download/tiktok2?url=${videoUrl}`
      );
      if (!audioResponse.ok) {
        throw new Error("Failed to fetch audio details. Please try again.");
      }
      const audioData = await audioResponse.json();
      console.log(audioData);
      if (!audioData.status) {
        throw new Error("Audio is not available for this video.");
      }
      setAudioUrl(audioData.BK9.audio);
      setShared(audioData.BK9.shared || "Unknown");
      setPlayed(audioData.BK9.played || "Unknown");
      setCommented(audioData.BK9.commented || "Unknown");
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };
  function formatNumber(numString) {
    const num = parseInt(numString.replace(".", ""));
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    } else {
      return num.toString();
    }
  }
  const downloadFile = async (url, filename) => {
    setIsDownloading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch the file");
      }
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setIsDownloading(false);
    }
  };
  const downloadImageFile = async (url, filename) => {
    setIsDownloading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch the file");
      }
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setIsDownloading(false);
    }
  };
  const handleSelectChange = (value, media) => {
    setSelectedMedia(value);
    switch (value) {
      case "original":
        setDownloadUrl(media.org);
        setDownloadSize(media.size_org || "Unknown size");
        break;
      case "hd":
        setDownloadUrl(media.hd);
        setDownloadSize(media.size_hd || "Unknown size");
        break;
      case "watermarked":
        setDownloadUrl(media.wm);
        setDownloadSize(media.size_wm || "Unknown size");
        break;
      default:
        setDownloadUrl("");
        setDownloadSize("");
    }
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
          className="w-full bg-black text-white"
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
          {}
          <div className="relative overflow-hidden flex justify-center items-center rounded-lg">
            {videoData.meta.media[0]?.type === "video" ? (
              <video
                controls
                className="w-full h-auto rounded-lg max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-3xl sm:aspect-video sm:object-contain sm:rounded-lg"
                src={videoData.meta.media[0]?.org || ""}
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
                {videoData.meta.media[0]?.images?.map((image, index) => (
                  <div key={index} className="mb-4">
                    <img
                      className="w-full h-auto rounded-lg object-cover"
                      src={image}
                      alt={`Image ${index + 1}`}
                    />
                    <button
                      onClick={() =>
                        downloadImageFile(image, `Image_${index + 1}.jpg`)
                      }
                      className="block mt-2 px-4 py-2 text-white bg-black rounded-lg text-center hover:bg-black"
                    >
                      Download Image {index + 1}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-bold">
              <span className="text-gray-700">Caption</span>:<br />
              {videoData.title}
            </h3>
            <p className="text-sm text-gray-800 ">
              UserName: {videoData.author.username} <br />
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
              <p>👀 {played || 0}</p>
              <p>💬 {commented || 0}</p>
              <p className="flex items-center justify-center gap-1">
                <FaShare /> {shared || 0}
              </p>
            </div>
          </div>
          {(audioUrl || videoData.meta.media[0]?.audio) && (
            <div className="audio-container">
              <h2>
                song : {videoData.music.author} - {videoData.music.title}
              </h2>
              <audio
                controls
                className="bg-[#F1F3F4] rounded-lg mt-1 max-w-full"
              >
                <source
                  src={audioUrl || videoData.meta.media[0]?.audio}
                  type="audio/mp3"
                />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}
          {}
          <div className="space-y-4">
            {videoData.meta.media.map((media, index) => (
              <div key={index} className="p-4 bg-gray-100 rounded-lg">
                <h2 className="font-bold text-md">
                  Download {media.type === "image" ? "Images" : "Video"}
                </h2>
                <p className="text-sm font-medium mb-2">Size: {downloadSize}</p>
                <div className="flex space-x-2 items-center justify-center flex-wrap space-y-2">
                  {}
                  <Select
                    onValueChange={(value) => handleSelectChange(value, media)}
                  >
                    <SelectTrigger className="bg-gray-200 text-black p-2 rounded-lg outline-none">
                      <SelectValue
                        placeholder="Choose Media"
                        className="outline-none"
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-white border rounded-lg outline-none">
                      {media.org && (
                        <SelectItem value="original">Original</SelectItem>
                      )}
                      {media.hd && <SelectItem value="hd">HD</SelectItem>}
                      {media.wm && (
                        <SelectItem value="watermarked">Watermarked</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  {}
                  {media.type === "image" ? (
                    <button
                      onClick={() =>
                        media.images.forEach((image, idx) =>
                          downloadFile(image, `Image_${idx + 1}.jpg`)
                        )
                      }
                      className="bg-black text-white px-4 py-2 self-start rounded-lg text-nowrap flex items-center justify-center w-full"
                      disabled={isDownloading}
                    >
                      {isDownloading ? (
                        <FaSpinner className="animate-spin" />
                      ) : (
                        <>Download All Images</>
                      )}
                    </button>
                  ) : (
                    selectedMedia &&
                    downloadUrl && (
                      <button
                        onClick={() =>
                          downloadFile(
                            downloadUrl,
                            `${videoData.title}_${selectedMedia}.mp4`
                          )
                        }
                        className="bg-black text-white px-4 py-2 self-start rounded-lg text-nowrap flex items-center justify-center w-full"
                        disabled={isDownloading}
                      >
                        {isDownloading ? (
                          <FaSpinner className="animate-spin" />
                        ) : (
                          <>
                            Download{" "}
                            {selectedMedia.charAt(0).toUpperCase() +
                              selectedMedia.slice(1)}
                          </>
                        )}
                      </button>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
          {audioUrl && (
            <div className="flex justify-between p-4 bg-gray-100 rounded-lg items-center">
              <div className="flex flex-col">
                <h2 className="font-bold text-md">Download Audio</h2>
                <p className="text-sm font-medium">
                  Audios are downloaded in Mp3
                </p>
              </div>
              <Button onClick={() => downloadFile(audioUrl, "audio.mp3")}>
                Download
              </Button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
