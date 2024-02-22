"use client"
import MainNavbar from "@/components/MainNavbar/MainNavbar";
import Link from "next/link";
import { useEffect, useState } from "react";

const History = () => {
    const [moves, setMoves] = useState();
    const [historyVideo, setHistoryVideo] = useState([]);
    useEffect(() => {
        fetch('https://endgame-team-server.vercel.app/movies')
            .then(res => res.json())
            .then(data => setMoves(data))
    }, [])

    useEffect(() => {
        const history = JSON.parse(localStorage.getItem('videoHistory')) || [];
        console.log(history)
        const allMove = [];
        for (const id of history) {
            console.log(id)
            const video = moves?.find(move => id === move?._id);
            allMove.push(video)
        }
        setHistoryVideo(allMove)
    }, [moves])

    console.log(moves)
    console.log(historyVideo)
    return (
        <div className="">
            <MainNavbar></MainNavbar>
            <div className='max-w-[1640px] mx-auto flex justify-between py-4 items-center'>
                <h2 className='text-white  text-lg font-semibold'>History</h2>
                
            </div>
            {
                historyVideo?.length > 0 ? <div className="max-w-[1640px] mx-auto">
                    <div className="grid place-content-center grid-cols-1 md:grid-cols-2 lg:grid-cols-6  gap-4 gap-y-8">
                        {historyVideo?.map(item => (
                            <div key={item?._id}>
                                <Link href={`/movies/${item?._id}`}>
                                    <div className="max-w-xs relative text-white h-72 rounded-md shadow-md overflow-hidden">
                                        <img
                                            className="h-[265px] object-cover rounded-sm"
                                            src={item?.thumbnail?.link}
                                            alt="Movie Poster"
                                            width={400}
                                            height={200}
                                        />
                                        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-slate-950 opacity-100"></div>
                                        <p className="absolute top-0 right-0 rounded-sm px-1 text-[12px] font-light bg-green-500">Original</p>
                                        <div className="flex flex-col z-0 py-1 relative">
                                            <span className="text-sm">{item?.title && item?.title?.slice(0, 20)}...</span>

                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div> : <div className=' flex justify-between py-4 items-center'>
                    <h2 className='text-white  text-lg font-semibold'>No Add History</h2>
                </div>
            }


        </div>

    );
};

export default History;