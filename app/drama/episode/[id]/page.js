"use client";
import EpisodeCard from '@/components/Cards/EpisodeCard/EpisodeCard';
// drama/[id] page.js 


import MainNavbar from '@/components/MainNavbar/MainNavbar';
import ProtectedRoute from '@/utils/ProtectedRoute';
import React, { useState } from 'react';




const VideoDetail = ({ params }) => {
    const { id } = params;

    const [isOpen, setIsOpen] = useState(false);

    const handleSidebarToggle = () => {
        setIsOpen(!isOpen);
    };
    return (
        <ProtectedRoute>
            <div>
                <MainNavbar isOpen={isOpen} handleSidebarToggle={handleSidebarToggle} />

                <section className="max-w-7xl mx-auto px-2">

                    <div >
                        <EpisodeCard id={id} />
                    </div>

                </section >
            </div >
        </ProtectedRoute >
    );
};

export default VideoDetail;
