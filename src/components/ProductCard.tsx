import { Button, ButtonGroup, Card, CardContent, Stack, Typography } from "@mui/material";
import styles from "../styles/ProductCard.module.scss";
import React, { useContext, useState } from "react";
import { CartContext } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";
import Image from "next/image";

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  isNew?: boolean;
};

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isInCart, setIsInCart] = useState(false);
  const [quantity, setQuantity] = useState<number>(1);
  const { addToCart, removeFromCart } = useContext(CartContext);
  const router = useRouter();

  const handleAddToCart = () => {
    setIsInCart(true);
    addToCart({ ...product });
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
    addToCart({ ...product });
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
      removeFromCart(product);
    } else if (quantity === 1) {
      if (isInCart) {
        removeFromCart(product);
        setIsInCart(false);
      }
    } else {
      setIsInCart(false);
    }
  };

  const handleNavigate = () => {
    router.push(`/products/${product.id.toString()}`);
  };

  return (
    <Card className={styles.card}>
      <Image
        className={styles.cardImage}
        src={product.image}
        height="200"
        width="200"
        alt=""
        onClick={handleNavigate}
      />

      <CardContent className={styles.cardContent} onClick={handleNavigate}>
        <Typography>{product.title}</Typography>
        <Typography variant="body2" sx={{ fontSize: 15 }}>
          {product.price.toFixed(2)}$
        </Typography>
      </CardContent>

      <Stack direction="row" sx={{ minWidth: "100%" }}>
        {isInCart ? (
          <ButtonGroup sx={{ width: "100%" }} variant="outlined" aria-label="Basic button group">
            <Button sx={{ flex: 1 }} onClick={handleDecreaseQuantity}>
              -
            </Button>
            <Button sx={{ flex: 1 }}>{quantity}</Button>
            <Button sx={{ flex: 1 }} onClick={handleIncreaseQuantity}>
              +
            </Button>
          </ButtonGroup>
        ) : (
          <Button
            sx={{ width: "100%", padding: "0.5rem", fontSize: "0.8rem", backgroundColor: "#4479bd" }}
            variant="contained"
            color="primary"
            onClick={handleAddToCart}
          >
            Добавить в корзину
          </Button>
        )}
      </Stack>
    </Card>
  );
};

export default React.memo(ProductCard);
