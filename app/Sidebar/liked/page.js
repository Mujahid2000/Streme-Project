'use client'
import React, { useEffect, useState } from 'react';
import Layout from '../layout';
import MainNavbar from '@/components/MainNavbar/MainNavbar';
import ProtectedRoute from '@/utils/ProtectedRoute';
import Sidebar from '../Sidebar';
import useUserInfo from '@/hooks/useUser';
import Link from 'next/link';
import axios from 'axios';
import { FaAngleDown } from 'react-icons/fa';

const Page = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [like, setLike] = useState();
    const userInfo = useUserInfo();
    const email = userInfo?.email;  
    const [isOpenMenu, setIsOpenMenu] = useState([])
    console.log(like);
    

    const handleSidebarToggle = () => {
        setIsOpen(!isOpen);
      };


      useEffect(() => {
        const fetchData = async () => {
            try {
                if (email) {
                    const response = await axios.get(`http://localhost:5000/like/${email}`);
                    const responseData = response.data;
                    setLike(responseData);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, [email]);

    const toggleMenu = (index) =>{
      const updateOpenMenu = [...isOpenMenu];
      updateOpenMenu[index] = !updateOpenMenu[index];
      setIsOpenMenu(updateOpenMenu);
    }

    const handleDelete = async(data) =>{
      try{
        axios.delete(`http://localhost:5000/like/${data._id}`);
        console.log('video deleted successfully');
        setLike((likeList) => likeList.filter(item => item._id !== data._id ))
      }catch(error){
        console.error('Error deleting like video', error)
      }
    }

    
    
    return (
        <ProtectedRoute>
            <Layout>
            <Sidebar isOpen={isOpen} handleSidebarToggle={handleSidebarToggle}/>
            <MainNavbar isOpen={isOpen} handleSidebarToggle={handleSidebarToggle}></MainNavbar>
            <div className='flex mt-24 flex-col md:flex-col lg:flex-row max-w-6xl mx-auto justify-evenly px-3'>
              <div><h2 className='text-base md:text-xl lg:text-2xl mt-7 font-serif'>Liked Total Video: {like?.length}</h2></div>
              <div>
              {
  like &&
  like.map((data, index) => (
    <div key={index}>
      <div className="w-full">
        <div className="h-2 bg-red-light"></div>
        <div className="flex items-center justify-center mt-7 bg-red-lightest">
          <div className="bg-slate-900 shadow-lg rounded-lg" style={{ width: '45em' }}>
            <div className="flex">
              <div>
                <Link href={`/movies/${data?.data._id}`}>
                  <img className="w-60 max-h-80 rounded hidden md:block" src={data?.data?.thumbnail?.link} alt="Album Pic" />
                </Link>
              </div>
              <div className="w-full px-8 py-4">
                <div className="flex justify-between">
                  <Link href={`/movies/${data?.data._id}`}>
                    <div>
                      <h3 className="text-base md:text-xl lg:text-2xl hover:text-green-500 text-grey-darkest font-medium">{data?.data?.title} </h3>
                      <p className="text-sm text-grey mt-1">{data?.data?.publisDate}</p>
                    </div>
                  </Link>
                <div className="relative">
                                  <button
                                    onClick={() => toggleMenu(index)}
                                    className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:bg-gray-700"
                                  >
                                    <FaAngleDown />
                                  </button>
                                  {isOpenMenu[index] && (
                                    <div className="absolute z-10 mt-2 bg-gray-800 rounded-md shadow-lg">
                                      <ul className="py-1">
                                        <li>
                                          <button onClick={()=>handleDelete(data)} className="block px-4 py-2 text-sm text-white hover:bg-gray-700 w-full text-left">
                                            Delete
                                          </button>
                                        </li>
                                      </ul>
                                    </div>
                                  )}
                  </div>
                </div>
                <div className="flex float-start justify-around items-center mt-8">
                  <Link href={`/movies/${data?.data._id}`}>
                    <button className="text-green hover:before:bg-green-500  relative h-[50px] w-28 md:w-32 lg:w-40 overflow-hidden border border-green-500  px-3 text-green-500 shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-green-500 before:transition-all before:duration-500 hover:text-white hover:shadow-green-500 hover:before:left-0 hover:before:w-full">
                      <span className="relative  z-10">Watch Now</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ))
}
              </div>
            </div>

            </Layout>
        </ProtectedRoute>
    );
};

export default Page;