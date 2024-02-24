'use client'

import ProtectedRoute from '@/utils/ProtectedRoute';
import MainNavbar from '@/components/MainNavbar/MainNavbar';
import { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import VideoCard from '@/components/Cards/VideoCard/VideoCard';
import CelibratyCard from '@/components/Cards/CelibratyCard/CelibratyCard';

import ChatModal from '@/components/chat/chatModal';
import ShowCard from '../../components/Cards/ShowCard/ShowCard';



export default function HomePage() {
    const [isOpen, setIsOpen] = useState(false);

    const handleSidebarToggle = () => {
        setIsOpen(!isOpen);
    };
    return (
        <ProtectedRoute>
            <div className='flex bg-slate-950'>
                <Sidebar isOpen={isOpen} handleSidebarToggle={handleSidebarToggle} />
                <div className="flex flex-col flex-grow">
                    <MainNavbar isOpen={isOpen} handleSidebarToggle={handleSidebarToggle} />
                    <div className='max-w-7xl  my-20 mx-auto'>

                        <VideoCard />
                        <CelibratyCard />
                        <ShowCard />
                        <ChatModal />
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
};
