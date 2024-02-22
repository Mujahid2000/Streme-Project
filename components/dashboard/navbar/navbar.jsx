"use client"
import React, { useState } from 'react';

import Link from 'next/link';
import useUserInfo from '@/hooks/useUser';

const DashboardNavbar = () => {
    
    const userInfo = useUserInfo();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const isAdmin = userInfo?.isAdmin;
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
    };
   

    return (
        <div className="flex  lg:hidden">
            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 right-0 top-12 w-full bg-gray-800 transition-transform transform ${
                    isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="p-4">
                    {/* Add your sidebar content here */}
                    <nav>
                    {isAdmin ?  <ul className='flex flex-col gap-4'>
                      
                      <li>
                          <Link href="/home" onClick={closeSidebar}>
                              <p className="route-link bg-gray-700 p-2 hover:bg-gray-600">Home</p>
                          </Link>
                      </li>

                      <li>
                          <Link href="/dashboard" onClick={closeSidebar}>
                              <p className="route-link bg-gray-700 p-2 hover:bg-gray-600">Dashboard</p>
                          </Link>
                      </li>

                      <li>
                          <Link href="/dashboard/movies" onClick={closeSidebar}>
                              <p className="route-link bg-gray-700 p-2 hover:bg-gray-600">Movie List</p>
                          </Link>
                      </li>

                      <li>
                          <Link href="/dashboard/shows" onClick={closeSidebar}>
                              <p className="route-link bg-gray-700 p-2 hover:bg-gray-600">Show</p>
                          </Link>
                      </li>
                  
                      <li>
                          <Link href="/dashboard/episode" onClick={closeSidebar}>
                              <p className="route-link bg-gray-700 p-2 hover:bg-gray-600">Episode</p>
                          </Link>
                      </li>
                  </ul> :    <ul className='flex flex-col gap-4'>
                      
                      <li>
                          <Link href="/home" onClick={closeSidebar}>
                              <p className="route-link bg-gray-700 p-2 hover:bg-gray-600">Home</p>
                          </Link>
                      </li>

                      <li>
                          <Link href="/dashboard" onClick={closeSidebar}>
                              <p className="route-link bg-gray-700 p-2 hover:bg-gray-600">Profie</p>
                          </Link>
                      </li>

                      <li>
                          <Link href="/dashboard/upload" onClick={closeSidebar}>
                              <p className="route-link bg-gray-700 p-2 hover:bg-gray-600">Upload</p>
                          </Link>
                      </li>

                   
                  </ul> }
                  
                
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
              
                <div className="bg-gray-800 mb-6 p-1 flex flex-row justify-between items-center">


                <Link href="/home">
                <img className="w-36" src="https://i.ibb.co/B396qB4/Screenshot-2024-02-07-031511-removebg-preview.png" alt="Your Logo" />
              </Link>

                
                    <div
                        className="cursor-pointer text-white text-2xl"
                        onClick={toggleSidebar}
                    >
                        ☰
                    </div>
                </div>
              
           
            </div>
        </div>
    );
};

export default DashboardNavbar;
