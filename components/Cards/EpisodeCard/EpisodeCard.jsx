"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const EpisodeCard = ({ id }) => {
    const [showsData, setShowsData] = useState([]);
    const [episodesData, setEpisodesData] = useState([]);
    const [updateData, setUpdateData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch latest shows data
                const showResponse = await fetch(`https://endgame-team-server.vercel.app/latestShows`, { cache: 'no-cache' });
                if (!showResponse.ok) {
                    throw new Error(`Failed to fetch show data. Status: ${showResponse.status}`);
                }
                const shows = await showResponse.json();
                setShowsData(shows);

                // Fetch latest episodes data
                const episodesResponse = await fetch(`https://endgame-team-server.vercel.app/latestEpisodes`, { cache: 'no-cache' });
                if (!episodesResponse.ok) {
                    throw new Error(`Failed to fetch episode data. Status: ${episodesResponse.status}`);
                }
                const episodes = await episodesResponse.json();
                setEpisodesData(episodes);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id]);

    useEffect(() => {
        // Update episode data based on the selected show ID
        const show = showsData.find(show => show._id === id);

        if (show) {
            const filteredEpisodes = episodesData.filter(episode => show.episodes?.includes(episode._id));
            filteredEpisodes.sort((a, b) => show.episodes.indexOf(a._id) - show.episodes.indexOf(b._id));
            setUpdateData({ ...show, episodes: filteredEpisodes });
        }
    }, [id, showsData, episodesData]);


    return (
        <section>
            <div className="flex flex-col py-20 max-w-7xl mx-auto gap-6 relative">
                {/* Banner image with gradient overlay */}
                <div className="relative">
                    <img
                        className="w-full h-auto object-cover"
                        src={updateData?.banner?.link}
                        alt="Banner"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-950 to-transparent opacity-100"></div>
                </div>
                {/* Video details */}
                <div className="absolute top-1/4 ml-8 flex flex-col gap-4 right-0 left-0 text-white ">
                    <h1 className="text-3xl font-bold mb-4">{updateData?.title}</h1>
                    <div className='flex  items-center gap-2 '>
                        <p className="text-lg">9.6</p>
                        <p className="text-lg">13+</p>
                        <p className="text-lg">2024</p>
                        <p className="text-lg">South Korea</p>
                    </div>
                    <p className="text-lg mb-2">Romance, Friendship, Costume, Ancient, Novel Adaptation</p>
                    <p className="text-lg mb-2">Cast: Zhang Tian'ai, Zhang Haowei, Wang Ruichang</p>
                    <p className="text-lg mb-2">Description:</p>
                    <div className='flex gap-2 items-center'>
                        {updateData?.episodes && updateData.episodes.length > 0 && (
                            <Link href={`/drama/episode/video/${updateData.episodes[0]._id}`}>
                                <span className="bg-green-500 hover:bg-green-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white ml-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 9a1 1 0 011.555-.832l5 4a1 1 0 010 1.664l-5 4A1 1 0 018 15V9z" clipRule="evenodd" />
                                    </svg>
                                    <span>Play</span>
                                </span>
                            </Link>
                        )}

                    </div>
                </div>
                {/* List of episodes */}
                <div className="my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {updateData?.episodes?.map((episode, index) => (
                        <div key={episode._id} className="relative">
                            {/* Link to episode details */}
                            <Link href={`/drama/episode/video/${episode._id}`}>
                                <div className="max-w-full relative text-white rounded-md shadow-md overflow-hidden cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">
                                    {/* Hover effect and play icon */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition duration-300 ease-in-out bg-black bg-opacity-50 ">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white opacity-50 hover:opacity-100" viewBox="0 0 20 20" fill="currentColor">
                                            <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" />
                                            <path d="M8 6l6 4-6 4V6z" fill="currentColor" />
                                        </svg>
                                    </div>
                                    {/* Episode thumbnail */}
                                    <img
                                        className="h-40 w-full object-cover rounded-sm"
                                        src={episode.thumbnail?.link}
                                        alt={`Episode ${index + 1} Thumbnail`}
                                    />
                                    {/* Episode title */}
                                    <div className="flex flex-col z-0 py-1 relative bg-gray-900 bg-opacity-75">
                                        <span className="text-sm text-white px-4 py-2">{episode.title} {index + 1}</span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EpisodeCard;
