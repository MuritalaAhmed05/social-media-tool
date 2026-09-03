"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import {
  FaTiktok,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
  FaFacebook,
  FaSpotify,
} from "react-icons/fa6";

import TikTokDownloader from "@/components/TikTok/TiktokDownload";
import TikTokProfile from "@/components/TikTok/TikTokStalk";
import TikTokSearch from "@/components/TikTok/TikTokSearch";
import InstagramDownload from "@/components/Instagram/InstagramDownload";
import XDownload from "@/components/X/XDownload";
import YouTubeDownload from "@/components/YouTube/YouTubeDownload";
import YouTubeToMp3 from "@/components/YouTube/YouTubeToMp3";
import YouTubeSearch from "@/components/YouTube/YouTubeSearch";
import FaceBookDownload from "@/components/FaceBook/FaceBookDownload";
import SpotifyDownload from "@/components/Spotify/SpotifyDownload";

export function TabsDemo() {
  const platforms = [
    { id: "TikTok", name: "TikTok", icon: FaTiktok },
    { id: "Instagram", name: "Instagram", icon: FaInstagram },
    { id: "X", name: "Twitter / X", icon: FaXTwitter },
    { id: "YouTube", name: "YouTube", icon: FaYoutube },
    { id: "FaceBook", name: "Facebook", icon: FaFacebook },
    { id: "Spotify", name: "Spotify", icon: FaSpotify },
  ];

  return (
    <div className="w-full">
      <Tabs defaultValue="TikTok" className="w-full">
        
        {/* Main Platform Navigation Tabs */}
        <TabsList className="grid grid-cols-3 md:grid-cols-6 h-auto p-1.5 bg-muted/60 backdrop-blur-md rounded-2xl border border-border/50 gap-1.5 mb-8 shadow-sm">
          {platforms.map((platform) => {
            const Icon = platform.icon;
            return (
              <TabsTrigger
                key={platform.id}
                value={platform.id}
                className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm hover:text-foreground"
              >
                <Icon className="w-4 h-4" />
                <span className="truncate">{platform.name}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {/* TikTok Tab Content */}
        <TabsContent value="TikTok" className="focus-visible:outline-none">
          <Card className="border-border/50 shadow-xl rounded-2xl overflow-hidden bg-card/90 backdrop-blur-sm">
            <CardContent className="p-6 md:p-8">
              <Tabs defaultValue="downloader" className="w-full">
                <TabsList className="grid w-full grid-cols-3 h-11 bg-accent/50 p-1 rounded-xl mb-6">
                  <TabsTrigger value="downloader" className="rounded-lg text-xs font-semibold">
                    Downloader
                  </TabsTrigger>
                  <TabsTrigger value="stalk" className="rounded-lg text-xs font-semibold">
                    Profile Stalk
                  </TabsTrigger>
                  <TabsTrigger value="search" className="rounded-lg text-xs font-semibold">
                    Search Videos
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="downloader">
                  <TikTokDownloader />
                </TabsContent>
                <TabsContent value="stalk">
                  <TikTokProfile />
                </TabsContent>
                <TabsContent value="search">
                  <TikTokSearch />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Instagram Tab Content */}
        <TabsContent value="Instagram" className="focus-visible:outline-none">
          <Card className="border-border/50 shadow-xl rounded-2xl overflow-hidden bg-card/90 backdrop-blur-sm">
            <CardContent className="p-6 md:p-8">
              <div className="mb-6">
                <h2 className="text-xl font-bold tracking-tight">Instagram Media Downloader</h2>
                <p className="text-sm text-muted-foreground">Download Reels, IGTV, posts and stories effortlessly.</p>
              </div>
              <InstagramDownload />
            </CardContent>
          </Card>
        </TabsContent>

        {/* X / Twitter Tab Content */}
        <TabsContent value="X" className="focus-visible:outline-none">
          <Card className="border-border/50 shadow-xl rounded-2xl overflow-hidden bg-card/90 backdrop-blur-sm">
            <CardContent className="p-6 md:p-8">
              <div className="mb-6">
                <h2 className="text-xl font-bold tracking-tight">X / Twitter Downloader</h2>
                <p className="text-sm text-muted-foreground">Extract HD videos, GIFs, and photos from any tweet.</p>
              </div>
              <XDownload />
            </CardContent>
          </Card>
        </TabsContent>

        {/* YouTube Tab Content */}
        <TabsContent value="YouTube" className="focus-visible:outline-none">
          <Card className="border-border/50 shadow-xl rounded-2xl overflow-hidden bg-card/90 backdrop-blur-sm">
            <CardContent className="p-6 md:p-8">
              <Tabs defaultValue="downloader" className="w-full">
                <TabsList className="grid w-full grid-cols-3 h-11 bg-accent/50 p-1 rounded-xl mb-6">
                  <TabsTrigger value="downloader" className="rounded-lg text-xs font-semibold">
                    Video Downloader
                  </TabsTrigger>
                  <TabsTrigger value="mp3" className="rounded-lg text-xs font-semibold">
                    Audio / MP3
                  </TabsTrigger>
                  <TabsTrigger value="search" className="rounded-lg text-xs font-semibold">
                    YouTube Search
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="downloader">
                  <YouTubeDownload />
                </TabsContent>
                <TabsContent value="mp3">
                  <YouTubeToMp3 />
                </TabsContent>
                <TabsContent value="search">
                  <YouTubeSearch />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Facebook Tab Content */}
        <TabsContent value="FaceBook" className="focus-visible:outline-none">
          <Card className="border-border/50 shadow-xl rounded-2xl overflow-hidden bg-card/90 backdrop-blur-sm">
            <CardContent className="p-6 md:p-8">
              <div className="mb-6">
                <h2 className="text-xl font-bold tracking-tight">Facebook Downloader</h2>
                <p className="text-sm text-muted-foreground">Download public Facebook videos and watch reels in HD quality.</p>
              </div>
              <FaceBookDownload />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Spotify Tab Content */}
        <TabsContent value="Spotify" className="focus-visible:outline-none">
          <Card className="border-border/50 shadow-xl rounded-2xl overflow-hidden bg-card/90 backdrop-blur-sm">
            <CardContent className="p-6 md:p-8">
              <div className="mb-6">
                <h2 className="text-xl font-bold tracking-tight">Spotify Music Info & Preview</h2>
                <p className="text-sm text-muted-foreground">Extract track details, high-res cover art, and audio previews.</p>
              </div>
              <SpotifyDownload />
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
}

export default TabsDemo;
