"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import ChildrenBox from '@/components/dashboard/childrenBox/ChildrenBox';

const EpisodesPage = () => {
    const dbutton = "Add Episode";
    const [episodes, setEpisodes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchEpisodes = async () => {
            try {
                const response = await axios.get('https://endgame-team-server.vercel.app/episodeSearch', {
                    params: { searchQuery } // Use searchQuery state as a query parameter
                });
                setEpisodes(response.data);
            } catch (error) {
                console.error('Error fetching episodes:', error);
            }
        };

        fetchEpisodes();
    }, [searchQuery]); // Include searchQuery in the dependency array

    const handleCurrentVisibilityStatus = async (episodeId, currentStatus) => {
        try {
            await axios.put(`https://endgame-team-server.vercel.app/latestEpisodes/${episodeId}`, { status: currentStatus });
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

    const handleDeleteData = async (episodeId) => {
        try {
            await axios.delete(`https://endgame-team-server.vercel.app/latestEpisodes/${episodeId}`);
            setEpisodes(prevEpisodes => prevEpisodes.filter(episode => episode._id !== episodeId));
            toast.success('Episode deleted successfully', {
                icon: '🚀',
                style: {
                    backgroundColor: '#4CAF50',
                    color: '#FFFFFF',
                },
            });
        } catch (error) {
            console.error('Error deleting episode:', error);
            toast.error('Error deleting episode', {
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
                tableData={episodes}
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

export default EpisodesPage;
