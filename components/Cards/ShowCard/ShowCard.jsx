// compontst-/showcard
"use client"
import React, { useEffect, useState } from 'react';

import Link from 'next/link';

const ShowCard = () => {
    const [showsData, setShowsData] = useState([]);
  
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`https://endgame-team-server.vercel.app/latestShows`, { cache: 'no-cache' });

                if (!res.ok) {
                    console.error(`Failed to fetch data. Status: ${res.status}`);
                } else {
                    const data = await res.json();
                    setShowsData(data);
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
        <section className=' max-w-7xl mx-auto p-4 lg:p-0'>
             <h2 className='text-white my-2 text-lg font-semibold'>Latest Shows</h2>
              
                <div className="grid place-content-center grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 gap-y-8 ">
                {showsData.map((item) => (
                    <div key={item._id} className="relative">
                        <Link href={`/drama/episode/${item._id}`}>
                            <div className="max-w-sm  text-white h-64 lg:h-[320px] rounded-md shadow-md overflow-hidden">
                                <img
                                    className="h-56 lg:h-72 w-full object-cover rounded-sm"
                                    src={item?.thumbnail?.link}
                                    alt="Episode Thumbnail"
                                    width={400}
                                    height={200}
                                />
                                <div className=" bottom-0 left-0 h-4 w-full bg-gradient-to-t from-slate-950 opacity-100 text-center text-white py-2"> {/* Adjust bottom and other styles as needed */}
                                   
                                    <span className="text-sm">{item.title.slice(0, 20)}...</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
         
            </section>
          
        </>
    );
};

export default ShowCard;
