import axios, { AxiosError } from "axios";
import { API_BASE_URL } from "@/utils/constants";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const user = localStorage.getItem("user");
  if (user) {
    const token = JSON.parse(user).token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;
    const message =
      (error.response?.data as any)?.message || error.message || "";
    if (status && [500, 401].includes(status)) {
      throw new Error(
        status === 401
          ? "Oturum süresi doldu. Lütfen tekrar giriş yapın."
          : "Sunucuda beklenmeyen bir hata oluştu."
      );
    }
    throw error;
  }
);

export default api;
