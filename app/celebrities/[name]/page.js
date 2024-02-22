/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import Suggest from "@/components/DetailsVideo/Suggest/Suggest";
import MainNavbar from "@/components/MainNavbar/MainNavbar";
import { useEffect, useState } from "react";


const page = ({params}) => {
    const {name} = params;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [celebrityData, setCelebrityData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`https://endgame-team-server.vercel.app/celebrities/${name}`, { cache: 'no-cache' });

                if (!res.ok) {
                    console.error(`Failed to fetch data. Status: ${res.status}`);
                } else {
                    const data = await res.json();
                    setCelebrityData(data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

        return () => {
            // Cleanup function (optional)
        };
    }, []);






    return (
        <>
            <MainNavbar></MainNavbar>
            <div className="max-w-[1400px] md:px-10 mx-auto py-[50px] md:py-[35px]">
                <div className=" flex justify-center items-center flex-col md:flex-row  my-20">
                    <div className="relative max-w-[350px] group">
                        <img className="rounded-lg transform scale-105 md:h-[500px]" src={celebrityData.image_url} alt="img" />
                        <span className="absolute -bottom-6 left-1/2 z-30 flex h-[40px] w-[40px] -translate-x-1/2 transform items-center  justify-center rounded-full bg-[#374151] bg-gradient-to-tr from-[#0d87f8]  to-[#70c4ff] duration-500 group-hover:rotate-180 group-hover:shadow-[0px_0px_30px_2px_#0d87f8]">
                            <svg width={25} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <g id="SVGRepo_bgCarrier" strokeWidth="0"></g> <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g> <g id="SVGRepo_iconCarrier"> <g id="style=linear"> <g id="add"> <path id="vector" d="M11.998 5.84424L11.998 18.1604" stroke="#9EE6FD" strokeWidth="2" strokeLinecap="round"></path> <path id="vector_2" d="M18.1561 12.002L5.83998 12.0019" stroke="#9EE6FD" strokeWidth="2" strokeLinecap="round"></path> </g> </g> </g> </svg>
                        </span>
                        <span className="bg-gradient-to-tr from-[#0d87f8]/80 to-[#70c4ff]/80 duration-300  absolute -bottom-6 left-1/2 transform -translate-x-1/2 rounded-full  z-20 w-0 h-0  group-hover:w-[50px] group-hover:h-[50px]"></span>
                        <span className="bg-gradient-to-tr from-[#0d87f8]/50 to-[#70c4ff]/50 duration-500  absolute -bottom-6 left-1/2 transform -translate-x-1/2 rounded-full  z-20 w-0 h-0  group-hover:w-[60px] group-hover:h-[60px] hover:duration-300 "></span>
                    </div>
                    <div className="bg-[white] space-y-12  max-w-[350px] rounded-tr-lg rounded-br-lg md:w-[350px] text-center p-10 shadow-[0px_7px_30px_2px_rgba(100,100,111,0.2)]">
                        <div className="space-y-1">
                            <h2 className="text-3xl font-medium text-gray-700 text-center font-sans">
                                {celebrityData.name}
                            </h2>
                            <p className="font-sans  text-gray-500">{celebrityData.instagram}</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="space-y-1">
                                <p className="text-gray-500 text-sm font-sans">Movie</p>
                                <p className="text-3xl tracking-wider text-gray-700">23</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-gray-500 text-sm font-sans">Following</p>
                                <p className="text-3xl tracking-wider text-gray-700">314k</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-gray-500 text-sm font-sans">Followers</p>
                                <p className="text-3xl tracking-wider text-gray-700">487k</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-black">{celebrityData.about}</p>
                        </div>
                    </div>

                </div>
                <Suggest/>
            </div>
        </>
    );
};

export default page;