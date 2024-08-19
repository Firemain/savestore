"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';

import firstImg from '@/assets/molletonJaune.jpg';
import secondImg from '@/assets/heartLove.jpg';
import thirdImg from '@/assets/margueriteNoire.jpg';

const images = [
  { image: firstImg, alt: 'Molleton Jaune Heart' },
  { image: secondImg, alt: 'Petits coeurs amoureux' },
  { image: thirdImg, alt: 'Marguerites noir' },
];

export default function ImageSlideshow() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex < images.length - 1 ? prevIndex + 1 : 0
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden shadow-lg">
  {images.map((image, index) => (
    <Image
      key={index}
      src={image.image}
      className={`w-full h-full object-cover absolute top-0 left-0 transition-all duration-500 ease-in-out ${
        index === currentImageIndex 
          ? 'z-10 opacity-100 transform scale-100 translate-x-0 rotate-0'
          : 'opacity-0 transform scale-110 -translate-x-4 -rotate-3'
      }`}
      alt={image.alt}
    />
  ))}
</div>

  );
}