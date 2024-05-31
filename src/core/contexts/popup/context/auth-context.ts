import { User } from "@/core/types";
import { createContext, useContext } from "react";

interface UserContext {
  user: User | undefined;
  isLoading: boolean;
  setUser: (user: User) => void;
}

export const AuthContext = createContext({
  user: undefined,
  isLoading: false,
  setUser: () => {},
} as UserContext);

export const useAuthContext = () => useContext(AuthContext);
