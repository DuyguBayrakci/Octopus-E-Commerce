"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Product } from "@/types/product";
import Button from "@/components/common/Button";
import { useCart } from "@/context/CartContext";
import StarFilled from "@/assets/icons/StarFilled";
import StarOutline from "@/assets/icons/StarOutline";
import StarHalf from "@/assets/icons/StarHalf";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const [loading, setLoading] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      await addToCart(product, 1);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(product.rating);
    const hasHalfStar = product.rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<StarFilled key={i} color="#000000" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<StarHalf key={i} color="#000000" />);
      } else {
        stars.push(<StarOutline key={i} color="#000000" />);
      }
    }

    return <div className="flex items-center gap-1">{stars}</div>;
  };

  return (
    <div className="transition-shadow duration-300 flex flex-col justify-between">
      <div className="relative w-full h-[175px] bg-light-gray flex items-center justify-center overflow-hidden">
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={180}
          height={175}
          className="object-contain p-1"
          priority
        />
      </div>

      <div className="flex flex-col justify-between flex-1 pt-4">
        <div>
          <h3 className="text-base font-normal font-poppins text-black truncate leading-tight">
            {product.title}
          </h3>
          <p className="text-base font-normal font-poppins text-medium-gray my-1">
            {product.category}
          </p>
          <div className="text-base font-bold font-poppins text-black px-1">
            ${product.price.toFixed(2)}
          </div>
        </div>
        <div className="mt-2">{renderStars()}</div>
        <div className="flex gap-3 pt-4">
          <Link
            href={`/products/${product.id}`}
            className="transition-all duration-200 font-medium text-sm rounded-lg py-3 flex items-center h-11 justify-center w-full border border-primary text-primary hover:bg-primary hover:text-white"
          >
            Detaya Git
          </Link>
          <Button
            onClick={handleAddToCart}
            variant="primary"
            isAddToCart
            className="w-full"
          >
            Sepete Ekle
          </Button>
        </div>
      </div>
    </div>
  );
}
