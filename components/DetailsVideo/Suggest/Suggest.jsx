import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

const Suggest = () => {
  const [suggest, setSuggest] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/suggest')
      .then(res => res.data)
      .then(data => {
        // Shuffle the array randomly
        const shuffledData = data.sort(() => Math.random() - 0.5);
        setSuggest(shuffledData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 20 },
          768: { slidesPerView: 4, spaceBetween: 40 },
          1024: { slidesPerView: 5, spaceBetween: 50 }
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {suggest.map((item) => (
          <SwiperSlide key={item._id}>
            <Link href={`/movies/${item._id}`}>
              
                <img className='h-80' src={item.thumbnail.link} alt={item.title} />
                <p className='text-white'>{item.title}</p>
              
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Suggest;
