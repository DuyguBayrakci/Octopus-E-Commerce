"use client";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import Button from "@/components/common/Button";

interface Props {
  product: Product;
}

export default function OrderSummary({ product }: Props) {
  const { addToCart, isLoading } = useCart();

  const handleAddToCart = async () => {
    await addToCart(product, 1);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border-gray shadow-md z-50">
      <div className="mx-auto flex items-stretch">
        <div className="border-r border-border-gray flex items-center justify-center p-8">
          <p className="text-22 font-bold text-black font-poppins">
            Sipariş Özeti
          </p>
        </div>
        <div className="flex-1 flex justify-between items-center p-8">
          <div className="max-w-[60%]">
            <p className="font-bold text-black text-lg font-poppins">
              {product.title}
            </p>
            <p className="text-base text-product-desc font-normal font-poppins line-clamp-1">
              {product.description}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-34 font-medium text-black font-poppins">
              ${product.price.toFixed(2)}
            </p>
            <Button
              onClick={handleAddToCart}
              variant="primary"
              isAddToCart
              className="w-[160px] text-sm font-semibold"
            >
              Sepete Ekle
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
