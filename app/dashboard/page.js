"use client"
import Card from '@/components/dashboard/card/card';
import UserProfile from '@/components/dashboard/table/modal/UserRelated/userProfile/UserProfile';
import useUserInfo from '@/hooks/useUser';
import React from 'react';





const Dashboard = () => {
    const userInfo = useUserInfo();
    const isAdmin = userInfo?.isAdmin;
    return (
        <div className="h-screen">
            <div>

            {isAdmin ? <Card /> : <UserProfile/>}
          
            </div>

        </div>
    );
};

export default Dashboard;