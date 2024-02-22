"use client"
import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { storage } from '@/utils/firebase-config';
import axios from 'axios';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const ShowModal = ({ closeModal }) => {
  const [videoUploadPercent, setVideoUploadPercent] = useState(0);
  const [showData, setShowData] = useState({
    title: '',
    description: '',
    showAccess: 'standard',
    language: 'English',
    genres: 'Action',
    thumbnail: { file: null, link: null },
    poster: { file: null, link: null },
    publisDate: '',
    episodes: [],
    category: '',
    country: '',
    views: 0,

  });

  useEffect(() => {
    // Add any initial setup logic here
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShowData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileUpload = async (e) => {
    const { name, files } = e.target;

    if (!files || files.length === 0) {
      console.error('No files selected for upload');
      return;
    }

    const uploadedFile = files[0];

    if (!uploadedFile) {
      console.error('Uploaded file is not defined');
      return;
    }

    const storagePath = `images/${uploadedFile.name}`;
    const storageRef = ref(storage, storagePath);

    try {
      const uploadTask = uploadBytesResumable(storageRef, uploadedFile);

      uploadTask.on('state_changed', (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setVideoUploadPercent(progress)
        console.log(`Upload is ${progress}% done`);
      });

      await uploadTask;

      const downloadURL = await getDownloadURL(storageRef);

      switch (name) {
        case 'thumbnail':
          setShowData((prevData) => ({
            ...prevData,
            thumbnail: { file: uploadedFile, link: downloadURL },
          }));
          break;
        case 'poster':
          setShowData((prevData) => ({
            ...prevData,
            poster: { file: uploadedFile, link: downloadURL },
          }));
          break;
        default:
          break;
      }

      toast.success(`${name} uploaded successfully!`);
    } catch (error) {
      console.error(`Error uploading ${name}:`, error);
      toast.error(`Error uploading ${error}`);
    }
  };

  const handleSave = async () => {
    try {
      console.log('Show Info:', showData);

      const response = await axios.post('https://endgame-team-server.vercel.app/shows', showData);

      if (response.status === 200) {
        console.log('Show saved successfully:', response.data);

        const { acknowledged, insertedId } = response.data;

        toast.success(`show saved successfully! Acknowledged: ${acknowledged}, Inserted ID: ${insertedId}`, {
          autoClose: 5000,
        });
        closeModal()
      } else {
        console.error('Failed to save show:', response.status, response.statusText);
        toast.error('Failed to save show. Please try again.');
      }
    } catch (error) {
      console.error('Error saving show:', error.message);
      toast.error('Error saving show. Please try again.');
    }
  };

  return (
    <div className='w-full'>
      <div className='flex items-center justify-center bg-slate-900 bg-opacity-50'>
        <div className='p-6 rounded-lg w-full'>
          <h2 className='text-2xl font-bold mb-4'>Add Show</h2>
          <form>
            <fieldset className='border p-4'>
              <legend>Show</legend>

              <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-600'>Show Name:</label>
                <input
                  type='text'
                  name='title'
                  value={showData.title}
                  onChange={(e) => handleInputChange(e)}
                  className='mt-1 p-2 border text-white bg-slate-800 rounded w-full'
                  placeholder='Enter Show Name'
                />
              </div>

              <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-600'>Description:</label>
                <textarea
                  name='description'
                  value={showData.description}
                  onChange={(e) => handleInputChange(e)}
                  className='mt-1 p-2 border bg-slate-800 rounded w-full'
                  placeholder='Description'
                />
              </div>

              <div className='flex mb-4 gap-4 flex-col lg:flex-row lg:justify-between items-center'>
                <div className='w-full'>
                  <label className='block text-sm font-medium text-gray-600'>Show Access:</label>
                  <select
                    name='showAccess'
                    value={showData.showAccess}
                    onChange={(e) => handleInputChange(e)}
                    className='mt-1 p-2 border bg-slate-800 rounded w-full'
                  >
                    <option value='Free'>Free</option>
                    <option value='standard'>Standard</option>
                    <option value='premium'>Premium</option>
                  </select>
                </div>

                <div className='w-full'>
                  <label className='block text-sm font-medium text-gray-600'>Language:</label>
                  <select
                    name='language'
                    value={showData.language}
                    onChange={(e) => handleInputChange(e)}
                    className='mt-1 p-2 border bg-slate-800 rounded w-full'
                  >
                    <option value='Bangla'>Bangla</option>
                    <option value='Hindi'>Hindi</option>
                    <option value='English'>English</option>
                    <option value='China'>China</option>
                  </select>
                </div>
              </div>

              <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-600'>Genres:</label>
                <select
                  name='genres'
                  value={showData.genres}
                  onChange={(e) => handleInputChange(e)}
                  className='mt-1 p-2 border bg-slate-800 rounded w-full'
                >
                  <option value='Action'>Action</option>
                  <option value='Adventure'>Adventure</option>
                  <option value='Romance'>Romance</option>
                  <option value='Horror'>Horror</option>
                  <option value='Thriller'>Thriller</option>
                </select>
              </div>
              <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-600'>Category:</label>
                <select
                  name='category'
                  value={showData.category}
                  onChange={(e) => handleInputChange(e)}
                  className='mt-1 p-2 border bg-slate-800 rounded w-full'
                >
                  <option value='Drama'>Drama</option>
                  <option value='Animation'>Animation</option>

                </select>
              </div>

              <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-600'>Country:</label>
                <select
                  name='country'
                  value={showData.country}
                  onChange={(e) => handleInputChange(e)}
                  className='mt-1 p-2 border bg-slate-800 rounded w-full'
                >
                  <option value='China'>China</option>
                  <option value='UK'>UK</option>
                  <option value='India'>India</option>
                  <option value='Japan'>Japan</option>
                  {/* Add more countries as needed */}
                </select>
              </div>

            </fieldset>

            <fieldset className='border p-4'>
              <legend>MEDIA</legend>
              <div className='my-4'>
              <span className='py-2 bg-slate-800 px-4'>Upload Video {videoUploadPercent} %</span>
              </div>
              <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-600'>Thumbnail:</label>
                <input
                  type='file'
                  name='thumbnail'
                  onChange={handleFileUpload}
                  className='mt-1 p-2 border bg-slate-800 rounded w-full'
                />
              </div>

              <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-600'>Poster:</label>
                <input
                  type='file'
                  name='poster'
                  onChange={handleFileUpload}
                  className='mt-1 p-2 border bg-slate-800 rounded w-full'
                />
              </div>

            </fieldset>
          </form>

          <div className='flex justify-between text-sm lg:text-lg gap-x-2 py-2'>
            <button
              type='button'
              onClick={handleSave}
              className='bg-blue-500  text-white py-2 px-4 rounded hover:bg-green-600'
            >
              Save
            </button>
            <button
              onClick={closeModal}
              className='bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600'
            >
              Close Modal
            </button>
          </div>
        </div>
      </div>
      <Toaster
        position='top-center'
        reverseOrder={false}
      />
    </div>
  );
};

export default ShowModal;
