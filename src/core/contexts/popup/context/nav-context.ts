import { NAV_ITEM } from "@/core/constants/nav";
import { createContext, useContext } from "react";

interface NavContext {
  page: NAV_ITEM;
  isLoading: boolean;
  setPage: (page: NAV_ITEM) => void;
}

export const NavContext = createContext({
  page: NAV_ITEM.SYNC,
  isLoading: false,
  setPage: (page: NAV_ITEM) => {},
} as NavContext);

export const useNavContext = () => useContext(NavContext);
