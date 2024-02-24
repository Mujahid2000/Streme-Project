"use client"
import React, { useState, useEffect } from 'react';

const Playlist = ({handlePlayVideo}) => {
  const [playlistData, setPlaylistData] = useState([]);

 

  useEffect(() => {
    // Fetch data from the server endpoint
    const fetchData = async () => {
      try {
        const response = await fetch('https://endgame-team-server.vercel.app/aggri');
        const data = await response.json();
        setPlaylistData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetch function
    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <div className="w-80 mx-auto grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 px-3 py-2 gap-4 overflow-y-auto max-h-[57vh]">
      {playlistData.map((genre) => (
        <div key={genre._id}>
          <p className="text-xl font-bold text-white">{genre._id}</p>
          {genre.movies.map((video) => (
            <button onClick={() => handlePlayVideo(video.video.link)} key={video._id} className="hover:bg-gray-300">
              <div className="px-2 py-3 border rounded-lg shadow-md">
                <div className="flex items-center">
                  <img src={video.thumbnail.link} alt={video.title} className="h-14 w-auto mr-2" />
                  <p className="text-base text-white font-semibold">{video.movieName}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Playlist;
