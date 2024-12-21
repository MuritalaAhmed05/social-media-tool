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
      // API request to fetch the video details
      const response = await fetch(`https://bk9.fun/download/instagram2?url=${encodeURIComponent(url)}`);
      const data = await response.json();

      if (data.status) {
        setDownloadData(data.BK9); // Set the video data from the API
      } else {
        setError('Failed to fetch video data. Please try again.');
      }
    } catch (err) {
      console.error('Error fetching Instagram video:', err);
      setError('An error occurred while fetching the video.');
    } finally {
      setLoading(false);
    }
  };

  // Function to trigger image download
  const handleImageDownload = (imageUrl) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = imageUrl.split('/').pop(); // Extract filename from URL
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
          className="p-2 bg-black w-full text-white rounded-md flex items-center justify-center space-x-2"
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
              <Alert variant="destructive" className="w-full mt-4">
                <AlertTitle>Error:</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

      {/* Image Gallery */}
      {downloadData && !loading && (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 place-items-center">
          {downloadData.map((image, index) => (
            <div key={index} className="justify-center flex flex-col items-center">
              <a href={image.url} target="_blank" rel="noopener noreferrer" className='justify-center flex flex-col items-center'>
                <img
                  src={image.thumbnail}
                  alt={`Instagram image ${index + 1}`}
                  className="w-full h-auto object-cover  rounded-md shadow-lg mb-2 justify-center flex flex-col items-center"
                />
              </a>
              {/* Download Button */}
              <button
                onClick={() => handleImageDownload(image.url)}
                className="bg-black text-white p-2 rounded-md flex items-center justify-center space-x-2"
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
