"use client";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function CartDropdown() {
  const { items, total, clearCart } = useCart();
  const router = useRouter();

  if (!items.length) {
    return (
      <div className="absolute right-0 top-[60px] w-80 bg-white border border-gray-200 shadow-xl rounded-lg z-50 animate-fadeIn p-4">
        <p className="text-sm text-gray-500 text-center">Sepetiniz Boş.</p>
      </div>
    );
  }

  return (
    <div className="absolute right-0 top-[60px] w-80 bg-white border border-gray-200 shadow-xl rounded-lg z-50 animate-fadeIn flex flex-col max-h-[400px]">
      <div className="max-h-[300px] overflow-y-auto">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors"
          >
            <Image
              src={item.thumbnail || "/no-image.png"}
              alt={item.title}
              width={50}
              height={50}
              className="rounded-md object-contain border"
            />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800 truncate max-w-36">
                {item.title}
              </p>
              <p className="text-xs text-gray-500">
                {item.quantity} adet × ${item.price.toFixed(2)}
              </p>
            </div>
            <p className="text-sm font-semibold text-gray-900">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>
      <div className="border-t p-3 flex justify-between items-center bg-gray-50 rounded-b-lg">
        <div>
          <p className="text-sm text-gray-600">Toplam</p>
          <p className="text-base font-semibold text-gray-900">
            ${total.toFixed(2)}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={clearCart}
            className="px-3 py-1 text-sm border border-primary-hover rounded-lg text-primary cursor-pointer transition hover:bg-primary hover:text-white"
          >
            Temizle
          </button>
        </div>
      </div>
    </div>
  );
}
