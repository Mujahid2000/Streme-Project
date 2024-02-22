"use client"

import { useRouter } from 'next/navigation';
import React from 'react';

const LoginButton = () => {
    const router = useRouter();

    const handleLoginClick = () => {
        router.push('/login');
    };

    return (
        <button onClick={handleLoginClick}>Login</button>
    );
};

export default LoginButton;
