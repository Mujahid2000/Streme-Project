'use client'
import Link from 'next/link';
import React from 'react';
import { IoMdMenu } from 'react-icons/io';

export default function Sidebar({ isOpen, handleSidebarToggle }) {
  return (
    <div
      className={`bg-gray-800 text-white fixed w-56 h-screen overflow-y-auto transition-transform transform ${
        isOpen ? '' : '-translate-x-full'
      } ease-in-out duration-300 z-50`}
      id="sidebar">
      <div className="p-4">
        <div className='flex justify-between items-center mt-2'>
          <h1 className="text-2xl font-semibold uppercase">Stream</h1>
          <button onClick={handleSidebarToggle}><IoMdMenu className='h-6 w-6' /></button>
        </div>
        <ul className="mt-16 leading-8">
          <li className="mb-2">
            <Link href={'/home'} className="block hover:text-indigo-400">
              Home
            </Link>
          </li>
          <li className="mb-2">
            <Link href={'/Sidebar/playlist'} className="block hover:text-indigo-400">
              Playlist Video
            </Link>
          </li>
          <li className="mb-2">
            <Link href={'/Sidebar/liked'} className="block hover:text-indigo-400">
              Liked Video
            </Link>
          </li>
          <li className="mb-2">
            <Link href={'/Sidebar/contact'} className="block hover:text-indigo-400">
              Social Chat
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
