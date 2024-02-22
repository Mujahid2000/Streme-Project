
"use client"
import ChildrenBox from '@/components/dashboard/childrenBox/ChildrenBox';
import useUserInfo from '@/hooks/useUser';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const UploadPage = () => {
    const userInfo = useUserInfo();
  
    let dbutton;
    
    if (userInfo && userInfo?.isVerify) {
        dbutton = "Video Upload";
    } else {
        dbutton = "Video Upload";
    }

// } else {
//     dbutton = "!Disable";
// }
    const [userVideoData, setUserVideoData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    useEffect(() => {
        const fetchUserVideos = async () => {
            try {
                // Use userInfo.email to pass the user's email as a parameter
                const response = await axios.get(`https://endgame-team-server.vercel.app/usersVideos/${userInfo.email}`);
                setUserVideoData(response.data);
            } catch (error) {
                console.error('Error fetching user videos:', error);
            }
        };

        if (userInfo && userInfo.email) {
            fetchUserVideos();
        }
    }, [userInfo]); // Include userInfo in the dependency array

    const handleCurrentVisibilityStatus = async (userVideoId, currentStatus) => {
        try {
            await axios.put(`https://endgame-team-server.vercel.app/latestUsersVideos/${userVideoId}`, { status: currentStatus });
            toast.success('Status updated successfully', {
                icon: '🚀',
                style: {
                    backgroundColor: '#4CAF50',
                    color: '#FFFFFF',
                },
            });
        } catch (error) {
            console.error('Error updating status:', error);
            toast.error('Error updating status', {
                icon: '❌',
                style: {
                    backgroundColor: '#FF6347',
                    color: '#FFFFFF',
                },
            });
        }
    };

    const handleDeleteData = async (userVideoId) => {
        try {
            await axios.delete(`https://endgame-team-server.vercel.app/latestUsersVideos/${userVideoId}`); // Correct endpoint
            setUserVideoData(prevUserVideos => prevUserVideos.filter(userVideo => userVideo._id !== userVideoId));
            toast.success('Video deleted successfully', {
                icon: '🚀',
                style: {
                    backgroundColor: '#4CAF50',
                    color: '#FFFFFF',
                },
            });
        } catch (error) {
            console.error('Error deleting movie:', error);
            toast.error('Error deleting movie', {
                icon: '❌',
                style: {
                    backgroundColor: '#FF6347',
                    color: '#FFFFFF',
                },
            });
        }
    };

    return (
        <div>
            <ChildrenBox
                tableData={userVideoData}
                dbutton={dbutton}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onDelete={handleDeleteData}
                onCurrentVisibleStatus={handleCurrentVisibilityStatus}
            />
            <Toaster position="top-center" reverseOrder={false} />
        </div>
    );
};

export default UploadPage;
