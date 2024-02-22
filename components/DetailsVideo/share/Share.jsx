'use client'
import React, { useState } from 'react';
import { FaShare, FaClosedCaptioning } from 'react-icons/fa';
import { FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa6';
import { IoCloseOutline } from 'react-icons/io5';
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton } from 'react-share';

const Share = ({ video }) => {
  const [open, setOpen] = useState(false);

  const handleShare = () => {
    setOpen(!open);
  };

  return (
    <div>
      <button onClick={handleShare} className="flex items-center space-x-1">
        <FaShare />
        <span>Share</span>
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-80">
            <div className="flex justify-between  items-center mb-4">
              <h2 className="text-lg font-semibold text-black text-center">Share Video</h2>
              <button onClick={handleShare} className="text-gray-500 hover:text-gray-700">
                <IoCloseOutline className='w-6 h-6' />
              </button>
            </div>
            <div className="flex max-w-20 mx-auto gap-5 ml-3">
              <FacebookShareButton url={video}>
                <FaFacebook className="text-blue-500" size={20} />
              </FacebookShareButton>
              <TwitterShareButton url={video}>
                <FaTwitter className="text-blue-400" size={20} />
              </TwitterShareButton>
              <LinkedinShareButton url={video}>
                <FaLinkedin className="text-blue-700" size={20} />
              </LinkedinShareButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Share;
