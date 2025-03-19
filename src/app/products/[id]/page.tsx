"use client";

import { Product } from "@/components/ProductCard";
import SingleProduct from "@/components/SingleProduct";
import { Alert } from "@mui/material";
import { useEffect, useState, use } from "react";

const fetchProduct = async (id: string) => {
  try {
    const response = await fetch("/data/products.json");
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data: Product[] = await response.json();
    return data.find((product) => product.id === +id);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

const page = ({ params }: { params: Promise<{ id: string }> }) => {
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const resolvedParams = use(params);

  useEffect(() => {
    (async () => {
      const product = await fetchProduct(resolvedParams.id);
      setProduct(product);
    })();
  }, []);

  if (!product) {
    return (
      <Alert severity="info" variant="outlined">
        Loading product information...
      </Alert>
    );
  }
  return <SingleProduct product={product} />;
};

export default page;
