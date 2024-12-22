"use client"
import React, { useState } from 'react';
import { AiOutlineDownload } from 'react-icons/ai';
import { FiLoader } from 'react-icons/fi';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
export default function SpotifyDownload() {
    const [url, setUrl] = useState('');
    const [trackData, setTrackData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Handle URL input change
    const handleUrlChange = (e) => {
        setUrl(e.target.value);
    };

    // Fetch track data from the API
    const fetchTrackData = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`https://deliriussapi-oficial.vercel.app/download/spotifydl?url=${encodeURIComponent(url)}`);
            const data = await response.json();
            if (data.status) {
                setTrackData(data.data);
            } else {
                setError('Failed to fetch track data.');
            }
        } catch (err) {
            setError('An error occurred while fetching data.');
        } finally {
            setLoading(false);
        }
    };

    // Handle download
    const handleDownload = () => {
        if (trackData) {
            const link = document.createElement('a');
            link.href = trackData.url;
            link.download = `${trackData.title}.mp3`; // Set filename
            link.click();
        }
    };

    return (
        <div className="w-full flex flex-col items-center p-5">
            <input
                type="text"
                placeholder="Enter Spotify Track URL"
                value={url}
                onChange={handleUrlChange}
                className="p-2 border w-full border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black mb-4"
            />
            <button
                onClick={fetchTrackData}
                className="p-3 bg-black w-full text-white rounded-md flex items-center justify-center space-x-2"
                disabled={loading}
            >
                  {loading ? (
            <>
              <FiLoader className="animate-spin mr-1" />
              <span>Downloading...</span>
            </>
          ) : (
            <>
             
              <span>Download Track</span>
            </>
          )}
            </button>

          {error && (
                        <Alert variant="destructive" className="w-full mt-4">
                          <AlertTitle>Error:</AlertTitle>
                          <AlertDescription>{error}</AlertDescription>
                        </Alert>
                      )}

            {trackData && (
                <div className="mt-6 w-full flex flex-col items-center">
                    <img src={trackData.image} alt={trackData.title} className="w-full h-auto max-w-md mx-auto rounded-md shadow-lg mb-2" />
                    <h3 className="text-xl font-semibold">{trackData.title}</h3>
                    <p className="mt-2">By: {trackData.author}</p>

                    <button
                        onClick={handleDownload}
                        className="mt-4 bg-blue-500 text-white p-2 rounded-md flex items-center justify-center space-x-2"
                    >
                        <AiOutlineDownload />
                        <span>Download MP3</span>
                    </button>
                </div>
            )}
        </div>
    );
}