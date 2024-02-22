/* eslint-disable @next/next/no-img-element */

import React from 'react';
import { IoMdNotifications } from "react-icons/io";
const DashNav = () => {
    const fakeProfile = {
        imageUrl:'https://placekitten.com/200/200', // Replace with your actual image URL
        name: 'Md Alauddin',
        role: 'Admin',
        status: 'Active',
      };
    return (
        <div className='ml-4 py-3 px-4 hidden lg:block bg-slate-900' >
            <nav>
                <ul className='flex flex-row justify-between items-center'>



                    <li>
                      
                    </li>
                    <li>
                        <div className="flex  justify-center items-center gap-4">
                            <span className='text-xl'><IoMdNotifications/></span>
                            <img
                                src={fakeProfile.imageUrl}
                                alt="Profile"
                                className="rounded-full w-9 h-9 border object-cover  border-blue-500"
                            />
                             <div className='flex flex-col text-[12px]'>
                             <p>{fakeProfile.role}</p>
                              <p>{fakeProfile.name}</p>
                             </div>
                        </div>

                        
                    </li>

                </ul>
            </nav>
        </div>
    );
};

export default DashNav;