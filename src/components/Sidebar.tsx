import { SidebarContext } from "@/contexts/SidebarContext";
import { Box, Drawer, List, ListItem, Toolbar } from "@mui/material";
import React, { useContext } from "react";
import PriceFilter from "./PriceFilter";
import NewProductsFilter from "./NewProductsFilter";

const Sidebar = () => {
  const { handleDrawerClose, handleDrawerTransitionEnd, mobileOpen } = useContext(SidebarContext);

  const drawer = (
    <div>
      <Toolbar />
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
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: 300 },
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
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: 300, marginTop: "3rem" },
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
