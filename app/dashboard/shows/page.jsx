
"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import ChildrenBox from '@/components/dashboard/childrenBox/ChildrenBox';

const ShowsPage = () => {
    const dbutton = "Add Show";
    const [shows, setShows] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchShows = async () => {
            try {
                const response = await axios.get('https://endgame-team-server.vercel.app/showsSearch', {
                    params: { searchQuery } // Use searchQuery state as a query parameter
                });
                setShows(response.data);
            } catch (error) {
                console.error('Error fetching shows:', error);
            }
        };

        fetchShows();
    }, [searchQuery]); // Include searchQuery in the dependency array

    const handleCurrentVisibilityStatus = async (showId, currentStatus) => {
        try {
            await axios.put(`https://endgame-team-server.vercel.app/latestShows/${showId}`, { status: currentStatus });
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

    const handleDeleteData = async (showId) => {
        try {
            await axios.delete(`https://endgame-team-server.vercel.app/latestShows/${showId}`);
            setShows(prevShows => prevShows.filter(show => show._id !== showId));
            toast.success('Show deleted successfully', {
                icon: '🚀',
                style: {
                    backgroundColor: '#4CAF50',
                    color: '#FFFFFF',
                },
            });
        } catch (error) {
            console.error('Error deleting show:', error);
            toast.error('Error deleting show', {
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
                tableData={shows}
                dbutton={dbutton}
                onDelete={handleDeleteData}
                onCurrentVisibleStatus={handleCurrentVisibilityStatus}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            <Toaster position="top-center" reverseOrder={false} />
        </div>
    );
};

export default ShowsPage;
