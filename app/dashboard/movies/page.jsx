
"use client"
import ChildrenBox from '@/components/dashboard/childrenBox/ChildrenBox';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const MoviesPage = () => {
    const dbutton = "Add Movie";
    const [movies, setMovieData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get('https://endgame-team-server.vercel.app/moviesSearch', {
                    params: { searchQuery } // Use searchQuery state as a query parameter
                });
                setMovieData(response.data);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies();
    }, [searchQuery]); // Include searchQuery in the dependency array

    const handleCurrentVisibilityStatus = async (movieId, currentStatus) => {
        try {
            await axios.put(`https://endgame-team-server.vercel.app/latestMovies/${movieId}`, { status: currentStatus });
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

    const handleDeleteData = async (movieId) => {
        try {
            await axios.delete(`https://endgame-team-server.vercel.app/latestMovies/${movieId}`); // Correct endpoint
            setMovieData(prevMovies => prevMovies.filter(movie => movie._id !== movieId));
            toast.success('Movie deleted successfully', {
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
                tableData={movies}
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

export default MoviesPage;
