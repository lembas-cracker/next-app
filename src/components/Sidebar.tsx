import { SidebarContext } from "@/contexts/SidebarContext";
import { Box, Drawer, List, ListItem, Toolbar } from "@mui/material";
import React, { useContext } from "react";
import PriceFilter from "./PriceFilter";
import NewProductsFilter from "./NewProductsFilter";
import styles from "../styles/Sidebar.module.scss";

const Sidebar = () => {
  const { handleDrawerClose, handleDrawerTransitionEnd, mobileOpen } = useContext(SidebarContext);

  const drawer = (
    <div>
      <List>
        <ListItem disablePadding>
          <PriceFilter />
        </ListItem>
        <ListItem disablePadding>
          <NewProductsFilter />
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <Box component="nav" sx={{ width: { sm: 300 }, flexShrink: { sm: 0 } }} aria-label="sidebar filters">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          sx={{
            display: { xs: "block", sm: "block", md: "block" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: 300, py: "2rem" },
          }}
          slotProps={{
            root: {
              keepMounted: true,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "none", md: "none", lg: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 300,
              my: "4.75rem",
              borderRight: "none",
              py: "2rem",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default Sidebar;
