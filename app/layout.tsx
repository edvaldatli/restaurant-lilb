"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { LocalStorageProvider } from "./context/LocalStorage";
const Navbar = dynamic(() => import("./components/Navbar"), { ssr: false });
import { store } from "./store";
import { Provider, useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Analytics />
        <SpeedInsights />
      </head>
      <body>
        <Provider store={store}>
          <LocalStorageProvider>
            <AnimatePresence>
              <Navbar />
            </AnimatePresence>
            <div className="lg:px-72 lg:pt-20 md:pb-5 h-screen max-h-screen">
              {children}
            </div>
          </LocalStorageProvider>
        </Provider>
      </body>
    </html>
  );
}
