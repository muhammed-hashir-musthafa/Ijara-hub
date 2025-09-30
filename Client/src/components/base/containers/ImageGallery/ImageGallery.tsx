"use client";

import React, { useState } from "react";
import { Button } from "@/components/base/ui/button";
import Image from "next/image";
import { Eye } from "lucide-react";
import { ImageGalleryProps } from "@/types/image";

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images, title }) => {
  const [currentImage, setCurrentImage] = useState<number>(0);

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-2xl shadow-2xl group">
        <Image
          width={800}
          height={600}
          src={images[currentImage]}
          alt={title}
          className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Image Navigation */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentImage
                    ? "bg-white shadow-lg"
                    : "bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        )}

        {/* View Gallery Button */}
        <Button className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <Eye className="h-4 w-4 mr-2" />
          View Gallery
        </Button>
      </div>

      {/* Thumbnail Navigation */}
      {images.length > 1 && (
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`relative flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden transition-all duration-300 ${
                index === currentImage
                  ? "ring-2 ring-amber-500 shadow-lg transform scale-105"
                  : "hover:ring-2 hover:ring-gray-300"
              }`}
            >
              <Image
                width={100}
                height={100}
                src={image}
                alt={`${title} ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {index !== currentImage && (
                <div className="absolute inset-0 bg-black/30" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
