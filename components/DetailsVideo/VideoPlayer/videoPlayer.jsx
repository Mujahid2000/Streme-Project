'use client'
import React, { useRef, useState } from 'react';
import { IoPlayForwardOutline } from "react-icons/io5";
import { IoPlayBackOutline } from "react-icons/io5";

import './player.css';
const VideoPlayer = ({ video }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleSeek = (amount) => {
    const newTime = videoRef.current.currentTime + amount;
    videoRef.current.currentTime = newTime;
  };

  return (
    <div className='video-player-container'>
      <video
        ref={videoRef}
        src={video}
        controls// Hide default controls
      />
      <div className="custom-controls">
        <button className={`play-button ${isPlaying ? 'pause' : 'play'}`} onClick={togglePlay}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button className='rewind-button' onClick={() => handleSeek(-10)}>
          <IoPlayBackOutline />
        </button>
        <button className='forward-button' onClick={() => handleSeek(10)}>
          <IoPlayForwardOutline />
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;
