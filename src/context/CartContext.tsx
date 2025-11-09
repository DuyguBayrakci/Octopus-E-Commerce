"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { productService } from "@/services/productService";
import { showError, showSuccess } from "@/utils/toast";
import type { Product } from "@/types/product";

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  thumbnail?: string;
}

interface CartContextType {
  items: CartItem[];
  total: number;
  addToCart: (product: Product, quantity?: number) => Promise<void>;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  refreshCart: () => Promise<void>;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType>({
  items: [],
  total: 0,
  addToCart: async () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  refreshCart: async () => {},
  isLoading: false,
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      const parsed = JSON.parse(stored);
      setItems(parsed.items || []);
      setTotal(parsed.total || 0);
    }
  }, []);

  const updateLocalCart = (cartData: { items: CartItem[]; total: number }) => {
    localStorage.setItem("cart", JSON.stringify(cartData));
    setItems(cartData.items);
    setTotal(cartData.total);
  };
  const addToCart = async (product: Product, quantity = 1) => {
    setIsLoading(true);
    try {
      const existingItems = [...items];
      const existingItem = existingItems.find((i) => i.id === product.id);
      let updatedItems: CartItem[];

      if (existingItem) {
        updatedItems = existingItems.map((i) =>
          i.id === product.id
            ? {
                ...i,
                quantity: i.quantity + quantity,
                total: (i.quantity + quantity) * i.price,
              }
            : i
        );
      } else {
        updatedItems = [
          ...existingItems,
          {
            id: product.id,
            title: product.title,
            price: product.price,
            quantity,
            total: product.price * quantity,
            thumbnail: product.thumbnail,
          },
        ];
      }

      const updatedTotal = updatedItems.reduce((sum, i) => sum + i.total, 0);
      updateLocalCart({ items: updatedItems, total: updatedTotal });
      await productService.addToCart(product.id, quantity);
      showSuccess(`${product.title} sepete eklendi!`);
    } catch (err) {
      showError("Ürün sepete eklenirken hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  };
  const removeFromCart = (productId: number) => {
    const updatedItems = items.filter((item) => item.id !== productId);
    const updatedTotal = updatedItems.reduce((sum, i) => sum + i.total, 0);
    updateLocalCart({ items: updatedItems, total: updatedTotal });
  };
  const clearCart = () => {
    updateLocalCart({ items: [], total: 0 });
    showSuccess("Sepet temizlendi.");
  };

  const refreshCart = async () => {
    const user = localStorage.getItem("user");
    if (!user) return;

    const parsedUser = JSON.parse(user);
    const userId = parsedUser.id || parsedUser.userId;

    try {
      const res = await productService.getUserCart(userId);
      const cartItems =
        res.products?.map((p: any) => ({
          id: p.id,
          title: p.title,
          price: p.price,
          quantity: p.quantity,
          total: p.total,
          thumbnail: p.thumbnail,
        })) || [];

      updateLocalCart({
        items: cartItems,
        total: res.total || 0,
      });
    } catch {
      showError("Sepet bilgileri alınamadı.");
    }
  };

  return (
    <CartContext.Provider
      value={{
        items,
        total,
        addToCart,
        removeFromCart,
        clearCart,
        refreshCart,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
