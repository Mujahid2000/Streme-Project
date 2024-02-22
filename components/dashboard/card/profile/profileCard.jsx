import React from 'react';

import useUserInfo from '@/hooks/useUser';

const ProfileCard = () => {
  const userInfo = useUserInfo();
  const dynamicUserProfile = {
    imageUrl:  userInfo?.photoURL,// Use profileavt if userInfo is undefined
    name: userInfo?.userName,
    role: 'Admin',
    status: 'Active',
  };

  return (
    <div className="h-full p-4 relative  rounded-lg shadow-md bg-slate-900">
      <div className="flex  justify-center">
        {userInfo ? (
          <>
            <img
              src={dynamicUserProfile.imageUrl}
              alt="Profile"
              className="rounded-full w-36 h-36 object-cover border-4 border-blue-500"
            />
            {/* eslint-disable @next/next/no-img-element */}
          </>
        ) : (
          <img
            src="https://i.ibb.co/dgPCtjH/profileavt.jpg"
            alt="Profile"
            className="rounded-full w-36 h-36 object-cover border-4 border-blue-500"
          />
        )}
      </div>
      <div className="text-center mt-4">
        <h2 className="text-xl font-semibold">{dynamicUserProfile.name}</h2>
        <p className="text-gray-500">{dynamicUserProfile.role}</p>
        <p className={`mt-2 text-sm ${dynamicUserProfile.status === 'Active' ? 'text-green-500' : 'text-red-500'}`}>
          {dynamicUserProfile.status}
        </p>
      </div>
      <div className="mt-4 flex absolute -bottom-1 p-2 right-0 justify-center">
        <button className="bg-slate-950 text-sm text-white px-4  rounded-sm  focus:outline-none">
          Edit
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
