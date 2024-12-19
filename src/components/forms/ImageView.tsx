"use client";

import Link from "next/link";
import Image from "next/image";
import { CloudImage } from "@/types/CloudImage";
import { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import { cn } from "@/utils/cn";

interface Props {
  images: CloudImage[];
  initSelectedId: number;
}

export default function ImageView({ images, initSelectedId }: Props) {
  const [selectedId, setSelectedId] = useState(initSelectedId);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToCenter(selectedId);
  }, [selectedId]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel);
    }
    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  function handleThumbnailClicked(id: number): void {
    scrollToCenter(id);
    setSelectedId(id);
  }

  const handleWheel = (e: WheelEvent) => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += e.deltaY;
    }
  };

  const scrollToCenter = (index: number) => {
    if (containerRef.current) {
      const container = containerRef.current;
      const imageElement = container.children[index] as HTMLElement;
      const containerWidth = container.clientWidth;
      const imageElementWidth = imageElement.clientWidth;
      const scrollPosition =
        imageElement.offsetLeft - containerWidth / 2 + imageElementWidth / 2;

      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  function handleBack(): void {
    if (selectedId - 1 < 0) {
      setSelectedId(images.length - 1);
      return;
    }
    setSelectedId(selectedId - 1);
  }

  function handleNext(): void {
    if (selectedId + 1 >= images.length) {
      setSelectedId(0);
      return;
    }
    setSelectedId(selectedId + 1);
  }

  return (
    <div className="absolute w-screen flex flex-col h-screen items-center">
      <div className="h-5/6 w-full flex items-center justify-center pt-2 md:pt-4">
        <div className="mx-2 md:mx-0 relative overflow-hidden h-1/3 md:h-full max-w-7xl flex-1">
          {images.map((image, index) => (
            <div
              key={index}
              className={cn(
                "absolute inset-0 transition-opacity duration-700 ease-in-out",
                image.id === selectedId ? "opacity-100" : "opacity-0"
              )}
            >
              {/* Main image */}
              <Image
                src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_1980/${image.public_id}.${image.format}`}
                blurDataURL={image.blur_data_url}
                alt="Big image"
                fill
                sizes="100vw"
                style={{
                  objectFit: "cover",
                }}
                className="transform rounded-lg transition-opacity duration-700 ease-in-out opacity-0"
                onLoadingComplete={(img) => img.classList.remove("opacity-0")}
              />
            </div>
          ))}

          {/* Button Close: Top Left */}
          <Link
            href={`./`}
            aria-label="back to homepage"
            className="absolute top-0 left-0 p-2 bg-gray-700 bg-opacity-70 text-white rounded-full m-2"
          >
            <div className="w-4 h-4 flex justify-center items-center">
              <FiX />
            </div>
          </Link>

          {/* Button Back: Left Center */}
          <button
            aria-label="previous image"
            className="absolute left-4 top-1/2 bg-opacity-70 transform -translate-y-1/2 p-2 bg-gray-700 text-white rounded-full"
            onClick={handleBack}
          >
            <div className="w-4 h-4 flex justify-center items-center">
              <FiChevronLeft />
            </div>
          </button>

          {/* Button Next: Right Center */}
          <button
            aria-label="next image"
            className="absolute right-4 top-1/2 bg-opacity-70 transform -translate-y-1/2 p-2 bg-gray-700 text-white rounded-full"
            onClick={handleNext}
          >
            <div className="w-4 h-4 flex justify-center items-center">
              <FiChevronRight />
            </div>
          </button>
        </div>
      </div>

      {/* Scroll bar thumbnail images */}
      <div className="h-1/6 fixed bottom-0 text-white flex justify-center items-center w-full">
        <div
          ref={containerRef}
          className="w-full max-w-5xl flex overflow-x-scroll space-x-2 p-4 bg-white bg-opacity-30 backdrop-blur-lg scrollbar-hidden rounded-lg no-scrollbar"
        >
          {images.map((image: CloudImage, index: number) => (
            <div
              key={index}
              className="w-24 h-24 relative flex-shrink-0 cursor-pointer"
              onClick={() => handleThumbnailClicked(image.id)}
            >
              <Image
                src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_fill,h_200,w_200/${image.public_id}.${image.format}`}
                alt={`Thumbnail ${index}`}
                className={cn(
                  "rounded-lg transition-transform duration-300",
                  image.id === selectedId &&
                    "transform scale-105 border-2 border-blue-500"
                )}
                fill
                sizes="96px"
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
