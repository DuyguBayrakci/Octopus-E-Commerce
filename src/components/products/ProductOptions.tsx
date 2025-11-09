"use client";
import { Product } from "@/types/product";

interface Props {
  product: Product;
}

export default function ProductFeatures({ product }: Props) {
  const features = [
    { label: "Marka", value: product.brand },
    { label: "Kategori", value: product.category },
    { label: "SKU", value: product.sku },
    { label: "Ağırlık", value: `${product.weight} kg` },
    {
      label: "Boyutlar",
      value: `${product.dimensions?.width} x ${product.dimensions?.height} x ${product.dimensions?.depth} cm`,
    },
    { label: "Garanti", value: product.warrantyInformation },
    { label: "Kargo", value: product.shippingInformation },
    { label: "Stok Durumu", value: product.availabilityStatus },
    { label: "İade Politikası", value: product.returnPolicy },
    { label: "Minimum Sipariş", value: `${product.minimumOrderQuantity} adet` },
  ];

  return (
    <div className="mt-14">
      <h3 className="font-bold text-black text-base mb-4 font-poppins">
        Ürün Özellikleri
      </h3>
      <div className="grid grid-cols-4 gap-5">
        {features
          .filter((f) => f.value)
          .map((feature, idx) => (
            <div key={idx} className="border border-border-gray p-2 px-4">
              <p className="text-sm font-medium font-poppins text-primary-hover mb-1">
                {feature.label}
              </p>
              <p className="text-sm font-medium font-poppins text-black">
                {feature.value}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
