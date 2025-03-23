"use client";
import { Product } from "@/components/ProductCard";
import products from "@/products.json";
import { createContext, useContext, useState } from "react";
import { useSorting } from "./SortingContext";

type FilterState = {
  priceRange: { from?: number; to?: number };
  showNewOnly: boolean;
};

type FilterContextType = {
  filters: FilterState;
  filteredProducts: Product[];
  setFilteredProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  setPriceRange: (priceRange: { from?: number; to?: number }) => void;
  setShowNewOnly: (showNewOnly: boolean) => void;
  applyFilters: () => void;
};

const defaultFilterContextValue: FilterContextType = {
  filters: {
    priceRange: { from: 0, to: 30000 },
    showNewOnly: false,
  },
  filteredProducts: [],
  setFilteredProducts: () => {},
  setPriceRange: () => {},
  setShowNewOnly: () => {},
  applyFilters: () => {},
};

const FilterContext = createContext<FilterContextType>(defaultFilterContextValue);

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  const [filters, setFilters] = useState<FilterState>(defaultFilterContextValue.filters);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const { sortBy, sortOrder } = useSorting();

  const setPriceRange = (priceRange: { from?: number; to?: number }) => {
    setFilters((prev) => ({ ...prev, priceRange }));
  };

  const setShowNewOnly = (showNewOnly: boolean) => {
    setFilters((prev) => ({ ...prev, showNewOnly }));
  };

  const applyFilters = () => {
    const filtered: Product[] = products.filter((product) => {
      const from = filters.priceRange.from ?? 0; // 0, если undefined
      const to = filters.priceRange.to ?? 30000;
      const withinPriceRange = product.price >= from && product.price <= to;
      const isNewProduct = filters.showNewOnly ? product.isNew : true;
      return withinPriceRange && isNewProduct;
    });

    const finalProducts = [...filtered].sort((a, b) => {
      if (sortBy === "name") {
        return sortOrder === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
      } else if (sortBy === "price") {
        return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
      } else {
        return 0;
      }
    });

    setFilteredProducts(finalProducts);
  };

  return (
    <FilterContext.Provider
      value={{ filters, setPriceRange, setShowNewOnly, filteredProducts, setFilteredProducts, applyFilters }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FilterContext);
  return context;
};
