"use client";

import ProductCard from "@/components/ProductCard";
import styles from "../styles/Home.module.scss";
import { useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { useFilters } from "@/contexts/FiltersContext";
import Sorting from "@/components/Sorting";
import { useSorting } from "@/contexts/SortingContext";

export default function Home() {
  const { filters, applyFilters, filteredProducts } = useFilters();
  const { sortBy, sortOrder } = useSorting();

  useEffect(() => {
    applyFilters();
  }, [filters, sortBy, sortOrder]);

  return (
    <div className={styles.homepageContainer}>
      <div className={styles.sidebarContainer}>
        <Sidebar />
      </div>
      <div className={styles.homepageWrapper}>
        <div className={styles.sortingContainer}>
          <Sorting />
        </div>
        <main className={styles.homepage}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </main>
      </div>
    </div>
  );
}
