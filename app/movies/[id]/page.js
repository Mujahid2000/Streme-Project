
"use client"
// pages/video/[id].js
import { useEffect, useState } from 'react';
import React from 'react';

import { FaRegStar } from "react-icons/fa6";


import VideoPlayer from '@/components/DetailsVideo/VideoPlayer/videoPlayer';

import Comments from "@/components/Comment/Comments"
import Like from '../../../components/DetailsVideo/Like/Like';

import Share from '../../../components/DetailsVideo/share/Share';
import PlaylistButton from '../../../components/DetailsVideo/PlaylistButton/PlaylistButton';
import Suggest from '../../../components/DetailsVideo/Suggest/Suggest';
import axios from 'axios';
import MainNavbar from '@/components/MainNavbar/MainNavbar';
import Playlist from '../../../components/DetailsVideo/Playlist/playlist';
import useUserInfo from '@/hooks/useUser';

import Sidebar from '@/app/Sidebar/Sidebar';

const VideoDetail = ({ params }) => {
  const { id } = params;
  const [videoData, setVideoData] = useState(null);
  const [likeData, setLikeData] = useState(null);
  const userInfo = useUserInfo();
  const [showFullDescription, setShowFullDescription] = useState(false);
  const email = userInfo?.email
  // console.log(likeData);
  // console.log("chek", videoData)

  const [rating, setRating] = useState(0);
  const [ratingDatas, setRatingData] = useState([])
  const [data, setData] = useState(0)
  const [usersRating, setUserRating] = useState(0)
  const [stateLike, setStateLike] = useState(0);
  const [playlist, setStatePlaylike] = useState(0);
  const [playList, setPlayList] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  console.log(likeData);
  console.log("chek", videoData)

  const AllUserRating = ratingDatas.filter(user => user.Id == id);
  console.log(AllUserRating)

  const totaluserRating = AllUserRating.reduce((total, totalRating) => total + totalRating.ratings
    , 0);


  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };
  const ratingData = async () => {
    await axios.post("https://endgame-team-server.vercel.app/addratings", {
      ratings: rating,
      Id: id
    })
      .then(res => {
        if (res.data.acknowledged) {
          setData(data + 1)
          console.log(res)
        }
      })
      .catch(error => console.error(error))
    setUserRating(rating)
  }
  useEffect(() => {
    fetch('https://endgame-team-server.vercel.app/ratings')
      .then(res => res.json())
      .then(dataes => setRatingData(dataes))

  }, [])



  useEffect(() => {
    const fetchData = async () => {
      try {
        if (email) {

          const response = await axios.get(`https://endgame-team-server.vercel.app/like/${id}/${email}`);
          const responseData = response.data;
          console.log(responseData);
          setLikeData(responseData);
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [email, stateLike]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        if (email) {

          const response = await axios.get(`https://endgame-team-server.vercel.app/playlist/${id}/${email}`);
          const responseData = response.data;
          // console.log(responseData);
          setPlayList(responseData);
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [email, playlist])



  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('videoHistory')) || [];
    if (history.includes(id)) {
      console.log(id);
    } else {
      console.log('Adding to video history');
      const updatedHistory = [...history, id];
      localStorage.setItem('videoHistory', JSON.stringify(updatedHistory));
    }
  }, [id]);



  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const response = await fetch(`https://endgame-team-server.vercel.app/movies/${id}`);
        if (!response.ok) {
          console.error(`Failed to fetch video details. Status: ${response.status}`);
          return;
        }
        const data = await response.json();
        setVideoData(data);
      } catch (error) {
        console.error('Error fetching video details:', error);
      }
    };

    fetchVideoDetails();
  }, [id]);


 



  if (!videoData) {
    // Render loading state or handle loading scenario
    return <p>Loading...</p>;
  }

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const handleSidebarToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='w-full h-screen '>
      <Sidebar isOpen={isOpen} handleSidebarToggle={handleSidebarToggle} />
      <MainNavbar isOpen={isOpen} handleSidebarToggle={handleSidebarToggle} />

      <div className="max-w-screen-xl bg-slate-950 px-1 mx-auto flex-row lg:flex gap-4">
        <div className="md:col-span-1 lg:col-span-2 mt-16 md:mt-16 lg:mt-20 xl:mt-24 2xl:mt-32">
          <VideoPlayer video={videoData.video.link} />
        </div>
        <div className="md:col-span-1 lg:col-span-1 px-1  h-[580px] mt-16 md:mt-16 lg:mt-20 xl:mt-24 2xl:mt-32">
          <h2 className='text-center py-2 rounded-t-lg text-white bg-slate-900'>Suggested Video</h2>
          <Playlist></Playlist>
        </div>
      </div>

      <div className=' bg-slate-950 px-1 h-[450px] max-w-screen-xl mx-auto '>
        <h1 className='tex-sm lg:text-3xl  text-white py-5 font-bold'>{videoData?.title}</h1>
        <div className='flex px-1 mb-2 flex-row gap-4 items-center md:flex-row lg:flex-row xl:flex-row 2xl:flex lg:items-center xl:items-center 2xl:items-center'>
          <Like setStateLike={setStateLike} likeData={likeData} data={videoData} stateLike={stateLike}></Like>
          <PlaylistButton playlist={playlist} setStatePlaylike={setStatePlaylike} data={videoData} playList={playList}></PlaylistButton>
          <Share video={videoData.video.link} />
        </div>

        <div className='flex items-center px-1 gap-2'>
          <FaRegStar className='text-green-600' />

          <p className='flex my-2 gap-4'>
            <span className='text-white flex'> <p>{
              parseFloat((((totaluserRating + usersRating)) / 100 * 5).toFixed(3))}</p></span>
            <div className='max-w-6xl mx-auto'>
              <h1 className='hove text-green-600 font-bold'>Rate now</h1>
              <div className='rating'>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => handleStarClick(star)}
                    style={{
                      cursor: 'pointer',
                      color: star <= rating ? 'gold' : 'gray',
                    }}
                  >
                    &#9733;

                  </span>
                ))}
                <br></br>
                <button onClick={ratingData} className='bg-slate-500 rounded py-0 px-2'>Rating</button>

              </div>
              {/* <p className='text-stone-200'>Selected Rating: {rating}</p> */}
            </div>
          </p>
        </div>

        <div>
          <div className='flex flex-row w-full lg:flex-row gap-4 px-1 mt-3'>
            {
              <div>
                <div>
                  {videoData?.genres && Array.isArray(videoData.genres) && videoData.genres.map((genre, index) => (
                    <div key={index} className="inline-block px-2 py-1 text-sm font-semibold rounded-sm bg-gray-500 text-white mr-2 mb-2">
                      {genre}
                    </div>
                  ))}
                </div>
              </div>
            }

          </div>
          <div>
            {/* description section start */}
            <h5 className='mt-3 text-justify px-1'>
              <span className='text-gray-600 font-bold px-1'>Description: </span>
              <p className='text-white'>
                {showFullDescription ? videoData?.description : `${videoData?.description.slice(0, 50)}...`}
              </p>
              <button onClick={toggleDescription} className="text-blue-500 hover:text-blue-700">
                {showFullDescription ? 'See less' : 'See more'}
              </button>
            </h5>
            {/* end */}
          </div>

          {/* comment section */}

          <div className='w-full bg-slate-950 h-screen px-1 mt-6'>
            <Suggest></Suggest>
            <Comments videoId={id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;