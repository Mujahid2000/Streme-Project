"use client"
import { useContext, useEffect } from 'react';

import { AuthContext } from '@/Provider/AuthProvider';
import { useRouter } from 'next/navigation';

const ProtectedRoute = ({ children }) => {
  const { currentUser, getCurrentUser } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    // Check if currentUser exists in context or in local storage
    if (!currentUser && !getCurrentUser()) {
      router.push('/login'); // Redirect to the login page
    }
  }, [currentUser, getCurrentUser, router]);

  // Render children only if currentUser exists
  return currentUser ? <>{children}</> : null;
};

export default ProtectedRoute;
