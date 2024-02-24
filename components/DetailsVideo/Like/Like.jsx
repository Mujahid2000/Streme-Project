import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useUserInfo from '@/hooks/useUser';
import toast, { Toaster } from 'react-hot-toast';
import { SlLike } from "react-icons/sl";
const Like = ({ data, likeData, setStateLike, stateLike }) => {
    const [liked, setLiked] = useState(false);
    const userInfo = useUserInfo();
    const email=userInfo?.email
    const [like, setLike] = useState();
  
    const toggleLike = async () => {
        try {
            
            const response = await axios.post("https://endgame-team-server.vercel.app/like", {data,email});
            console.log("Response:", response.data);
            console.log({
                videos: data,
                liked: true
                
            });
            setLiked(!liked);
            setStateLike(stateLike + 1);
           
            console.log({liked: true,
            Video: data});
        } catch (error) {
            console.error("Error:", error);
           
            toast.error("Something went wrong!")
        
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                {
                    const response = await axios.get(`https://endgame-team-server.vercel.app/like`);
                    const responseData = response.data;
                    setLike(responseData);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, []);
    

    return (
        <div className='flex gap-2'>
            <button onClick={toggleLike} style={{ color: liked ? 'red' : 'black' }}>
                {data?._id === likeData?.data?._id ? <SlLike className='text-red-500'/> : <SlLike className='text-white'/>}
            </button>
            <p>{like?.length}</p>
        </div>
    );
};

export default Like;
