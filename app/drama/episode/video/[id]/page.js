
"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import MainNavbar from '@/components/MainNavbar/MainNavbar';

const EpisodeDetail = ({ params }) => {
  const { id } = params;

  const [videoData, setVideoData] = useState(null);
  const [playlist, setPlaylist] = useState([]);
  const [videoLink, setVideoLink] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null); // State to store the index of the active playlist item

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const response = await fetch(`https://endgame-team-server.vercel.app/ep/${id}`);
        if (!response.ok) {
          console.error(`Failed to fetch video details. Status: ${response.status}`);
          return;
        }
        const data = await response.json();
        setVideoData(data);
        setVideoLink(data?.video?.link);
      } catch (error) {
        console.error('Error fetching video details:', error);
      }
    };

    fetchVideoDetails();
  }, [id]);

  const handleEpisodeClick = (episodeVideoLink, index) => {
    setActiveIndex(index); // Set the active index when a playlist item is clicked
    setVideoLink(episodeVideoLink);
  };

  useEffect(() => {
    const fetchEpisodeTitles = async () => {
      try {
        const response = await axios.get(`https://endgame-team-server.vercel.app/episodes/${videoData?.title}`);
        setPlaylist(response.data.episodes);
      } catch (error) {
        console.error('Error fetching episode titles:', error);
      }
    };

    if (videoData?.title) {
      fetchEpisodeTitles();
    }
  }, [videoData?.title]);


 

  return (
    <section>
  <MainNavbar  />
   
    <div className='w-full py-16  h-screen'>
      
      <div className="max-w-screen-xl mt-6 bg-slate-950 px-1 mx-auto flex-row lg:flex gap-4">
        <div className="md:col-span-1 lg:col-span-2">
          <div className="player-container">
            {videoLink && (
              <ReactPlayer
                url={videoLink}
                controls
                width='100%'
                height='100%'
              />
            )}
          </div>
        </div>
        <div className="md:col-span-1 lg:col-span-1 px-1 w-80 h-40 ">
          <h2 className='text-center py-2 rounded-t-lg text-white bg-slate-900'>Playlist Video</h2>
          <div className='flex flex-col mt-2 gap-4 bg-slate-700'>
            {playlist.slice(0).reverse().map((episode, index) => (
              <div
                key={index}
                className={`playlist-item hover:bg-slate-800 p-2 ${activeIndex === index ? 'bg-blue-500' : ''}`} // Apply dynamic background color based on activeIndex
                onClick={() => handleEpisodeClick(episode.video.link, index)}
              >
                <img src={episode?.thumbnail?.link} alt={episode?.title} className="w-full h-auto" /> {/* Display the episode image */}
                <p>{episode.title}{playlist.length - index}</p>
              </div>
            ))}
           
          </div>
        </div>
      </div>
      <div className='bg-slate-950 px-1 h-[450px] max-w-screen-xl mx-auto'>
        <h1 className='tex-sm lg:text-3xl text-white py-5 font-bold'>{videoData?.title}</h1>
      </div>

    </div>
    </section>
  );
};

export default EpisodeDetail;
