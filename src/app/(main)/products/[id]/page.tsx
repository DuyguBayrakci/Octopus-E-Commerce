"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { productService } from "@/services/productService";
import { Product } from "@/types/product";
import ProductGallery from "@/components/products/ProductGallery";
import ProductOptions from "@/components/products/ProductOptions";
import ProductReviews from "@/components/products/ProductReviews";
import OrderSummary from "@/components/products/OrderSummary";
import { showError } from "@/utils/toast";
import { ArrowLeft } from "lucide-react";
import Loader from "@/components/common/Loader";

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      setLoading(true);
      productService
        .getProductById(Number(id))
        .then((data) => {
          setProduct(data);
          setLoading(false);
        })
        .catch(() => {
          showError("Ürün detayları alınamadı.");
          setLoading(false);
        });
    }
  }, [id]);
  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  if (!product)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Ürün bulunamadı.</p>
      </div>
    );

  return (
    <div className="relative pt-6 pb-40 px-4 lg:px-8">
      <button
        onClick={() => router.push("/products")}
        className="mb-6 flex items-center gap-2 text-primary cursor-pointer hover:text-primary-hover transition-colors font-medium text-sm group"
      >
        <ArrowLeft
          size={18}
          className="transition-transform group-hover:-translate-x-1"
        />
        <span>Geri</span>
      </button>
      <div className="grid grid-cols-12 gap-10 lg:gap-14">
        <div className="lg:col-span-4 col-span-12">
          <ProductGallery product={product} />
        </div>

        <div className="lg:col-span-8 col-span-12">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-black mb-5 font-poppins">
              {product.title}
            </h1>
            <p className="text-product-desc font-normal text-base lg:text-xl font-poppins">
              {product.description}
            </p>
          </div>

          <ProductOptions product={product} />
          <ProductReviews product={product} />
        </div>
      </div>

      <OrderSummary product={product} />
    </div>
  );
}
