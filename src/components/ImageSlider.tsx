"use client";
import { useState, useEffect, JSX } from "react";
import Image from "next/image";
import { StaticImageData } from "next/image";
import hero from "../../public/hero.jpg";
import branding from "../../public/branding.png";
import content from "../../public/content.png";

// Interface for image data
interface ImageData {
  src: StaticImageData;
  alt: string;
}

// Image data array
const images: ImageData[] = [
  {
    src: hero,
    alt: "Hero image 1"
  },  
  {
    src:  hero,
    alt: "Branding services"
  },
  {
    src: hero,
    alt: "Content creation"
  },
];

export default function ImageSlider(): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isHovered]);

  return (
    <div className="absolute inset-0 w-full h-full">
      <div
        className="relative w-full h-full"
        onMouseOver={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          fill
          style={{ objectFit: "cover" }}
          className="transition-opacity duration-1000 ease-in-out"
          priority
        />
      </div>
    </div>
  );
}