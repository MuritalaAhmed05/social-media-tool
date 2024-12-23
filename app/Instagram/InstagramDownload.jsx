"use client"
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { FiLoader } from 'react-icons/fi';
import { AiOutlineDownload } from 'react-icons/ai'; // Import download icon
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function InstagramDownload() {
  const [url, setUrl] = useState('');
  const [downloadData, setDownloadData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDownload = async () => {
    if (!url) return;

    setLoading(true);
    setError('');
    try {
      // API request to fetch the media details (image or video)
      const response = await fetch(`https://deliriussapi-oficial.vercel.app/download/instagram?url=${encodeURIComponent(url)}`);
      const data = await response.json();

      if (data.status && data.data) {
        setDownloadData(data.data); // Set the media data from the API
      } else {
        setError('Failed to fetch media data. Please try again.');
      }
    } catch (err) {
      console.error('Error fetching Instagram media:', err);
      setError('An error occurred while fetching the media.');
    } finally {
      setLoading(false);
    }
  };

  // Function to trigger download of the image or video
  const handleDownloadMedia = (mediaUrl, fileName) => {
    const link = document.createElement('a');
    link.href = mediaUrl;
    link.download = fileName;
    link.click();
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full flex flex-col items-center space-y-4 mb-8">
        <input
          type="text"
          placeholder="Enter Instagram URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="p-2 border w-full border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        />
        <button
          onClick={handleDownload}
          className="p-3 bg-black w-full text-white rounded-md flex items-center justify-center space-x-2"
        >
          {loading ? (
            <>
              <FiLoader className="animate-spin mr-1" />
              <span>Searching...</span>
            </>
          ) : (
            <>
              <FaSearch />
              <span>Search</span>
            </>
          )}
        </button>
      </div>

      {error && (
        <Alert>
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {downloadData && (
        <div className="w-full flex flex-col items-center space-y-4">
          {downloadData.map((media, index) => (
            <div key={index} className="w-full flex flex-col items-center">
              {media.type === "image" ? (
                <img
                  src={media.url}
                  alt={`Instagram media ${index}`}
                  className="rounded-md w-80 h-auto"
                />
              ) : media.type === "video" ? (
                <video
                  src={media.url}
                  controls
                  className="rounded-md w-80 h-auto"
                >
                  Your browser does not support the video tag.
                </video>
              ) : null}

              <button
                onClick={() => handleDownloadMedia(media.url, `instagram_media_${index}`)}
                className="mt-4 p-3 bg-black text-white rounded-md flex items-center space-x-2"
              >
                <AiOutlineDownload />
                <span>Download</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
