"use client";
import React, { createContext, use } from "react";

const IsDesktopContext = createContext(false);

export const IsDesktopProvider = ({
  value,
  children,
}: {
  children: React.ReactNode;
  value: boolean;
}) => {
  return (
    <IsDesktopContext.Provider value={value}>
      {children}
    </IsDesktopContext.Provider>
  );
};

export const useIsDesktop = () => {
  return use(IsDesktopContext);
};
