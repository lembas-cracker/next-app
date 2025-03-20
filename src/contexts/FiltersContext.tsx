"use client";
import { Product } from "@/components/ProductCard";
import { useFetchProducts } from "@/hooks/useFetchProducts";
import { createContext, useContext, useEffect, useState } from "react";

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
  const { products } = useFetchProducts();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const setPriceRange = (priceRange: { from?: number; to?: number }) => {
    setFilters((prev) => ({ ...prev, priceRange }));
  };

  const setShowNewOnly = (showNewOnly: boolean) => {
    setFilters((prev) => ({ ...prev, showNewOnly }));
  };

  const applyFilters = () => {
    const filtered = products.filter((product) => {
      const from = filters.priceRange.from ?? 0; // 0, если undefined
      const to = filters.priceRange.to ?? 30000;
      const withinPriceRange = product.price >= from && product.price <= to;
      const isNewProduct = filters.showNewOnly ? product.isNew : true;
      return withinPriceRange && isNewProduct;
    });

    setFilteredProducts(filtered);
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
