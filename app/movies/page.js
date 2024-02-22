"use client";
import ProtectedRoute from "@/utils/ProtectedRoute";
import Sidebar from "../Sidebar/Sidebar";
import MainNavbar from "@/components/MainNavbar/MainNavbar";

import { useState } from "react";
import VideoCard from "@/components/Cards/VideoCard/VideoCard";

const Videos = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSidebarToggle = () => {
        setIsOpen(!isOpen);
    };
    return (
        <ProtectedRoute>
            <div>

                <section className="">

                    <div className='flex bg-slate-950'>
                        <Sidebar isOpen={isOpen} handleSidebarToggle={handleSidebarToggle} />
                        <div className="flex flex-col flex-grow">
                            <MainNavbar isOpen={isOpen} handleSidebarToggle={handleSidebarToggle} />
                            <div>
                                <VideoCard />
                               
                            </div>
                        </div>
                    </div>



                </section >
            </div >
        </ProtectedRoute>
    );
};

export default Videos;
