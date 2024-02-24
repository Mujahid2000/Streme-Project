"use client"
import React, { useState } from 'react';
import MovieModal from '../../table/modal/movieModal/movieModal';
import ShowModal from '../../table/modal/showModal/showModal';

import UploadModal from '../../table/modal/UserRelated/uploadModal/uploadModal';
import EpisodeModal from '@/components/dashboard/table/modal/episodeModal/episodeModal';
const HeaderChildren = ({ dbutton }) => {

  const [isModalOpen, setModalOpen] = useState(false);


  const handleAddButtonClick = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };



  const getModalComponent = () => {
    switch (dbutton) {
      case "Add Movie":
        return <MovieModal closeModal={handleModalClose} />;

      case "Add Show":
        return <ShowModal closeModal={handleModalClose} />;
      case "Video Upload":
        return <UploadModal closeModal={handleModalClose} />;
      case "Add Episode":
        return <EpisodeModal closeModal={handleModalClose} />;

      default:
        return null;
    }
  };

  return (
    <div>
      <div className='flex flex-col gap-4 py-3'>
        <div className='flex flex-row justify-between'>

          <div className='flex gap-2 justify-center items-center'>
            <button className='bg-blue-500  text-white lg:py-1  px-4 rounded hover:bg-blue-700' onClick={handleAddButtonClick}>+{dbutton} </button>
            {dbutton === "!Disable" && (
              <p className='bg-red-500 text-white lg:py-1 px-4 rounded'>
                Go to your profile & Update your Info
              </p>
            )}
          </div>
        </div>
        <hr />

        {/* Modal */}
        {isModalOpen && getModalComponent()}
      </div>

    </div>
  );
};

export default HeaderChildren;