"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { storage } from '@/utils/firebase-config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const EpisodeModal = ({ closeModal }) => {
  const [videoUploadPercent, setVideoUploadPercent] = useState(0);
  const [formData, setFormData] = useState({
    episodes: 0,
    description: '',
    title: '', // Initialize to empty string
    thumbnail: { file: null, link: null },
    poster: { file: null, link: null },
    video: { file: null, link: null },
    status: 'enable',
    views:0,
  
  });

  const [isLoading, setIsLoading] = useState(true); // Renamed isClient to isLoading
  const [showNames, setShowNames] = useState([]);
  const [selectedShowId, setSelectedShowId] = useState(null);
  const [insertedEpisodeId, setInsertedEpisodeId] = useState(null);

  useEffect(() => {
    const fetchShowNames = async () => {
      try {
        const response = await axios.get('https://endgame-team-server.vercel.app/latestShows');
        setShowNames(response.data);
      } catch (error) {
        console.error('Failed to fetch show names:', error.message);
        toast.error('Failed to fetch show names. Please try again.');
      } finally {
        setIsLoading(false); // Update isLoading once data is fetched
      }
    };

    fetchShowNames();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = name === 'episodes' ? parseInt(value, 10) : value;
    setFormData({
      ...formData,
      [name]: parsedValue,
    });
  };

  const handleFileUpload = async (e) => {
    if (isLoading) return;

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

    const storagePath = `seasons/${uploadedFile.name}`;
    const storageRef = ref(storage, storagePath);

    try {
      const uploadTask = uploadBytesResumable(storageRef, uploadedFile);

      uploadTask.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setVideoUploadPercent(progress);
        console.log(`Upload is ${progress}% done`);
      });

      await uploadTask;

      const downloadURL = await getDownloadURL(storageRef);

      switch (name) {
        case 'thumbnail':
          setFormData((prevData) => ({
            ...prevData,
            thumbnail: { file: uploadedFile, link: downloadURL },
          }));
          break;
        case 'poster':
          setFormData((prevData) => ({
            ...prevData,
            poster: { file: uploadedFile, link: downloadURL },
          }));
          break;
        case 'video':
          setFormData((prevData) => ({
            ...prevData,
            video: { file: uploadedFile, link: downloadURL },
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
    if (formData.episodes === 0) {
      toast.error('Episode number cannot be 0. Please enter a valid episode number.');
      return; // Prevent further execution
    }

    try {
      const response = await axios.post('https://endgame-team-server.vercel.app/episodes', formData);
      const { insertedId, acknowledged } = response.data;
      if (!insertedId) {
        console.error('Error saving episode: Inserted ID is missing');
        toast.error('Error saving episode. Inserted ID is missing.');
        return;
      }
      setInsertedEpisodeId(insertedId); // Update insertedEpisodeId state

      // Wait for insertedEpisodeId state to update
      await new Promise((resolve) => setTimeout(resolve, 100));

      toast.success(`Episode saved successfully! Acknowledged: ${acknowledged}`, {
        autoClose: 5000,
      });

      const showResponse = await axios.put(`https://endgame-team-server.vercel.app/shows/${selectedShowId}/episodes`, {
        episodeId: insertedId,
      });
      console.log('Show updated successfully:', showResponse.data);
    } catch (error) {
      console.error('Error saving episode:', error.message);
      toast.error('Error saving episode. Please try again.');
    }
  };

  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Episodes:</label>
        <input
          type="number"
          name="episodes"
          value={formData.episodes}
          onChange={handleInputChange}
          className="mt-1 p-2 border bg-slate-800 rounded w-full"
          min="1" // Assuming episode number starts from 1
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Description:</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="mt-1 p-2 border bg-slate-800 rounded w-full"
          placeholder="Description"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Choose Show Name:</label>
        <select
          name="title"
          value={formData.title}
          onChange={(e) => {
            const { value } = e.target;
            setSelectedShowId(value); // Update selected show ID first
            const selectedShow = showNames.find((show) => show._id === value);
            if (selectedShow) {
              setFormData((prevData) => ({
                ...prevData,
                title: selectedShow.title, // Set title based on _id
              }));
            }
          }}
          className="mt-1 p-2 border bg-slate-800 rounded w-full"
        >
          <option value="">Select a show</option>
          {showNames.map((show) => (
            <option key={show._id} value={show._id}>
              {show.title}
            </option>
          ))}
        </select>
      </div>
      <span className="flex justify-center items-center text-center">
        {videoUploadPercent && (
          <h2 className="bg-green-500 p-2 text-lg rounded-md">Upload is {videoUploadPercent}% done</h2>
        )}
      </span>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Thumbnail:</label>
        <input
          type="file"
          name="thumbnail"
          onChange={handleFileUpload}
          className="mt-1 p-2 border bg-slate-800 rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Poster:</label>
        <input
          type="file"
          name="poster"
          onChange={handleFileUpload}
          className="mt-1 p-2 border bg-slate-800 rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Video:</label>
        <input
          type="file"
          name="video"
          onChange={handleFileUpload}
          className="mt-1 p-2 border bg-slate-800 rounded w-full"
        />
      </div>
      <button onClick={handleSave} className="bg-blue-500 text-white p-2 rounded mt-4">
        Save
      </button>
      <button onClick={closeModal} className="bg-gray-500 text-white p-2 rounded mt-2">
        Close Modal
      </button>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default EpisodeModal;
