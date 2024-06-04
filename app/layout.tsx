"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { LocalStorageProvider } from "./context/LocalStorage";
import Navbar from "./components/Navbar";

import { store } from "./store";
import { Provider } from "react-redux";

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
            <Navbar />
            <div className="px-4 lg:px-2 2xl:px-72 pt-6 pb-8 lg:pt-24 h-screen max-h-screen overflow-hidden">
              {children}
            </div>
          </LocalStorageProvider>
        </Provider>
      </body>
    </html>
  );
}
