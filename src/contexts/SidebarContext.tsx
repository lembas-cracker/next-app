"use client";
import React, { createContext, useState } from "react";

type SidebarContextType = {
  mobileOpen: boolean;
  isClosing: boolean;
  handleDrawerClose: () => void;
  handleDrawerTransitionEnd: () => void;
  handleDrawerToggle: () => void;
};

const initialSidebarContext: SidebarContextType = {
  mobileOpen: false,
  isClosing: false,
  handleDrawerClose: () => {},
  handleDrawerTransitionEnd: () => {},
  handleDrawerToggle: () => {},
};

export const SidebarContext = createContext<SidebarContextType>(initialSidebarContext);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  return (
    <SidebarContext.Provider
      value={{ mobileOpen, isClosing, handleDrawerClose, handleDrawerTransitionEnd, handleDrawerToggle }}
    >
      {children}
    </SidebarContext.Provider>
  );
}
