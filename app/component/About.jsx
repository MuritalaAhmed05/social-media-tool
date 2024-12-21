// import React, { useState } from "react";
// import axios from "axios";
// import { Button, Card, Avatar } from "@shadcn/ui"; // Correct imports
// import { FiHeart, FiUser, FiVideo, FiUsers } from "react-icons/fi"; // Importing necessary icons

// const TikTokProfile = () => {
//   const [username, setUsername] = useState(""); // State for TikTok username
//   const [profileData, setProfileData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleInputChange = (e) => {
//     setUsername(e.target.value); // Update username from input field
//   };

//   const handleSearch = async () => {
//     if (!username.trim()) {
//       setError("Please enter a valid TikTok username.");
//       return;
//     }

//     setLoading(true);
//     setError(null); // Reset any previous errors

//     try {
//       const response = await axios.get(
//         `https://deliriussapi-oficial.vercel.app/tools/tiktokstalk?q=${username}`
//       );

//       if (response.data.status) {
//         setProfileData(response.data.result);
//       } else {
//         setError("Failed to fetch profile data.");
//       }
//     } catch (err) {
//       setError("An error occurred while fetching the data. Please try again.");
//       console.error("Error fetching data:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       {/* Input Field */}
//       <div className="flex items-center mb-6">
//         <input
//           type="text"
//           placeholder="Enter TikTok Username"
//           value={username}
//           onChange={handleInputChange}
//           className="border p-2 rounded-lg mr-2"
//         />
//         <Button
//           onClick={handleSearch}
//           className="bg-blue-500 text-white px-4 py-2 rounded-lg"
//         >
//           Search
//         </Button>
//       </div>

//       {/* Loading State */}
//       {loading && <div>Loading...</div>}

//       {/* Error State */}
//       {error && <div className="text-red-500">{error}</div>}

//       {/* Profile Data */}
//       {profileData && (
//         <Card className="shadow-xl p-6 max-w-lg mx-auto">
//           <div className="flex flex-col items-center mb-4">
//             <Avatar
//               src={profileData.users.avatarLarger}
//               alt="Profile Avatar"
//               size="xl"
//               className="mb-4"
//             />
//             <h2 className="text-2xl font-semibold">{profileData.users.nickname}</h2>
//             <p className="text-lg text-gray-500">{profileData.users.signature}</p>
//           </div>

//           {/* Stats Section */}
//           <div className="flex justify-around mb-4">
//             <div className="text-center">
//               <FiHeart size={24} />
//               <p className="text-xl font-medium">{profileData.stats.heartCount}</p>
//               <p className="text-sm">Hearts</p>
//             </div>
//             <div className="text-center">
//               <FiUsers size={24} />
//               <p className="text-xl font-medium">{profileData.stats.followerCount}</p>
//               <p className="text-sm">Followers</p>
//             </div>
//             <div className="text-center">
//               <FiUser size={24} />
//               <p className="text-xl font-medium">{profileData.stats.followingCount}</p>
//               <p className="text-sm">Following</p>
//             </div>
//             <div className="text-center">
//               <FiVideo size={24} />
//               <p className="text-xl font-medium">{profileData.stats.videoCount}</p>
//               <p className="text-sm">Videos</p>
//             </div>
//           </div>

//           {/* Visit Profile Button */}
//           <div className="flex justify-center mt-4">
//             <Button
//               variant="outline"
//               onClick={() => window.open(profileData.users.url, "_blank")}
//             >
//               Visit Profile
//             </Button>
//           </div>

//           {/* Other Info */}
//           <div className="mt-4 text-center">
//             <p className="text-lg text-gray-600">Region: {profileData.users.region}</p>
//             <p className="text-lg text-gray-600">Verified: {profileData.users.verified ? "Yes" : "No"}</p>
//             <p className="text-lg text-gray-600">Private Account: {profileData.users.privateAccount ? "Yes" : "No"}</p>
//           </div>
//         </Card>
//       )}
//     </div>
//   );
// };

// export default TikTokProfile;
