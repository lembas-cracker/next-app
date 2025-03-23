"use client";

import { Product } from "@/components/ProductCard";
import SingleProduct from "@/components/SingleProduct";
import products from "@/products.json";
import { Alert } from "@mui/material";
import { useEffect, useState, use } from "react";

const page = ({ params }: { params: Promise<{ id: string }> }) => {
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const resolvedParams = use(params);

  useEffect(() => {
    const product = products.find((p) => p.id === +resolvedParams.id);
    setProduct(product);
  }, [resolvedParams.id]);

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
