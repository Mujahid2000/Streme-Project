"use client";
import React, { useEffect, useState } from "react";
import Layout from "../layout";
import MainNavbar from "@/components/MainNavbar/MainNavbar";
import useUserInfo from "@/hooks/useUser";
import axios from "axios";
import Link from "next/link";

import {
} from "react-icons/io";
import ProtectedRoute from "@/utils/ProtectedRoute";
import Sidebar from "../Sidebar";
import { FaAngleDown } from "react-icons/fa";

const Page = () => {
  const [playlist, setPlaylist] = useState();
  const userInfo = useUserInfo();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState([]);

  const email = userInfo?.email;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (email) {
          const response = await axios.get(
            `https://endgame-team-server.vercel.app/playlist/${email}`
          );
          const responseData = response.data;
          setPlaylist(responseData);
          setIsOpenMenu(Array(responseData.length).fill(false));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [email]);

  const handleSidebarToggle = () => {
    setIsOpen(!isOpen);
  };

  const toggleMenu = (index) => {
    const updateOpenMenu = [...isOpenMenu];
    updateOpenMenu[index] = !updateOpenMenu[index];
    setIsOpenMenu(updateOpenMenu);
  };

  const handleDelete = async (data) => {
    // console.log('data', data);
    try {

      await axios.delete(`https://endgame-team-server.vercel.app/playlist/${data._id}`);
      console.log('Video deleted successfully');
      setPlaylist((prevPlaylist) => prevPlaylist.filter(item => item._id !== data._id))

    } catch (error) {
      console.error('Error deleting video:', error);

    }
  }

  return (
    <ProtectedRoute>
      <Layout>
        <Sidebar isOpen={isOpen} handleSidebarToggle={handleSidebarToggle} />
        <MainNavbar
          isOpen={isOpen}
          handleSidebarToggle={handleSidebarToggle}
        ></MainNavbar>
        <div className="flex mt-24 flex-col md:flex-col lg:flex-row max-w-6xl mx-auto justify-evenly px-3 ">
          <div className="mt-7">
            <h2 className="text-sm text-white md:text-lg lg:text-xl xl:text-2xl 2xl:text-2xl font-serif">
              Playlist Total Video: {playlist?.length}
            </h2>
          </div>
          <div>
            <div>
              {playlist &&
                playlist.map((data, index) => (
                  <div key={index} className="">
                    <div className="max-w-2xl">

                      <div className="flex items-center mt-7 bg-red-lightest">
                        <div
                          className="bg-slate-900 shadow-lg rounded-lg w-[320px] md:w-[480px] lg:w-[600px] xl:w-[720px] 2xl:w-[720px]">
                          <div className="flex">
                            <div>
                              <Link href={`/movies/${data?.data._id}`}>
                                <img
                                  className="w-28 md:w-36 lg:w-40 xl:w-48 2xl:w-60 max-h-80 rounded"
                                  src={data?.data?.thumbnail?.link}
                                  alt="Album Pic"
                                />
                              </Link>
                            </div>
                            <div className="w-full px-8 py-4">
                              <div className="flex justify-between">
                                <Link href={`/movies/${data?.data._id}`}>
                                  <div>
                                    <h3 className="text-base text-white md:text-xl lg:text-2xl hover:text-green-600 text-grey-darkest font-medium">
                                      {data?.data?.title}{" "}
                                    </h3>
                                    <p className="text-sm text-white text-grey mt-1">
                                      {data?.data?.publisDate}
                                    </p>
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
                                          <button onClick={() => handleDelete(data)} className="block px-4 py-2 text-sm text-white hover:bg-gray-700 w-full text-left">
                                            Delete
                                          </button>
                                        </li>
                                      </ul>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="flex float-start justify-around items-center lg:mt-8">
                                <Link href={`/movies/${data?.data._id}`}>
                                  <button className="relative h-12 w-28 md:w-32 lg:w-40 overflow-hidden border border-green-600 text-green-600 shadow-2xl transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-green-600 before:duration-300 before:ease-out hover:text-white hover:shadow-green-600 hover:before:h-40 hover:before:w-40 hover:before:opacity-80">
                                    <span className="relative text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-xl  z-10">
                                      Watch Now
                                    </span>
                                  </button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default Page;