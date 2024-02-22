'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { Done } from '@mui/icons-material';
import useUserInfo from '@/hooks/useUser';

const PlaylistButton = ({ data, playList, setStatePlaylike, Playlist }) => {
  const [addedToPlaylist, setAddedToPlaylist] = useState(false);
  const userInfo = useUserInfo();
  const email = userInfo?.email;
  console.log(playList);


  const togglePlaylist = async () => {
  try {
    const res = await axios.post("https://endgame-team-server.vercel.app/playlist", { data, email });
    console.log("Response:", res.data);
    setAddedToPlaylist(true); 
    setStatePlaylike(Playlist)
  } catch (error) {
    console.error("Error:", error);
    
  }
};


  return (
    <button onClick={togglePlaylist} style={{ color: addedToPlaylist ? 'green' : 'black' }}>
      {data?._id === playList?.data?._id ? <Done className='text-white' /> : '➕'}
    </button>
  );
};

export default PlaylistButton;