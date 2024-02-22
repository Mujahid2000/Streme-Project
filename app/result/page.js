'use client'
import MainNavbar from '@/components/MainNavbar/MainNavbar';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import ProtectedRoute from '@/utils/ProtectedRoute';


const Page = () => {
  const searchParams = useSearchParams();
  const [allDatas, setAllDatas] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [filterAllVideos, setFilterAllVideos] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState('');
  const [selectedDate, setSelectedDate] = useState('')


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://endgame-team-server.vercel.app/allDatas`, { cache: 'no-cache' });

        if (!res.ok) {
          console.error(`Failed to fetch data. Status: ${res.status}`);
        } else {
          const data = await res.json();
          setAllDatas(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const searchQuery = searchParams.get('q');
    if (searchQuery) {
      const filtered = allDatas.filter(movie => {
        return movie.title?.toLowerCase().includes(searchQuery.toLowerCase());
      });
      // console.log(filtered);
      setFilterAllVideos(filtered);
    } else {
      setFilterAllVideos(allDatas);
    }
  }, [searchParams, allDatas]);

  const handleSidebarToggle = () => {
    setIsOpen(!isOpen);
  };

  const genresCategory = Array.from(new Set(filterAllVideos.map((res) => res.genres)))
 

  const genresOption = genresCategory.map((genres) =>({
    value: genres,
    lebel: genres
  }))

  const filterVideos = filterAllVideos ? filterAllVideos.filter((filterAllVideos) => filterAllVideos.genres === filterAllVideos.value) : filterAllVideos;

  return (
    <ProtectedRoute>
      <Sidebar isOpen={isOpen} handleSidebarToggle={handleSidebarToggle}/>
     <MainNavbar isOpen={isOpen} handleSidebarToggle={handleSidebarToggle}/>
      <div className='flex flex-col md:flex-col lg:flex-row xl:flex-row 2xl:flex-row justify-center max-w-5xl mx-auto gap-4'>
      <div className=" mt-16 md:mt-16 lg:mt-20 xl:mt-24 2xl:mt-32 px-2">
      <select
    onChange={(event)=>setSelectedGenres(event.target.value)}
    className="px-2 rounded-l-md md:px-4 lg:px-4 py-1 md:py-3 lg:py-3  bg-slate-900 border-transparent text-xs md:text-sm lg:text-sm text-white"
    >
      <option value="">Type</option>
      {genresCategory.flat().map((select,i) =>{
      return <option key={i} value={select}>
        {select}
        </option>
      })}
    </select>

    <select
      onChange={(event) => setSelectedDate(event.target.value)}
      className="px-2 md:px-4 lg:px-4 py-1 md:py-3 lg:py-3  bg-slate-900 border-transparent text-xs md:text-sm lg:text-sm text-white"
    >
      <option value="">Date</option>
      <option value="this-week">This Week</option>
      <option value="this-month">This Month</option>
      <option value="this-year">This Year</option>
    </select>
    {/* <button className="px-2 ml-3 rounded-md md:px-4 lg:px-4 py-1 md:py-3 lg:py-3 bg-slate-900 hover:bg-gray-700 text-white text-xs md:text-sm lg:text-sm font-medium ">
      Reset Filter
    </button> */}
  </div>

        <div className='mt-2 md:mt-16 lg:mt-20 xl:mt-24 2xl:mt-28 mb-5'>
          {filterAllVideos.filter(_data => {
    
    if (selectedGenres) {
        if (typeof _data?.genres === 'string') {
            if (!_data?.genres.includes(selectedGenres)) {
                return false;
            }
        } else if (Array.isArray(_data?.genres)) {
            if (!_data?.genres.includes(selectedGenres)) {
                return false;
            }
        }
    }

   
    if (selectedDate) {
        const publishedDate = new Date(_data?.publisDate);
        const currentDate = new Date();
        if (selectedDate === 'this-week') {
            const startOfWeek = new Date(currentDate);
            startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(startOfWeek.getDate() + 7);
            return publishedDate >= startOfWeek && publishedDate < endOfWeek;
        } else if (selectedDate === 'this-month') {
            const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
            const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
            return publishedDate >= startOfMonth && publishedDate <= endOfMonth;
        } else if (selectedDate === 'this-year') {
            const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
            const endOfYear = new Date(currentDate.getFullYear() + 1, 0, 0);
            return publishedDate >= startOfYear && publishedDate <= endOfYear;
        }
    }
    return true; 
})?.map(movie => (
            <div  key={movie._id}>
              {movie.episodes ? (
                <Link href={`/drama/${movie._id}`}>
                <div className="max-w-4xl mx-auto mt-3 w-full item lg:flex px-2">
                  <div className="h-44 lg:h-56 lg:w-72 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style={{ backgroundImage: `url(${movie.thumbnail.link})` }} title={movie?.title} >
                  </div>
                  <div className=" bg-slate-900 rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                    <div className="mb-8 w-56">
                      <h2 className="text-white text-left hover:text-green-600 font-bold text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl mb-2">{movie?.title}</h2>
                    </div>
                  </div>
                </div>
              </Link>
              ) : (
                <Link href={`/movies/${movie._id}`}>
                  <div className="max-w-4xl mx-auto mt-3 w-full item lg:flex px-2">
                    <div className="h-44 lg:h-56 lg:w-72 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style={{ backgroundImage: `url(${movie.thumbnail.link})` }} title={movie?.title} >
                    </div>
                    <div className=" bg-slate-900 rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                      <div className="mb-8 w-56">
                        <h2 className="text-white text-left hover:text-green-600 font-bold text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl mb-2">{movie?.title}</h2>
                      </div>
                    </div>
                  </div>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Page;