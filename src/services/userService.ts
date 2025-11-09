import api from "./api";
import type { UsersResponse } from "@/types/user";

export const getAllUsers = async (): Promise<UsersResponse> => {
  const res = await api.get("/users");
  return res.data;
};
