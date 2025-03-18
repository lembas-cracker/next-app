"use client";
import React, { useContext } from "react";
import { AppBar, Toolbar, IconButton, Typography, Badge } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { CartContext } from "../contexts/CartContext";

const Header = () => {
  const { totalPrice } = useContext(CartContext);

  return (
    <header>
      <AppBar position="static" sx={{ backgroundColor: "#232f3e" }}>
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My Store
          </Typography>

          <IconButton size="large" color="inherit" aria-label="cart">
            <Badge badgeContent={totalPrice > 0 ? totalPrice.toFixed(2) + "$" : 0 + "$"} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Header;
