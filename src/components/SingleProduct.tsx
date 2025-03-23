import React from "react";
import { Product } from "./ProductCard";
import { Box, Divider, Typography } from "@mui/material";
import Image from "next/image";
import styles from "../styles/SingleProduct.module.scss";

type ProductDetailsProps = {
  product: Product;
};

const SingleProduct: React.FC<ProductDetailsProps> = ({ product }) => {
  return (
    <>
      <Box
        sx={{
          maxWidth: "fitContent",
          p: 3,
          display: "flex",
          justifyContent: "start",
          gap: 5,
          m: 3,
        }}
        className={styles.singleProduct}
      >
        <Box className={styles.imageContainer}>
          <Image
            src={product.image}
            alt={product.title}
            priority
            style={{ objectFit: "contain" }}
            width={350}
            height={450}
          />
        </Box>
        <Box sx={{ px: 3, display: "flex", flexDirection: "column" }} className={styles.detailsContainer}>
          <Typography variant="h4" component="h1" gutterBottom>
            {product.title}
          </Typography>

          <Typography sx={{}} variant="h6" component="p" gutterBottom>
            ${product.price.toFixed(2)}
          </Typography>

          <Divider sx={{ my: 3 }}></Divider>

          <Typography variant="h6" component="h3" gutterBottom>
            Описание
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            {product.description}
          </Typography>

          <Divider sx={{ my: 3 }}></Divider>

          <Typography variant="h6" component="h3" gutterBottom>
            0 Отзывов
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default SingleProduct;
