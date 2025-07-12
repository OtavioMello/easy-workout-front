"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { usePathname } from "next/navigation";

interface NavigationContextType {
  selectedTab: number;
}

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined
);

export const useNavigation = (): NavigationContextType => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
};

interface NavigationProviderProps {
  children: ReactNode;
}

export const NavigationProvider = ({ children }: NavigationProviderProps) => {
  const pathname = usePathname();

  const tabMapping: { [key: string]: number } = {
    "/dashboard/trainee/workouts": 1,
    "/dashboard/trainee/metrics": 2,
    "/dashboard/trainee/account": 3,
    "/dashboard/trainee": 0,
    "/dashboard/personal-trainer/trainees": 1,
    "/dashboard/personal-trainer/metrics": 2,
    "/dashboard/personal-trainer/account": 3,
    "/dashboard/personal-trainer": 0,
  };

  const matchedEntry = Object.entries(tabMapping).find(([key]) =>
    pathname.startsWith(key)
  );

  const selectedTab = matchedEntry ? matchedEntry[1] : 0;

  return (
    <NavigationContext.Provider value={{ selectedTab }}>
      {children}
    </NavigationContext.Provider>
  );
};
