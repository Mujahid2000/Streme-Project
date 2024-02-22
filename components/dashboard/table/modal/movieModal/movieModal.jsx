"use client"
import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { storage } from '@/utils/firebase-config';
import axios from 'axios';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const MovieModal = ({ closeModal }) => {
  const [videoUploadPercent, setVideoUploadPercent] = useState(0);
  const [movieInfo, setMovieInfo] = useState({
    title: '',
    description: '',
    access: 'standard',
    language: 'English',
    genres: 'Action',
    thumbnail: { file: null, link: null },
    poster: { file: null, link: null },
    videoQuality: '480',
    video: { file: null, link: null },
    publisDate: '',
    audience: '',
    views: 0,
    category:'',
    cast: [{ name: '', image: { file: null, link: null } }], // Default one empty cast member
  });

  useEffect(() => {
    // Add any initial setup logic here
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMovieInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleFileUpload = async (e, index) => {
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
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setVideoUploadPercent(progress);
        console.log(`Upload is ${progress}% done`);
      });
  
      await uploadTask;
  
      const downloadURL = await getDownloadURL(storageRef);
  
      switch (name) {
        case 'thumbnail':
          setMovieInfo((prevInfo) => ({
            ...prevInfo,
            thumbnail: { file: uploadedFile, link: downloadURL },
          }));
          break;
        case 'poster':
          setMovieInfo((prevInfo) => ({
            ...prevInfo,
            poster: { file: uploadedFile, link: downloadURL },
          }));
          break;
        case 'video':
          setMovieInfo((prevInfo) => ({
            ...prevInfo,
            video: { file: uploadedFile, link: downloadURL },
          }));
          break;
        case 'castImage':
          const updatedCast = [...movieInfo.cast];
          updatedCast[index].image = { file: uploadedFile, link: downloadURL };
          setMovieInfo((prevInfo) => ({
            ...prevInfo,
            cast: updatedCast,
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
  
  const handleNameChange = (index, name) => {
    const updatedCast = [...movieInfo.cast];
    updatedCast[index].name = name;
    setMovieInfo((prevInfo) => ({
      ...prevInfo,
      cast: updatedCast,
    }));
  };

  const handleAddCastMember = () => {
    setMovieInfo((prevInfo) => ({
      ...prevInfo,
      cast: [...prevInfo.cast, { name: '', image: { file: null, link: null } }],
    }));
  };

  const handleRemoveCastMember = (index) => {
    setMovieInfo((prevInfo) => ({
      ...prevInfo,
      cast: prevInfo.cast.filter((_, idx) => idx !== index),
    }));
  };

  const handleSave = async () => {
    try {
      console.log('Movie Info:', movieInfo);

      const response = await axios.post('https://endgame-team-server.vercel.app/movies', movieInfo);

      if (response.status === 200) {
        console.log('Movie saved successfully:', response.data);

        const { acknowledged } = response.data;

        toast.success(`Movie saved successfully! Acknowledged: ${acknowledged}`, {
          autoClose: 5000,
        });

        closeModal();
      } else {
        console.error('Failed to save movie:', response.status, response.statusText);
        toast.error('Failed to save movie. Please try again.');
      }
    } catch (error) {
      console.error('Error saving movie:', error.message);
      toast.error('Error saving movie. Please try again.');
    }
  };

  return (
    <div className='w-full'>
      <div className='flex items-center justify-center bg-slate-900 bg-opacity-50'>
        <div className='p-6 rounded-lg w-full'>
          <h2 className='text-2xl font-bold mb-4'>Add Movie</h2>
          <form>
            <fieldset className='border p-4'>
              <legend>Movie</legend>

              <div className='mb-4'>
                <label className='block text-sm font-medium text-white'>Movie Name:</label>
                <input
                  type='text'
                  name='title'
                  value={movieInfo.title}
                  onChange={(e) => handleInputChange(e)}
                  className='mt-1 p-2 border text-white bg-slate-800 rounded w-full'
                  placeholder='Enter Movie Name'
                />
              </div>

              <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-600'>Description:</label>
                <textarea
                  name='description'
                  value={movieInfo.description}
                  onChange={(e) => handleInputChange(e)}
                  className='mt-1 p-2 border bg-slate-800 rounded w-full'
                  placeholder='Description'
                />
              </div>

              <div className='flex mb-4 gap-4 flex-col lg:flex-row lg:justify-between items-center'>
                <div className='w-full'>
                  <label className='block text-sm font-medium text-gray-600'>Movie Access:</label>
                  <select
                    name="access"
                    id="movie-access"
                    className='mt-1 p-2 border bg-slate-800 rounded w-full'
                    value={movieInfo.access}
                    onChange={handleInputChange}
                  >
                    <option value="Free">Free</option>
                    <option value="standard">Standard</option>
                    <option value="premium">Premium</option>
                  </select>
                </div>

                <div className='w-full'>
                  <label className='block text-sm font-medium text-gray-600'>Language:</label>
                  <select
                    name="language"
                    id="language"
                    className='mt-1 p-2 border bg-slate-800 rounded w-full'
                    value={movieInfo.language}
                    onChange={(e) => handleInputChange(e)}
                  >
                    <option value="Bangla">Bangla</option>
                    <option value="Hindi">Hindi</option>
                    <option value="English">English</option>
                    <option value="China">China</option>
                  </select>
                </div>
                <div className='w-full'>
                  <label htmlFor="publicDate" className="text-sm block font-semibold text-gray-600">
                    Public Date
                  </label>
                  <input
                    type="date"
                    id="publisDate"
                    name="publisDate"
                    value={movieInfo.publisDate}
                    onChange={(e) =>handleInputChange(e)}
                    className="mt-1 p-2 border bg-slate-800 rounded w-full"
                  />
                </div>
                <div className='w-full'>
                  <label className='block text-sm font-medium text-gray-600'>Genres:</label>
                  <select
                    name="genres"
                    id="genres"
                    className='mt-1 p-2 border bg-slate-800 rounded w-full'
                    value={movieInfo.genres}
                    onChange={(e) => handleInputChange(e)}
                  >
                    <option value="Action">Action</option>
                    <option value="Adventure">Adventure</option>
                    <option value='Romance'>Romance</option>
                    <option value="Horror">Horror</option>
                    <option value="Thriller">Thriller</option>
                  </select>
                </div>
              </div>

              <div className='w-full'>
                <label className='block text-sm font-medium text-gray-600'>Category:</label>
                <select
                  name='category'
                  id='category'
                  value={movieInfo.category}
                  onChange={(e) => handleInputChange(e)}
                  className='mt-1 p-2 border bg-slate-800 rounded w-full'
                >
                  <option value='Movie'>Movie</option>
                  <option value='Animation'>Animation</option>

                </select>
              </div>

            </fieldset>

            {/* Cast field */}
            <fieldset className='border p-4'>
              <legend>Cast</legend>
              <span className=' flex justify-center items-center text-center'>
                {videoUploadPercent &&
                  <h2 className=' bg-green-500 p-2 text-lg  rounded-md'>
                    Upload is {videoUploadPercent}% done
                  </h2>}
              </span>
              <div className='mb-4'>
                {movieInfo.cast.map((member, index) => (
                  <div key={`cast-${index}`} className="flex flex-col  gap-4 mb-2">
                    <div >
                      <label className='block text-sm font-medium text-gray-600'>Cast Image:</label>
                      <input
                        type='file'
                        name={`castImage-${index}`}
                        onChange={(e) => handleFileUpload(e, index)}
                        className='mt-1 p-2 border bg-slate-800 rounded w-full'
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-600'>Name:</label>
                      <input
                        type="text"
                        value={member.name}
                        onChange={(e) => handleNameChange(index, e.target.value)}
                        placeholder={`Cast Name ${index + 1}`}
                        className='mt-1 p-2 border bg-slate-800 rounded w-full'
                      />
                    </div>
                    <div>
                    <button type="button" onClick={() => handleRemoveCastMember(index)} className=" bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">Remove Cast</button>
                    </div>
                  </div>
                ))}
                <button type="button" onClick={handleAddCastMember} className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Add Cast</button>
              </div>
            </fieldset>

            {/* Other movie fields */}
            <fieldset className='border p-4'>
              <legend>Audience</legend>

              <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-600'>Audience:</label>
                <select
                  name="audience"
                  id="audience"
                  className='mt-1 p-2 border bg-slate-800 rounded w-full'
                  value={movieInfo.audience}
                  onChange={(e) => handleInputChange(e)}
                >
                  <option value="">Select Audience</option>
                  <option value="adults">Adults</option>
                  <option value="kids">Kids</option>
                </select>
              </div>
            </fieldset>
            <fieldset className='border p-4'>
              <legend>MEDIA</legend>
              <span className=' flex justify-center items-center text-center'>
                {videoUploadPercent &&
                  <h2 className=' bg-green-500 p-2 text-lg  rounded-md'>
                    Upload is {videoUploadPercent}% done
                  </h2>}
              </span>
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



              <h2>Video Quality</h2>
              <div className='flex flex-col lg:justify-between items-center mb-4 gap-4'>
                <div className='w-full'>
                  <label className='block text-sm font-medium text-gray-600'>Quality</label>
                  <select
                    id="videoQuality"
                    name='videoQuality'
                    value={movieInfo.videoQuality}
                    onChange={(e) => handleInputChange(e)}
                    className='mt-1 p-2 border bg-slate-800 rounded w-full'
                    placeholder="select genres"
                  >
                    <option value="480">480</option>
                    <option value="720">720</option>
                    <option value="1080">1080</option>
                  </select>
                </div>
                <div className=' w-full'>
                  <label className='block text-sm font-medium text-gray-600'>Video:</label>
                  <input
                    type='file'
                    name='video'
                    onChange={handleFileUpload}
                    className='mt-1 p-2 border bg-slate-800 rounded w-full'
                  />
                </div>
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
        position="top-center"
        reverseOrder={false}
      />
    </div>
  );
};

export default MovieModal;
