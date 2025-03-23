"use client";

import { createContext, useContext, useState } from "react";

export type SortKey = "name" | "price" | undefined;
export type SortOrder = "asc" | "desc";

type SortingContextType = {
  sortBy: SortKey;
  sortOrder: SortOrder;
  onSortChange: (sortBy: SortKey, sortOrder: SortOrder) => void;
  setSortOrder: (sortOrder: SortOrder) => void;
  setSortBy: (sortBy: SortKey) => void;
};

const defaultSortingContextValue: SortingContextType = {
  sortBy: undefined,
  sortOrder: "asc",
  onSortChange: () => {},
  setSortOrder: () => {},
  setSortBy: () => {},
};

export const SortingContext = createContext<SortingContextType>(defaultSortingContextValue);

export const SortingProvider = ({ children }: { children: React.ReactNode }) => {
  const [sortBy, setSortBy] = useState<SortKey>(undefined);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const onSortChange = (sortBy: SortKey, sortOrder: SortOrder) => {
    setSortBy(sortBy);
    setSortOrder(sortOrder);
  };

  return (
    <SortingContext.Provider value={{ sortBy, sortOrder, setSortOrder, setSortBy, onSortChange }}>
      {children}
    </SortingContext.Provider>
  );
};

export const useSorting = () => {
  const context = useContext(SortingContext);
  return context;
};
