import api from "./api";
import { Product } from "@/types/product";

export const productService = {
  async getProducts(): Promise<Product[]> {
    const res = await api.get(`/products`);
    return res.data.products;
  },

  async getCategories(): Promise<string[]> {
    const res = await api.get("/products/categories");
    return res.data.map((c: any) => (typeof c === "string" ? c : c.slug));
  },

  async getProductById(id: number): Promise<Product> {
    const res = await api.get(`/products/${id}`);
    return res.data;
  },

  async addToCart(productId: number, quantity = 1) {
    const user = localStorage.getItem("user");
    if (!user) throw new Error("Kullanıcı oturumu bulunamadı.");

    const parsedUser = JSON.parse(user);
    const userId = parsedUser.id || parsedUser.userId;

    if (!userId) throw new Error("Kullanıcı ID bulunamadı.");

    const response = await api.post("/carts/add", {
      userId,
      products: [{ id: productId, quantity }],
    });

    return response.data;
  },
  async getUserCart(userId: number) {
    const res = await api.get(`/carts/user/${userId}`);
    return res.data.carts?.[0] || { products: [], total: 0 };
  },
};
