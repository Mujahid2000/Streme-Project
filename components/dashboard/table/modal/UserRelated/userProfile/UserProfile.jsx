"use client"

import { FaUser } from 'react-icons/fa';

import useUserInfo from '@/hooks/useUser';

const UserProfile = () => {

    const userInfo = useUserInfo();




    return (
        <div className="">
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-9">
                    <div className="p-6 rounded-lg shadow-md bg-slate-900">
                        <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
                        {userInfo && userInfo.photoURL ? (
                            <img src={userInfo.photoURL} className="w-12 h-12 rounded-full mb-4" alt="Profile" />
                        ) : (
                            <img src="https://i.ibb.co/dgPCtjH/profileavt.jpg" className="w-12 h-12 rounded-full mb-4" alt="Default Profile" />
                        )}
                        <p className="mb-2"><strong>Name:</strong> {userInfo && userInfo?.userName}</p>
                        <p className="mb-2"><strong>Email:</strong> {userInfo && userInfo?.email}</p>
                        <p><strong>Role:</strong> {userInfo?.isAdmin ? 'Admin' : 'User'}</p>
                    </div>
                </div>
                <div className="col-span-3 bg-slate-900 rounded-lg">


                    <div className="flex flex-col items-center gap-y-5 justify-between">
                        <div className="flex justify-between items-center">
                            <span className="text-xl font-semibold mr-2">All Videos</span>
                            <span className="text-white font-semibold text-xl">8</span>
                          
                        </div>
                       <div>
                       <FaUser className="text-white" />
                       </div>
                    </div>
                </div>


            </div>


        </div>
    );
};

export default UserProfile;
