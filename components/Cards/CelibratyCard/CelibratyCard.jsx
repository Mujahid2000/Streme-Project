import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const CelibratyCard = () => {
        const [celebrities, setCelebrities] = useState([]);

        useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`https://endgame-team-server.vercel.app/celebrities`, { cache: 'no-cache' });

                if (!res.ok) {
                    console.error(`Failed to fetch data. Status: ${res.status}`);
                } else {
                    const data = await res.json();
                    setCelebrities(data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);
    return (
        <div>
              <div className='py-4'>
                    <h2 className='text-white  text-lg font-semibold'>Popular Celebrities</h2>
                    <div className='grid grid-cols-2 text-white  md:grid-cols-5 lg:grid-cols-10 gap-10'>
                        {
                            celebrities.map(celebrity => <Link href={`/celebrities/${celebrity._id}`} key={celebrity._id}><div className='flex flex-col justify-center items-center hover:scale-110 hover:text-[#01B84C] duration-300'>
                                <img className='rounded-full text-white  w-32 h-32 hover:border-[#01B84C] hover:border-4 duration-300' src={celebrity.image_url}></img>
                                <h1>{celebrity.name}</h1>
                            </div></Link>)
                        }
                    </div>
                </div>
        </div>
    );
};

export default CelibratyCard;