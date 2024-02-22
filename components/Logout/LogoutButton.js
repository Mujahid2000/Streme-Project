import React, { useContext } from 'react';

import { AuthContext } from '@/Provider/AuthProvider';
import { useRouter } from 'next/navigation';




const LogoutButton = () => {
  const router = useRouter()
  const { logout } = useContext(AuthContext);
  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login')


    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  return (
    <div className='text-white'>
      <button onClick={handleLogout}>Logout</button>

    </div>
  );
};

export default LogoutButton;
