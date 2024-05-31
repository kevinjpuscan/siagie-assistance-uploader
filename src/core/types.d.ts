export interface User {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  jwt: string;
  user: User;
}

export type Student = {
  order: number;
  dni: string;
  first_names: string;
  last_names: string;
  gender: string;
  code: string;
  status: string;
};
