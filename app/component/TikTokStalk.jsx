"use client";
import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FiHeart, FiUser, FiVideo, FiUsers, FiDownload, FiLoader } from "react-icons/fi"; // Importing necessary icons
import { MdVerified } from "react-icons/md";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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
        `https://deliriussapi-oficial.vercel.app/tools/tiktokstalk?q=${username}`
      );

      if (response.data.status) {
        setProfileData(response.data.result);
      } else {
        setError("Failed to fetch profile data.");
      }
    } catch (err) {
      setError("An error occurred while fetching the data. Please try again.");
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
        <input
          type="text"
          placeholder="Enter TikTok Username"
          value={username}
          onChange={handleInputChange}
          className="w-full mb-4 p-3 rounded-lg border border-black text-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all"
        />
        <Button
          onClick={handleSearch}
          className="w-full bg-black text-white mb-5"
          disabled={loading}
        >
          {loading ? (
            <>
              <FiLoader className="animate-spin mr-2" />
              Loading...
            </>
          ) : (
            <>
              <FiDownload className="mr-2" />
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
        <Card className="shadow-xl p-6 max-w-lg mx-auto">
          <div className="flex flex-col items-center mb-4">
            <Avatar size="xl" className="w-[150px] h-[150px]">
              <AvatarImage
                src={profileData.users.avatarLarger}
                alt="pfp"
                className="mb-4"
              />
              <AvatarFallback>Loading..</AvatarFallback>
            </Avatar>
            <h2 className="text-2xl font-semibold">{profileData.users.nickname}</h2>
            <p className="text-lg text-gray-500 whitespace-pre-line text-center">
              {profileData.users.signature}
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 rounded-lg shadow-lg flex flex-col items-center justify-center">
              <FiUser size={28} className="text-green-500 mb-2 text-center" />
              <p className="text-2xl font-semibold text-gray-800">
                {formatNumber(profileData.stats.followingCount)}
              </p>
              <p className="text-sm text-gray-500">Following</p>
            </div>
            <div className="text-center p-4 rounded-lg shadow-lg flex flex-col items-center justify-center">
              <FiUsers size={28} className="text-blue-500 mb-2 text-center" />
              <p className="text-2xl font-semibold text-gray-800">
                {formatNumber(profileData.stats.followerCount)}
              </p>
              <p className="text-sm text-gray-500">Followers</p>
            </div>
            <div className="text-center p-4 rounded-lg shadow-lg flex flex-col items-center justify-center">
              <FiHeart size={28} className="text-red-500 mb-2 text-center" />
              <p className="text-2xl font-semibold text-gray-800">
                {formatNumber(profileData.stats.heartCount)}
              </p>
              <p className="text-sm text-gray-500">Hearts</p>
            </div>
            <div className="text-center p-4 rounded-lg shadow-lg flex flex-col items-center justify-center">
              <FiVideo size={28} className="text-purple-500 mb-2 text-center" />
              <p className="text-2xl font-semibold text-gray-800">
                {formatNumber(profileData.stats.videoCount)}
              </p>
              <p className="text-sm text-gray-500">Videos</p>
            </div>
          </div>

          {/* Visit Profile Button */}
          <div className="flex justify-center mt-4">
            <Button
              variant="outline"
              onClick={() => window.open(profileData.users.url, "_blank")}
            >
              Visit Profile
            </Button>
          </div>

          {/* Other Info */}
          <div className="mt-4 text-center">
            <p className="text-lg text-gray-600 flex items-center justify-center">
              Verified <MdVerified className="text-[#20d5ec]" />:{" "}
              {profileData.users.verified ? "Yes" : "No"}
            </p>
            <p className="text-lg text-gray-600">
              Private Account: {profileData.users.privateAccount ? "Yes" : "No"}
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default TikTokProfile;
