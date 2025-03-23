import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.scss";
import Header from "@/components/Header";
import { CartProvider } from "@/contexts/CartContext";
import { StyledEngineProvider } from "@mui/material/styles";
import { SidebarProvider } from "@/contexts/SidebarContext";
import { FilterProvider } from "@/contexts/FiltersContext";
import { SortingProvider } from "@/contexts/SortingContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StyledEngineProvider injectFirst>
      <SortingProvider>
        <FilterProvider>
          <SidebarProvider>
            <CartProvider>
              <html lang="en">
                <body className={`${geistSans.variable} ${geistMono.variable}`}>
                  <Header />
                  {children}
                </body>
              </html>
            </CartProvider>
          </SidebarProvider>
        </FilterProvider>
      </SortingProvider>
    </StyledEngineProvider>
  );
}
