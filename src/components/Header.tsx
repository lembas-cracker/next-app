"use client";
import React, { useContext } from "react";
import { AppBar, Toolbar, IconButton, Typography, Badge } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { CartContext } from "../contexts/CartContext";
import { useRouter } from "next/navigation";
import { SidebarContext } from "@/contexts/SidebarContext";

const Header = () => {
  const { totalPrice } = useContext(CartContext);
  const { handleDrawerToggle } = useContext(SidebarContext);
  const router = useRouter();
  const isZero = Math.abs(totalPrice) < 0.0001; // проверяем, что точно 0

  const handleNavigate = () => {
    router.push("/");
  };

  return (
    <header>
      <AppBar position="static" sx={{ backgroundColor: "#232f3e" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, display: { xs: "block", sm: "block", md: "block", lg: "none" } }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: "pointer" }} onClick={handleNavigate}>
            My Store
          </Typography>

          <IconButton size="large" color="inherit" aria-label="cart">
            <Badge badgeContent={isZero ? "0$" : `${totalPrice.toFixed(2)}$`} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Header;
