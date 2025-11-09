"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Product } from "@/types/product";

interface Props {
  product: Product;
}

export default function ProductGallery({ product }: Props) {
  const images = product.images || [];
  const [selectedImage, setSelectedImage] = useState(
    product.thumbnail || images[0]
  );
  const [activeThumb, setActiveThumb] = useState<string | null>(null);

  useEffect(() => {
    if (images.length > 0) {
      setActiveThumb(images[0]);
    }
  }, [images]);

  const handleThumbnailClick = (img: string) => {
    setSelectedImage(img);
    setActiveThumb(img);
  };

  return (
    <div>
      <div className="bg-login-gray flex items-center justify-center p-6 transition-all">
        <Image
          src={selectedImage}
          alt={product.title}
          width={450}
          height={450}
          className="object-contain transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="flex gap-5 mt-5">
        {images.map((img, idx) => {
          const isActive = activeThumb === img;
          return (
            <button
              key={idx}
              onClick={() => handleThumbnailClick(img)}
              className={`relative border overflow-hidden cursor-pointer transition-all duration-200 focus:outline-none ${
                isActive
                  ? "border-black shadow-[0_0_5px_rgba(0,0,0,0.25)]"
                  : "border-gray-300 hover:border-black"
              }`}
            >
              <Image
                src={img}
                alt={`product-image-${idx}`}
                width={100}
                height={40}
                className={`object-contain transition-all duration-300 ${
                  isActive
                    ? "opacity-100 grayscale-0"
                    : "opacity-40 grayscale hover:opacity-70"
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
