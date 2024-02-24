"use client";
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Link from 'next/link';

const ShowBannerSlide = () => {
    const [showsData, setShowsData] = useState([]);
    const [hoverIndex, setHoverIndex] = useState(null); // Index of the slide being hovered

    // Settings for the Slider component
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    // Fetching data using useEffect hook
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`https://endgame-team-server.vercel.app/latestShows`, { cache: 'no-cache' });

                if (!res.ok) {
                    console.error(`Failed to fetch data. Status: ${res.status}`);
                } else {
                    const data = await res.json();
                    setShowsData(data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

        // Cleanup function (optional)
        return () => {
            // Cleanup function (if any)
        };
    }, []); // Empty dependency array to run the effect only once on mount

    const handleMouseEnter = (index) => {
        setHoverIndex(index);
    };

    const handleMouseLeave = () => {
        setHoverIndex(null);
    };

    return (
        <div className="max-w-7xl h-[500px] py-20 mx-auto  relative">
            {/* Slider component with settings */}
            <Slider {...settings}>
                {showsData.map((slide, index) => (
                    <div 
                        key={index} 
                        className="relative"
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <Link href={`/drama/episode/${slide._id}`}>
                            {/* Image with link */}
                            <img className='w-full h-40 lg:h-[500px] object-cover' src={slide?.banner?.link} alt={`Slide ${index + 1}`} />
                            {/* Overlay for hover effect */}
                            <div className="absolute top-0 w-full  bg-gradient-to-l from-slate-950 to-transparent opacity-100"></div>
                            {/* Hover icon */}
                            <div 
                                className={`absolute inset-0 flex items-center justify-center transition duration-300 ease-in bg-black bg-opacity-50 ${
                                    hoverIndex === index ? 'opacity-100' : 'opacity-0'
                                }`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white opacity-50 hover:opacity-100" viewBox="0 0 20 20" fill="currentColor">
                                    <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" />
                                    <path d="M8 6l6 4-6 4V6z" fill="currentColor" />
                                </svg>
                            </div>
                            {/* Gradient overlay at the bottom */}
                            <div className="absolute bottom-0 left-0 right-0 h-80 bg-gradient-to-t from-slate-950 to-transparent ring-opacity-100"></div>
                        </Link>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default ShowBannerSlide;
