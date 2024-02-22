// useUserInfo.js
import { useEffect, useState } from 'react';
import axios from 'axios';

const useUserInfo = () => {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const userDataString = localStorage.getItem('currentUser');
                if (!userDataString) {
                    console.error('No user data found in localStorage');
                    return;
                }
                const currentUser = JSON.parse(userDataString);
                const response = await axios.get('https://endgame-team-server.vercel.app/users');
                // Filter the response based on the current user's email
                const currentUserInfo = response.data.find(user => user.email === currentUser.email);
                setUserInfo(currentUserInfo);
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        fetchUserInfo(); // Always attempt to fetch user info on component mount
    }, []); // Empty dependency array ensures the effect runs only once

    return userInfo;
};

export default useUserInfo;
