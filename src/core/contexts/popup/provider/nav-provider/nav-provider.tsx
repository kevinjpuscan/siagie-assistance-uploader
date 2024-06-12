import React, { useState } from "react";
import { NavContext } from "@/core/contexts/popup/context/nav-context";
import { NAV_ITEM } from "@/core/constants/nav";

const NavProvider = ({ children }) => {
  const [page, setPage] = useState(NAV_ITEM.SYNC);
  const [isLoading, setIsLoading] = useState(false);

  const handlePage = (page) => {
    setPage(page);
  };
  return (
    <NavContext.Provider value={{ page, setPage: handlePage, isLoading }}>
      {children}
    </NavContext.Provider>
  );
};

export default NavProvider;
