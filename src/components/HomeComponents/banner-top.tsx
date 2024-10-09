'use client';

import React, { useEffect, useState } from 'react';

export const BannerTop = () => {
  const banners = [
    '/banner.jpg',
    '/banner.png',
    '/banner2.jfif'
  ]; // Banner directory

  const [currentBanner, setCurrentBanner] = useState(0); // State for controlling actual banner

  useEffect(() => {
    // Function for banner changing
    const changeBanner = () => {
      setCurrentBanner((prevBanner) => (prevBanner + 1) % banners.length);
    };

    // Interval time
    const intervalId = setInterval(changeBanner, 5000);

    // Clear Interval
    return () => clearInterval(intervalId);
  }, [banners.length]);

  return (
    <div className='max-w-7xl w-full h-auto mx-auto'>
      <img
        src={banners[currentBanner]}
        alt={`banner-${currentBanner}`}
        className='rounded-lg'
        data-aos="zoom-in"
        data-aos-delay="100"
        data-aos-duration="1000"
        style={{ width: '100%', height: '400px', objectFit: 'cover' }}
      />
    </div>
  );
};
