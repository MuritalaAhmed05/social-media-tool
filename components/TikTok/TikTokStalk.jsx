"use client";
import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FiHeart, FiUser, FiVideo, FiUsers, FiLoader } from "react-icons/fi"; // Importing necessary icons
import { MdVerified } from "react-icons/md";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";
const TikTokProfile = () => {
  const [username, setUsername] = useState(""); // State for TikTok username
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setUsername(e.target.value); // Update username from input field
  };

  const handleSearch = async () => {
    if (!username.trim()) {
      setError("Please enter a valid TikTok username.");
      return;
    }

    setLoading(true);
    setError(null); // Reset any previous errors

    try {
      const response = await axios.get(
        `/api/downloader?action=tiktokstalk&username=${encodeURIComponent(username.trim())}`
      );

      if (response.data.status && response.data.result) {
        setProfileData(response.data.result);
      } else {
        setError(response.data.error || "Failed to fetch profile data.");
      }
    } catch (err) {
      setError("An error occurred while fetching profile data. Please try again.");
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num) => {
    const formattedNum = parseInt(num, 10);
    if (formattedNum >= 1_000_000) {
      return `${(formattedNum / 1_000_000).toFixed(1)}M`; // Millions
    } else if (formattedNum >= 1_000) {
      return `${(formattedNum / 1_000).toFixed(2)}K`; // Thousands
    }
    return formattedNum.toString(); // Less than 1,000
  };

  return (
    <div className="w-full">
      {/* Input Field */}
      <div className="w-full flex flex-col items-center">
        <Input
          type="text"
          placeholder="Enter TikTok Username"
          value={username}
          onChange={handleInputChange}
          className="w-full mb-4"
        />
        <Button
          onClick={handleSearch}
          className="w-full bg-black text-white"
          disabled={loading}
        >
          {loading ? (
            <>
              <FiLoader className="animate-spin mr-2" />
              Searching...
            </>
          ) : (
            <>
              <FaSearch className="mr-2" />
              Search
            </>
          )}
        </Button>
      </div>

      {/* Error State */}
      {error && (
        <Alert variant="destructive" className="w-full mt-4">
          <AlertTitle>Error:</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Profile Data */}
      {profileData && (
        <Card className="shadow-xl p-6 max-w-lg mx-auto mt-6 bg-card text-card-foreground border border-border">
          <div className="flex flex-col items-center mb-6">
            <Avatar className="w-32 h-32 border-4 border-emerald-500/20 shadow-md">
              <AvatarImage
                src={profileData.users.avatarLarger}
                alt={profileData.users.nickname}
                className="object-cover"
              />
              <AvatarFallback className="text-xl font-bold bg-muted">
                {profileData.users.nickname?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>

            <h2 className="text-2xl font-bold mt-3 text-center">
              {profileData.users.nickname}
            </h2>
            <p className="text-sm font-medium text-muted-foreground">
              {profileData.users.username}
            </p>

            {profileData.users.signature && profileData.users.signature !== "TikTok Creator" && (
              <p className="text-sm text-muted-foreground mt-2 whitespace-pre-line text-center max-w-sm leading-relaxed">
                {profileData.users.signature}
              </p>
            )}
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <div className="text-center p-3 rounded-xl bg-accent/50 border border-border/50 flex flex-col items-center justify-center">
              <FiUser size={24} className="text-emerald-500 mb-1" />
              <p className="text-xl font-bold text-foreground">
                {formatNumber(profileData.stats.followingCount)}
              </p>
              <p className="text-xs text-muted-foreground">Following</p>
            </div>
            <div className="text-center p-3 rounded-xl bg-accent/50 border border-border/50 flex flex-col items-center justify-center">
              <FiUsers size={24} className="text-blue-500 mb-1" />
              <p className="text-xl font-bold text-foreground">
                {formatNumber(profileData.stats.followerCount)}
              </p>
              <p className="text-xs text-muted-foreground">Followers</p>
            </div>
            <div className="text-center p-3 rounded-xl bg-accent/50 border border-border/50 flex flex-col items-center justify-center">
              <FiHeart size={24} className="text-rose-500 mb-1" />
              <p className="text-xl font-bold text-foreground">
                {formatNumber(profileData.stats.heartCount)}
              </p>
              <p className="text-xs text-muted-foreground">Hearts</p>
            </div>
            <div className="text-center p-3 rounded-xl bg-accent/50 border border-border/50 flex flex-col items-center justify-center">
              <FiVideo size={24} className="text-purple-500 mb-1" />
              <p className="text-xl font-bold text-foreground">
                {formatNumber(profileData.stats.videoCount)}
              </p>
              <p className="text-xs text-muted-foreground">Videos</p>
            </div>
          </div>

          {/* Visit Profile Button */}
          <div className="flex justify-center mt-2">
            <Button
              variant="outline"
              onClick={() => window.open(profileData.users.url, "_blank")}
              className="w-full sm:w-auto"
            >
              Visit Profile
            </Button>
          </div>

          {/* Other Info */}
          <div className="mt-4 text-center text-xs text-muted-foreground space-y-1">
            <p className="flex items-center justify-center gap-1">
              Verified {profileData.users.verified ? <MdVerified className="text-[#20d5ec]" /> : ": No"}
            </p>
            <p>Private Account: {profileData.users.privateAccount ? "Yes" : "No"}</p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default TikTokProfile;
