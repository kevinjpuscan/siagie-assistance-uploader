export interface User {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  institution: Institution;
}

export interface Institution {
  id: number;
  name: string;
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

export type Classroom = {
  id?: number;
  grade: string;
  section: string;
  level: string;
  institutionId?: string;
};

export type Shift = {
  id: number;
  name: string;
};
