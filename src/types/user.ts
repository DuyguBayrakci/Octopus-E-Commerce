export interface User {
  id: number;
  firstName?: string;
  lastName?: string;
  username: string;
  password?: string;
  email?: string;
  image?: string;
  role?: string;
  token?: string;
}

export interface UsersResponse {
  users: User[];
  total?: number;
  skip?: number;
  limit?: number;
}
